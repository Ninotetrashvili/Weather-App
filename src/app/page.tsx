"use client";

import { useState } from "react";
import WeatherForm from "@/components/WeatherForm";
import WeatherCard from "@/components/WeatherCard";
import { WeatherData } from "./types";

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");

  const getBackgroundClass = (description: string) => {
    const desc = description.toLowerCase();
    if (desc.includes("cloud")) return "from-gray-400 to-gray-200";
    if (desc.includes("rain")) return "from-blue-600 to-gray-500";
    if (desc.includes("snow")) return "from-white to-blue-200";
    if (desc.includes("clear")) return "from-blue-300 to-blue-100";
    if (desc.includes("storm")) return "from-gray-700 to-gray-900";
    return "from-blue-100 to-blue-200";
  };

  const fetchWeather = async (city: string) => {
    try {
      setError("");
      setWeather(null);

      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      if (!apiKey) throw new Error("API key is missing");

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      const data = await res.json();

      if (!res.ok || !data.weather || data.weather.length === 0) {
        throw new Error(data.message || "City not found");
      }

      setWeather({
        city: data.name,
        temp: data.main?.temp ?? 0,
        description: data.weather[0]?.description ?? "No description",
        icon: data.weather[0]?.icon ?? "01d",
        humidity: data.main?.humidity ?? 0,
        windSpeed: data.wind?.speed ?? 0,
        pressure: data.main?.pressure ?? 0,
        sunrise: data.sys?.sunrise ?? 0,
        sunset: data.sys?.sunset ?? 0,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <main
      className={`flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 transition-colors duration-1000 ${
        weather
          ? `bg-gradient-to-b ${getBackgroundClass(weather.description)}`
          : "bg-gradient-to-b from-blue-100 to-blue-200"
      }`}
    >
      <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">
        Weather App ☀️
      </h1>
      <WeatherForm onSearch={fetchWeather} />

      {error && <p className="text-red-600 mt-6">{error}</p>}

      {weather && <WeatherCard {...weather} />}
    </main>
  );
}
