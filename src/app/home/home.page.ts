import { Component } from '@angular/core';
import { UiService } from '../services/ui.service';
import { TempUnit } from '../models/ui.model';
import { Observable } from 'rxjs';
import { WeatherService } from '../services/weather.service';
import { TempReading, WeatherDaily } from '../models/weather.model';
import { utcToZonedTime } from 'date-fns-tz';
import { format, fromUnixTime } from 'date-fns';
import { appSettings } from '../app.settings';

declare const process: { env: { [OWM_API_KEY: string]: string } };

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tempUnit$: Observable<TempUnit> = this.uiService.tempUnitState$;
  weatherDesc$: Observable<string> = this.weatherService.currentDescription$;
  weatherTemp$: Observable<TempReading> = this.weatherService.currentTemp$;
  weatherSummary$: Observable<string> = this.weatherService.currentSummary$;
  dailies$: Observable<WeatherDaily[]> = this.weatherService.dailies$;

  env: any = process.env.OWM_API_KEY || '';

  constructor(
    private uiService: UiService,
    private weatherService: WeatherService
  ) {}

  toggleTempUnit(ev: any): void {
    this.uiService.updateUnits(ev.detail.value);
  }

  getDateTime(dt: number): string {
    const utcDate = fromUnixTime(dt);
    const saDate = utcToZonedTime(utcDate, appSettings.baseTimeZone);
    return format(saDate, appSettings.timeDateFormat);
  }

  getSymbol(unit: TempUnit): string {
    return unit === 'metric' ? 'C' : 'F';
  }
}
