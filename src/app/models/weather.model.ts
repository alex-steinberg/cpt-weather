import { Deserializable } from './deserializable.model';

export interface TempReading {
  metric?: number;
  imperial?: number;
}
export class WeatherDaily implements Deserializable<WeatherDaily> {
  dt: number;
  temp: TempReading = {};
  weather: WeatherSummary;

  setFromObject?(json: any): WeatherDaily {
    const {
      dt,
      temp: { day: temp },
      unit,
      weather,
    } = json;
    this.dt = dt;
    this.temp[unit] = temp;
    if (weather && weather.size > 0) {
      this.weather = new WeatherSummary().setFromObject(weather[0]);
    }
    return this;
  }
}

export class WeatherSummary implements Deserializable<WeatherSummary> {
  id: number;
  summary: string;
  description: string;
  icon: string;

  setFromObject(json: any): WeatherSummary {
    const { id, main: summary, description, icon } = json;
    this.summary = summary;
    this.id = id;
    this.description = description;
    this.icon = icon;
    return this;
  }
}

export class WeatherModel implements Deserializable<WeatherModel> {
  dt: number;
  weather: WeatherSummary;
  temp: TempReading = {};
  daily: WeatherDaily[] = [];

  setFromObject(json: any): WeatherModel {
    const {
      current: { temp: temp, weather: weather, dt: dt },
      unit,
      daily,
    } = json;
    this.dt = dt;
    this.temp[unit] = temp;
    if (weather && weather.length > 0) {
      this.weather = new WeatherSummary().setFromObject(weather[0]);
    }
    if (daily && daily.length > 0) {
      this.daily = daily.map((item) =>
        new WeatherDaily().setFromObject({ ...item, unit })
      );
    }
    return this;
  }
}
