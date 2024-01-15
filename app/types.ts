export interface Forecast {
  date: string;
  temperature: number;
  description: string;
  humidity: number;
  pressure: number;
  windSpeed: number;
  sunrise: string;
  sunset: string;
}

export interface WeatherData {
  city: string;
  forecast: Forecast[];
}
