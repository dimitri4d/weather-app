import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@frontend/components/ui/table"; // Importing ShadCN table components
import { Button } from "@frontend/components/ui/button";
import { getTemperatureColor, kelvinToCelsius } from "@frontend/lib/utils";

interface ForecastProps {
  forecastData: Record<
    string,
    Array<{
      dt_txt: string;
      main: {
        temp: number;
        humidity: number;
      };
      weather: Array<{
        description: string;
      }>;
      wind: {
        speed: number;
      };
    }>
  >;
  selectedDay: string;
  setSelectedDay: (day: string) => void;
}

export default function Forecast({
  forecastData,
  selectedDay,
  setSelectedDay,
}: ForecastProps) {
  if (!forecastData) return null;

  console.log(forecastData);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Forecast</h2>
      <div className="py-2">
        {Object.keys(forecastData).map((date) => (
          <Button
            key={date}
            variant="outline"
            className={`mx-1 ${
              selectedDay === date ? "bg-zinc-950 text-white" : ""
            } `}
            onClick={() => setSelectedDay(date)}
          >
            {date}
          </Button>
        ))}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Temperature (°C)</TableHead>
            <TableHead>Weather</TableHead>
            <TableHead>Humidity (%)</TableHead>
            <TableHead>Wind Speed (m/s)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {forecastData[selectedDay].map((forecast, index) => (
            <TableRow
              className={getTemperatureColor(
                Number(kelvinToCelsius(forecast.main.temp))
              )}
              key={index}
            >
              <TableCell>{forecast.dt_txt.split(" ")[1]}</TableCell>
              <TableCell>{kelvinToCelsius(forecast.main.temp)}</TableCell>
              <TableCell>{forecast.weather[0].description}</TableCell>
              <TableCell>{forecast.main.humidity}</TableCell>
              <TableCell>{forecast.wind.speed}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
