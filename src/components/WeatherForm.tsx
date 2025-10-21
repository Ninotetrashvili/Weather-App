"use client";

import { useState } from "react";

type WeatherFormProps = {
  onSearch: (city: string) => void;
};

export default function WeatherForm({ onSearch }: WeatherFormProps) {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch(city.trim());
    setCity("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10 w-full max-w-md mx-auto"
    >
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name..."
        className="px-4 py-2 rounded-lg border border-gray-300 w-full sm:w-60 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="px-4 py-2 w-full sm:w-auto bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
      >
        Search
      </button>
    </form>
  );
}
