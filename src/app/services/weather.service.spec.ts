import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import { WeatherModel } from '../models/weather.model';
import { TempUnit } from '../models/ui.model';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('WeatherService', () => {
  let httpClient: HttpClient;
  let service: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(WeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('imperial and metric weather units', () => {
    const metricRes: any = {
      lat: -33.92,
      lon: 18.42,
      timezone: 'Africa/Johannesburg',
      timezone_offset: 7200,
      current: {
        dt: 1623787660,
        sunrise: 1623736183,
        sunset: 1623771841,
        temp: 14.89,
        feels_like: 14.6,
        pressure: 1014,
        humidity: 83,
        dew_point: 12.03,
        uvi: 0,
        clouds: 73,
        visibility: 10000,
        wind_speed: 2.6,
        wind_deg: 0,
        wind_gust: 3.56,
        weather: [
          {
            id: 803,
            main: 'Clouds',
            description: 'broken clouds',
            icon: '04n',
          },
        ],
      },
      daily: [
        {
          dt: 1623751200,
          sunrise: 1623736183,
          sunset: 1623771841,
          moonrise: 1623750300,
          moonset: 1623788460,
          moon_phase: 0.16,
          temp: {
            day: 16.62,
            min: 13,
            max: 16.71,
            night: 14.87,
            eve: 15.31,
            morn: 13.22,
          },
          feels_like: {
            day: 15.96,
            night: 14.61,
            eve: 15.09,
            morn: 12.63,
          },
          pressure: 1015,
          humidity: 62,
          dew_point: 9.09,
          wind_speed: 4.78,
          wind_deg: 322,
          wind_gust: 6.75,
          weather: [
            {
              id: 802,
              main: 'Clouds',
              description: 'scattered clouds',
              icon: '03d',
            },
          ],
          clouds: 46,
          pop: 0.17,
          uvi: 1.6,
        },
        {
          dt: 1623837600,
          sunrise: 1623822603,
          sunset: 1623858245,
          moonrise: 1623838800,
          moonset: 1623878640,
          moon_phase: 0.19,
          temp: {
            day: 16.53,
            min: 13.44,
            max: 16.68,
            night: 14.33,
            eve: 16.03,
            morn: 13.66,
          },
          feels_like: {
            day: 16.2,
            night: 14.09,
            eve: 15.78,
            morn: 13.43,
          },
          pressure: 1016,
          humidity: 75,
          dew_point: 11.86,
          wind_speed: 5.79,
          wind_deg: 355,
          wind_gust: 8.31,
          weather: [
            {
              id: 804,
              main: 'Clouds',
              description: 'overcast clouds',
              icon: '04d',
            },
          ],
          clouds: 96,
          pop: 0.13,
          uvi: 1.56,
        },
        {
          dt: 1623924000,
          sunrise: 1623909021,
          sunset: 1623944651,
          moonrise: 1623927120,
          moonset: 0,
          moon_phase: 0.22,
          temp: {
            day: 14.85,
            min: 14.35,
            max: 15.9,
            night: 14.41,
            eve: 15.54,
            morn: 14.46,
          },
          feels_like: {
            day: 14.58,
            night: 14.02,
            eve: 15.29,
            morn: 14.1,
          },
          pressure: 1024,
          humidity: 84,
          dew_point: 12.04,
          wind_speed: 4.03,
          wind_deg: 4,
          wind_gust: 6.09,
          weather: [
            {
              id: 500,
              main: 'Rain',
              description: 'light rain',
              icon: '10d',
            },
          ],
          clouds: 100,
          pop: 0.61,
          rain: 0.64,
          uvi: 1,
        },
      ],
    };
    const imperialRes: any = {
      lat: -33.92,
      lon: 18.42,
      timezone: 'Africa/Johannesburg',
      timezone_offset: 7200,
      current: {
        dt: 1623788698,
        sunrise: 1623736183,
        sunset: 1623771841,
        temp: 59.22,
        feels_like: 58.64,
        pressure: 1013,
        humidity: 81,
        dew_point: 53.4,
        uvi: 0,
        clouds: 75,
        visibility: 10000,
        wind_speed: 5.75,
        wind_deg: 30,
        weather: [
          {
            id: 803,
            main: 'Clouds',
            description: 'broken clouds',
            icon: '04n',
          },
        ],
      },
      daily: [
        {
          dt: 1623751200,
          sunrise: 1623736183,
          sunset: 1623771841,
          moonrise: 1623750300,
          moonset: 1623788460,
          moon_phase: 0.16,
          temp: {
            day: 61.92,
            min: 55.4,
            max: 62.08,
            night: 59.09,
            eve: 59.63,
            morn: 55.8,
          },
          feels_like: {
            day: 60.73,
            night: 58.6,
            eve: 59.23,
            morn: 54.73,
          },
          pressure: 1015,
          humidity: 62,
          dew_point: 48.36,
          wind_speed: 10.69,
          wind_deg: 322,
          wind_gust: 15.1,
          weather: [
            {
              id: 802,
              main: 'Clouds',
              description: 'scattered clouds',
              icon: '03d',
            },
          ],
          clouds: 46,
          pop: 0.17,
          uvi: 1.6,
        },
        {
          dt: 1623837600,
          sunrise: 1623822603,
          sunset: 1623858245,
          moonrise: 1623838800,
          moonset: 1623878640,
          moon_phase: 0.19,
          temp: {
            day: 61.75,
            min: 56.19,
            max: 62.02,
            night: 57.79,
            eve: 60.85,
            morn: 56.59,
          },
          feels_like: {
            day: 61.16,
            night: 57.36,
            eve: 60.4,
            morn: 56.17,
          },
          pressure: 1016,
          humidity: 75,
          dew_point: 53.35,
          wind_speed: 12.95,
          wind_deg: 355,
          wind_gust: 18.59,
          weather: [
            {
              id: 804,
              main: 'Clouds',
              description: 'overcast clouds',
              icon: '04d',
            },
          ],
          clouds: 96,
          pop: 0.13,
          uvi: 1.56,
        },
        {
          dt: 1623924000,
          sunrise: 1623909021,
          sunset: 1623944651,
          moonrise: 1623927120,
          moonset: 0,
          moon_phase: 0.22,
          temp: {
            day: 58.73,
            min: 57.83,
            max: 60.62,
            night: 57.94,
            eve: 59.97,
            morn: 58.03,
          },
          feels_like: {
            day: 58.24,
            night: 57.24,
            eve: 59.52,
            morn: 57.38,
          },
          pressure: 1024,
          humidity: 84,
          dew_point: 53.67,
          wind_speed: 9.01,
          wind_deg: 4,
          wind_gust: 13.62,
          weather: [
            {
              id: 500,
              main: 'Rain',
              description: 'light rain',
              icon: '10d',
            },
          ],
          clouds: 100,
          pop: 0.61,
          rain: 0.64,
          uvi: 1,
        },
        {
          dt: 1624010400,
          sunrise: 1623995438,
          sunset: 1624031059,
          moonrise: 1624015380,
          moonset: 1623968820,
          moon_phase: 0.25,
          temp: {
            day: 61.92,
            min: 55.47,
            max: 63.9,
            night: 59.2,
            eve: 63.05,
            morn: 55.94,
          },
          feels_like: {
            day: 60.67,
            night: 57.97,
            eve: 61.88,
            morn: 55.04,
          },
          pressure: 1029,
          humidity: 61,
          dew_point: 48.07,
          wind_speed: 8.25,
          wind_deg: 154,
          wind_gust: 13.15,
          weather: [
            {
              id: 800,
              main: 'Clear',
              description: 'clear sky',
              icon: '01d',
            },
          ],
          clouds: 4,
          pop: 0,
          uvi: 2.99,
        },
      ],
    };

    it('should create a metric weather model from metric json', () => {
      metricRes.unit = 'metric' as TempUnit;
      const weather: WeatherModel = new WeatherModel().setFromObject(metricRes);
      expect(weather.temp.metric).toBe(metricRes.current.temp);
      expect(weather.daily[0].temp.metric).toBe(metricRes.daily[0].temp.day);
      expect(weather.weather.summary).toBe(metricRes.current.weather[0].main);
    });

    it('should create an imperial weather model from imperial json', () => {
      imperialRes.unit = 'imperial' as TempUnit;
      const weather: WeatherModel = new WeatherModel().setFromObject(
        imperialRes
      );
      expect(weather.temp.imperial).toBe(imperialRes.current.temp);
      expect(weather.daily[0].temp.imperial).toBe(
        imperialRes.daily[0].temp.day
      );
      expect(weather.weather.summary).toBe(imperialRes.current.weather[0].main);
    });
  });
});
