import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  TempReading,
  WeatherDaily,
  WeatherModel,
} from '../models/weather.model';
import {
  BehaviorSubject,
  interval,
  merge,
  Observable,
  Subscription,
} from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { appSettings } from '../app.settings';
import { TempUnit } from '../models/ui.model';
import { UiService } from './ui.service';
import { retryBackoff } from '../../utils/helpers';

interface WeatherState {
  temp: TempReading;
  summary: string;
  description: string;
  daily: WeatherDaily[];
}

let state: WeatherState = {
  temp: {
    metric: null,
    imperial: null,
  },
  summary: '',
  description: '',
  daily: [],
};

interface WeatherResult {
  response: any;
  unit: TempUnit;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  endpoints = {
    weather: 'onecall',
  };
  alertBounds = {
    // metric only for simplicity
    upper: 25,
    lower: 15,
  };
  hotColdAlertShown = false;
  pollingInterval = 1200000; // 1 200 000 milliseconds == 20 minutes
  retryInitial = 2000;
  maxRetries = 5;
  weatherSubs: Subscription;
  httpToast: any = undefined;

  private store: BehaviorSubject<WeatherState> =
    new BehaviorSubject<WeatherState>(state);
  currentTemp$: Observable<TempReading> = this.store
    .asObservable()
    .pipe(map((item) => item.temp));
  currentSummary$: Observable<string> = this.store
    .asObservable()
    .pipe(map((item) => item.summary));
  currentDescription$: Observable<string> = this.store
    .asObservable()
    .pipe(map((item) => item.description));
  dailies$: Observable<WeatherDaily[]> = this.store
    .asObservable()
    .pipe(map((item) => item.daily));

  constructor(private http: HttpClient, private uiService: UiService) {
    this.subscribeToWeather();
  }

  subscribeToWeather(): void {
    const metricUnit: TempUnit = 'metric';
    const imperialUnit: TempUnit = 'imperial';
    const url =
      appSettings.getApiUrl(this.endpoints.weather) +
      '&lat=-33.92&lon=18.42&exclude=minutely,hourly&units='; // cape town
    this.weatherSubs = merge(
      this.fetchWeather(url, metricUnit),
      this.fetchWeather(url, imperialUnit)
    )
      .pipe(
        retryBackoff({
          initialInterval: this.retryInitial,
          maxRetries: this.maxRetries,
          resetOnSuccess: true,
          retryCallback: this.showHttpErrorToast.bind(this),
        })
      )
      .subscribe(
        (result: WeatherResult) => {
          const { response, unit } = result;
          response.unit = unit;
          const weather = new WeatherModel().setFromObject(response);
          state = {
            ...state,
            daily: weather.daily.map((day, i) =>
              state.daily[i]
                ? {
                    ...state.daily[i],
                    ...day,
                    temp: { ...state.daily[i].temp, ...day.temp },
                  }
                : day
            ),
            temp: { ...state.temp, ...weather.temp },
            summary: weather.weather.summary,
            description: weather.weather.description,
          };
          this.store.next(state);
          if (unit === 'metric') {
            this.showHotColdAlert(state.temp.metric);
          }
        },
        async (error) => {
          await this.httpToast.dismiss();
          await this.uiService.showAlert({
            message:
              'Unable to reach weather service, please check your internet connection.',
            buttons: [
              {
                text: 'Retry',
                handler: (): void => this.resubscribeToWeather(),
              },
              {
                text: 'Cancel',
                role: 'cancel',
              },
            ],
          });
        }
      );
  }

  resubscribeToWeather(): void {
    this.httpToast = undefined;
    this.weatherSubs.unsubscribe();
    this.subscribeToWeather();
  }

  fetchWeather(url: string, unit: TempUnit): Observable<any> {
    url += unit;
    return interval(this.pollingInterval).pipe(
      startWith(0),
      switchMap(() => this.http.get(url)),
      map((response) => ({
        response,
        unit,
      }))
    );
  }

  async showHttpErrorToast(index: number): Promise<any> {
    if (!this.httpToast) {
      this.httpToast = await this.uiService.showToast({
        message: 'Unable to fetch weather info. Retrying...',
        position: 'bottom',
        buttons: [
          {
            side: 'end',
            text: 'Retry now',
            handler: () => {
              this.resubscribeToWeather();
            },
          },
          {
            side: 'start',
            icon: 'close',
            role: 'cancel',
          },
        ],
      });
      await this.httpToast.present();
    }
  }

  async showHotColdAlert(temp: number): Promise<any> {
    let mustShowAlert = false;
    const { upper, lower } = this.alertBounds;
    let header;
    let message;
    if (temp < lower) {
      mustShowAlert = true;
      header = 'Cold weather!';
      message = "It's chilly about!";
    } else if (temp > upper) {
      mustShowAlert = true;
      header = 'Hot weather!';
      message = "It's getting hot, watch out!";
    }
    if (!this.hotColdAlertShown && mustShowAlert) {
      this.hotColdAlertShown = true;
      const alert = await this.uiService.showAlert({
        message,
        header,
        buttons: ["I'm prepared!"],
      });
      const dismiss = await alert.onDidDismiss();
      this.hotColdAlertShown = false;
    }
  }
}
