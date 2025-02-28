"use client";
import { useState } from "react";
import SearchBar from "./components/searchbar";
import DisplayWeather from "./components/displayweather";
import Image from "next/image";
import backgroundImg from "../public/bg.png";

// Define the interface for the weather data
interface WeatherData {
  Date: string;
  Checkpoint: string;
  Latitude: number;
  Longitude: number;
  "Max Temp (°C)": number;
  "Min Temp (°C)": number;
  "Rain (mm)": number;
  "Will It Rain?": string;
  "Weather Condition": string;
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData[] | null>(null);

  const handleTrekWeatherClick = () => {
    window.location.reload();
  };

  const handleBigyanClick = () => {
    window.open(
      "https://www.linkedin.com/in/bigyan-byanju-shrestha-3651081b6/",
      "_blank"
    );
  };

  const handleWeatherAPIclick = () => {
    window.open("https://www.weatherapi.com/", "_blank");
  };

  return (
    <div className="flex flex-col p-4 sm:p-6 md:p-8 items-center min-h-screen bg-[#F4F4F4] font-poppins text-black">
      {/* Developer Info */}
      <div className="text-center text-sm sm:text-sm md:text-base tracking-widest mb-3">
        Developed by{" "}
        <span
          className="cursor-pointer text-blue-500"
          onClick={handleBigyanClick}
        >
          Bigyan
        </span>{" "}
        |{" "}
        <span
          className="cursor-pointer text-blue-500"
          onClick={handleWeatherAPIclick}
        >
          Weather source: Weather API
        </span>
      </div>

      {/* Title Section */}
      <div className="text-center">
        <h1
          className="text-2xl sm:text-3xl md:text-4xl text-[#1E80FF] font-bold cursor-pointer"
          onClick={handleTrekWeatherClick}
        >
          TrekWeather
        </h1>
        <p className="text-sm sm:text-base font-light tracking-widest">
          Your reliable trek partner
        </p>
      </div>

      {/* Description */}
      <div className="flex flex-col items-center mt-5 text-center max-w-2xl">
        <p className="text-lg sm:text-xl md:text-2xl font-medium">
          Discover the <span className="text-blue-500">weather</span> conditions
          of your <span className="text-[#1E80FF]">dream trek</span>.
        </p>
        <p className="text-sm sm:text-base md:text-lg font-light mt-2">
          Search your planned trek and view the weather forecast for the next
          five days at each checkpoint along the trail.
        </p>

        {/* Search Bar */}
        <div className="flex justify-center mt-5 p-2 border-2 w-full max-w-lg border-[#1E80FF] rounded-3xl">
          <SearchBar onWeatherDataFetched={setWeatherData} />
        </div>
      </div>

      {/* Background Image (Hidden on smaller screens) */}
      {!weatherData && (
        <Image
          src={backgroundImg}
          alt="Trekking"
          width={900}
          height={800}
          className="mt-5 w-full max-w-lg sm:max-w-xl md:max-w-2xl"
        />
      )}

      {/* Display Weather */}
      {weatherData && weatherData.length > 0 && (
        <div className="flex flex-col items-center mt-5 w-full max-w-4xl">
          <DisplayWeather data={weatherData} />
        </div>
      )}
    </div>
  );
}
