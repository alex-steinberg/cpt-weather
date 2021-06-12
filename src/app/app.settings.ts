export const appSettings = {
  apiKey: '9a3fc49b4cb180c10ae730aeda6439f5',
  apiHost: 'http://api.openweathermap.org/',
  apiPath: 'data/2.5/',
  getApiUrl: (endpoint: string): string =>
    `${appSettings.apiHost}${appSettings.apiPath}${endpoint}?APPID=${appSettings.apiKey}`,
};
