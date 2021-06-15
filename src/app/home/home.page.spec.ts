import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { WeatherService } from '../services/weather.service';
import { UiService } from '../services/ui.service';
import { of } from 'rxjs';
import { TempReading } from '../models/weather.model';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  beforeEach(
    waitForAsync(() => {
      let weatherServiceSpy = jasmine.createSpyObj('WeatherService', [
        'currentDescription$',
        'currentTemp$',
        'currentSummary$',
      ]);
      let uiServiceSpy = jasmine.createSpyObj('UiService', ['tempUnitState$']);

      TestBed.configureTestingModule({
        declarations: [HomePage],
        imports: [IonicModule.forRoot()],
        providers: [
          { provide: WeatherService, useValue: weatherServiceSpy },
          { provide: UiService, useValue: uiServiceSpy },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(HomePage);

      let currentDescription$Spy =
        weatherServiceSpy.currentDescription$.and.returnValue(
          of('weather description')
        );
      const tempReading = {
        metric: 30,
        imperial: 90,
      } as TempReading;
      let currentTemp$Spy = weatherServiceSpy.currentTemp$.and.returnValue(
        of(tempReading)
      );
      let currentSummary$ = weatherServiceSpy.currentSummary$.and.returnValue(
        of('weather summary')
      );

      let tempUnitState$Spy = uiServiceSpy.tempUnitState$.and.returnValue(
        of('metric')
      );

      component = fixture.componentInstance;
    })
  );

  it('should create', () => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });
  });
});
