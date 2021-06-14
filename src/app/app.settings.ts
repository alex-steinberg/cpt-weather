declare const process: any;

export const appSettings = {
  apiKey: process.env.OWM_API_KEY, //'',
  apiHost: 'http://api.openweathermap.org/',
  apiPath: 'data/2.5/',
  getApiUrl: (endpoint: string): string =>
    `${appSettings.apiHost}${appSettings.apiPath}${endpoint}?APPID=${appSettings.apiKey}`,
};
