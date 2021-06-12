import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherModel } from '../models/weather.model';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { appSettings } from '../app.settings';

interface WeatherState {
  temp: number;
  summary: string;
  description: string;
}

let state: WeatherState = {
  temp: null,
  summary: '',
  description: '',
};

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private store: BehaviorSubject<WeatherState> =
    new BehaviorSubject<WeatherState>(state);
  currentTemp$: Observable<number> = this.store
    .asObservable()
    .pipe(map((item) => item.temp));
  currentSummary$: Observable<string> = this.store
    .asObservable()
    .pipe(map((item) => item.summary));
  currentDescription$: Observable<string> = this.store
    .asObservable()
    .pipe(map((item) => item.description));

  pollingInterval = 20000;

  constructor(private http: HttpClient) {
    const url =
      appSettings.getApiUrl('weather') + '&q=Cape Town,za&units=metric';
    interval(this.pollingInterval)
      .pipe(
        startWith(0),
        switchMap(() => this.http.get(url))
      )
      .subscribe((result) => {
        const weather = new WeatherModel().setFromObject(result);
        state = {
          ...state,
          temp: weather.main.temp,
          summary: weather.weather[0].summary,
          description: weather.weather[0].description,
        };
        this.store.next(state);
      });
  }
}
