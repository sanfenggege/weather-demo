export interface IWeatherData {
  fxDate: string;
  tempMax: string;
  tempMin: string;
  textDay: string;
  iconDay: string;
}

export interface ILocationData {
  name: string;
  id: string;
  adm2: string; // 城市名
  adm1: string; // 省份名
}