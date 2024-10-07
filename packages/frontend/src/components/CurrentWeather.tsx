import React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@frontend/components/ui/card";
import { kelvinToCelsius } from "@frontend/lib/utils";
import { WeatherData } from "@frontend/types";

export default function CurrentWeather({
  weatherData,
}: {
  weatherData: WeatherData;
}) {
  if (!weatherData) return <p>Loading...</p>;

  const temperatureCelsius = Number(kelvinToCelsius(weatherData.main.temp));
  console.log("temperatureCelsius: ", temperatureCelsius);

  const getTemperatureColor = (temp: number) => {
    if (temp <= 0) return "bg-blue-200";
    if (temp > 0 && temp <= 15) return "bg-green-200";
    if (temp > 15 && temp <= 30) return "bg-yellow-200";
    return "bg-red-200";
  };

  const colorTemp = getTemperatureColor(temperatureCelsius);
  // console.log("colorTemp: ", colorTemp);
  return (
    <Card className={colorTemp}>
      <CardHeader>
        <CardTitle>Current forecast in {weatherData.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-l">
          <strong>Temperature:</strong> {temperatureCelsius}
          °C
        </p>
        <p className="text-gray-700 text-l">
          <strong>Feels Like:</strong>{" "}
          {kelvinToCelsius(weatherData.main.feels_like)}°C
        </p>
        <p className="text-gray-700 text-l">
          <strong>Weather:</strong> {weatherData.weather[0].description}
        </p>
        <p className="text-gray-700 text-l">
          <strong>Humidity:</strong> {weatherData.main.humidity}%
        </p>
      </CardContent>
    </Card>
  );
}
