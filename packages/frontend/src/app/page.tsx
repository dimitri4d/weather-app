"use client";

import { useEffect, useState } from "react";
import cities from "../cities.json";
import CurrentWeather from "@frontend/components/CurrentWeather";
import Forecast from "@frontend/components/Forecast";
import { Combobox } from "@frontend/components/ui/combobox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@frontend/components/ui/accordion";
import { Forecast as ForecastType, WeatherData } from "@frontend/types";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<{
    [key: string]: ForecastType[];
  }>({});
  const [selectedCity, setSelectedCity] = useState(cities[0].id);
  const [showForecast, setShowForecast] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  // console.log("API_BASE_URL: ", API_BASE_URL);

  useEffect(() => {
    async function fetchWeather(cityId: number) {
      const weatherUrl = `${API_BASE_URL}/weather/current/${cityId}`;
      const response = await fetch(weatherUrl);
      const data = await response.json();
      setWeatherData(data);
    }

    async function fetchForecast(cityId: number) {
      const forecastUrl = `${API_BASE_URL}/weather/forecast/${cityId}`;
      const response = await fetch(forecastUrl);
      const data = await response.json();

      const groupedForecast = groupForecastByDay(data.list);
      const sortedDays = Object.keys(groupedForecast).sort();
      const sortedForecast = Object.fromEntries(
        sortedDays.map((day) => [day, groupedForecast[day]])
      );

      setForecastData(sortedForecast);
      const firstDay = sortedDays[0];
      setSelectedDay(firstDay);
    }

    fetchWeather(selectedCity);
    fetchForecast(selectedCity);
  }, [selectedCity]);

  const groupForecastByDay = (forecastList: Array<ForecastType>) => {
    const groupedForecasts: { [key: string]: Array<ForecastType> } = {};

    for (const forecast of forecastList) {
      const date = forecast.dt_txt.split(" ")[0];

      if (!groupedForecasts[date]) {
        groupedForecasts[date] = [];
      }

      groupedForecasts[date].push(forecast);
    }

    return groupedForecasts;
  };

  return (
    <section className="container w-full">
      <div className="w-10/12 place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
        <div className="text-center space-y-8">
          <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
            <h1>Weather forecast</h1>
          </div>

          <div className="space-y-4 md:space-y-0 md:space-x-4">
            <Combobox
              cities={cities}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
            />
          </div>

          <div className="space-y-2 md:space-y-0 md:space-x-4 w-full">
            {weatherData && <CurrentWeather weatherData={weatherData} />}
          </div>

          <div className="space-y-4 ">
            <Accordion type="single" className="w-full" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger
                  className="w-full flex justify-center px-4 py-2 text-2xl font-semibold "
                  onClick={() => setShowForecast(!showForecast)}
                >
                  {showForecast ? "Hide Forecast" : "See Forecast"}
                </AccordionTrigger>
                <AccordionContent>
                  <Forecast
                    forecastData={forecastData}
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
