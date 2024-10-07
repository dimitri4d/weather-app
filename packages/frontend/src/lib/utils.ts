import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function kelvinToCelsius(kelvin: number) {
  return (kelvin - 273.15).toFixed(1);
}

export const getTemperatureColor = (temp: number) => {
  if (temp <= 0) return "bg-blue-200";
  if (temp > 0 && temp <= 15) return "bg-green-200";
  if (temp > 15 && temp <= 30) return "bg-yellow-200";
  return "bg-red-200";
};
