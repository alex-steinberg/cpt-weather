import { TempReading } from './models/weather.model';

declare const process: any;

export const appSettings = {
  apiKey: process.env.OWM_API_KEY, //'',
  apiHost: 'http://api.openweathermap.org/',
  apiPath: 'data/2.5/',
  timeDateFormat: 'cccc, d LLL yyy, HH:mm',
  baseTimeZone: 'Africa/Johannesburg',
  getApiUrl: (endpoint: string): string =>
    `${appSettings.apiHost}${appSettings.apiPath}${endpoint}?APPID=${appSettings.apiKey}`,
};
