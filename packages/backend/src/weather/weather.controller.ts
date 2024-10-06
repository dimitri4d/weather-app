import { Controller, Get, Param } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('weather')
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('current/:cityId')
  @ApiOperation({ summary: 'Get current weather by city ID' })
  @ApiParam({ name: 'cityId', type: Number, description: 'ID of the city' })
  @ApiResponse({ status: 200, description: 'Current weather data' })
  getCurrentWeather(@Param('cityId') cityId: number) {
    return this.weatherService.getCurrentWeather(cityId);
  }

  @Get('forecast/:cityId')
  @ApiOperation({ summary: 'Get weather forecast by city ID' })
  @ApiParam({ name: 'cityId', type: Number, description: 'ID of the city' })
  @ApiResponse({ status: 200, description: 'Weather forecast data' })
  getWeatherForecast(@Param('cityId') cityId: number) {
    return this.weatherService.getWeatherForecast(cityId);
  }
}
