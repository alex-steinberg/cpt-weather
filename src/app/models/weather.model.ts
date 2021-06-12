import { Deserializable } from './deserializable.model';

class WeatherReadings implements Deserializable<WeatherReadings> {
  temp: number;
  feels_like?: number;
  temp_min?: number;
  temp_max?: number;
  pressure?: number;
  humidity?: number;

  setFromObject(json: any): WeatherReadings {
    const { temp = null } = json;
    this.temp = temp;
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
  id: number;
  weather: WeatherSummary[];
  main: WeatherReadings;

  setFromObject(json: any): WeatherModel {
    if (json.id) {
      this.id = json.id;
    }
    if (json.weather && json.weather.length > 0) {
      this.weather = json.weather.map((item) =>
        new WeatherSummary().setFromObject(item)
      );
    }
    if (json.main) {
      this.main = new WeatherReadings().setFromObject(json.main);
    }
    return this;
  }
}
