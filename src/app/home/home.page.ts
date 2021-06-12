import { Component } from '@angular/core';
import { UiService } from '../services/ui.service';
import { TempToggleEvent, TempUnit } from '../models/ui.model';
import { Observable } from 'rxjs';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // TODO subscribe to temp unit state
  // TODO use async pipe to set segment's value
  tempUnit$: Observable<TempUnit> = this.uiService.tempUnitState$;
  weatherDesc$: Observable<string> = this.weatherService.currentDescription$;
  weatherTemp$: Observable<number> = this.weatherService.currentTemp$;
  weatherSummary$: Observable<string> = this.weatherService.currentSummary$;

  constructor(
    private uiService: UiService,
    private weatherService: WeatherService
  ) {}

  toggleTempUnit(ev: TempToggleEvent): void {
    this.uiService.updateUnits(ev.detail.value);
  }
  getWeather(): string {
    return 'Partly cloudy';
  }

  currentTemp(): number {
    return 30;
  }

  getUnit(): string {
    return 'C';
  }
}
