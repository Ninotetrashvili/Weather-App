"use client";

import { WeatherData } from "@/app/types";

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export default function WeatherCard({
  city,
  temp,
  description,
  icon,
  humidity,
  windSpeed,
  pressure,
  sunrise,
  sunset,
}: WeatherData) {
  return (
    <div className="mt-10 bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-md text-center w-full max-w-xs sm:w-72 mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{city}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
        className="mx-auto"
      />
      <p className="text-xl text-gray-700 font-semibold">{temp}°C</p>
      <p className="capitalize text-gray-600">{description}</p>
      <p className="text-sm text-gray-500 mt-2">Humidity: {humidity}%</p>
      <p className="text-sm text-gray-500">Wind: {windSpeed} m/s</p>
      <p className="text-sm text-gray-500">Pressure: {pressure} hPa</p>
      <p className="text-sm text-gray-500">
        Sunrise: {formatTime(sunrise)} | Sunset: {formatTime(sunset)}
      </p>
    </div>
  );
}
