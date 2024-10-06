import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class WeatherService {
  private readonly apiKey = process.env.WEATHER_API_KEY;
  private readonly baseUrl = 'http://api.openweathermap.org/data/2.5';

  constructor(private readonly http: HttpService) {}

  async getCurrentWeather(cityId: number) {
    const url = `${this.baseUrl}/weather?id=${cityId}&appid=${this.apiKey}`;

    return this.http
      .get(url)
      .pipe(map((res) => res.data))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('Weather API not available');
        }),
      );
  }

  async getWeatherForecast(cityId: number) {
    const url = `${this.baseUrl}/forecast?id=${cityId}&appid=${this.apiKey}`;

    return this.http
      .get(url)
      .pipe(map((res) => res.data))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('Forecast API not available');
        }),
      );
  }
}
