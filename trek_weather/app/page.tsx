"use client";
import { useState } from "react";
import SearchBar from "./components/searchbar";
import DisplayWeather from "./components/displayweather";
import Image from "next/image";
import backgroundImg from "../public/bg.png";

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);

  const handleTrekWeatherClick = () => {
    window.location.reload(); // Reload the page when clicking on TrekWeather
  };

  const handleBigyanClick = () => {
    window.open(
      "https://www.linkedin.com/in/bigyan-byanju-shrestha-3651081b6/",
      "_blank"
    ); // Open LinkedIn profile in a new tab
  };

  const handleWeatherAPIclick = () => {
    window.open("https://www.weatherapi.com/", "_blank"); // Open WeatherAPI in a new tab
  };

  return (
    <div className="flex flex-col p-3.5 items-center h-screen bg-[#F4F4F4] font-(family-name:poppins) text-black ">
      <div>
        <p className="font-medium text-[10px] mb-3 tracking-widest">
          Developed by{" "}
          <span
            className="cursor-pointer text-blue-500"
            onClick={handleBigyanClick}
          >
            Bigyan
          </span>
          {" | "}
          <span
            className="cursor-pointer text-blue-500"
            onClick={handleWeatherAPIclick}
          >
            Weather source: Weather API
          </span>
        </p>
      </div>
      <div className="flex flex-col text-center justify-center">
        <div
          className="text-3xl text-[#1E80FF] font-bold cursor-pointer"
          onClick={handleTrekWeatherClick}
        >
          TrekWeather
        </div>
        <div className="text-sm font-light tracking-widest">
          Your reliable trek partner
        </div>
      </div>
      <div className="flex flex-col items-center mt-5">
        <p className="text-3xl font-medium">
          Discover the <span className="text-blue-500">weather</span> conditions
          of your <span className="text-[#1E80FF]"> dream trek</span>.
        </p>
        <p className="text-xl font-light mt-2">
          Search your planned trek and view the weather forecast for the next
          five days at each checkpoint along the trail.
        </p>
        <div className="flex justify-center mt-5 p-2 border-2 w-xl border-[#1E80FF] rounded-3xl">
          {/* Pass handler to SearchBar */}
          <SearchBar onWeatherDataFetched={setWeatherData} />
        </div>
      </div>
      {!weatherData && (
        <Image
          src={backgroundImg}
          alt="Trekking"
          width={900}
          height={800}
          className="mt-5"
        />
      )}

      {/* Show DisplayWeather only if data is available */}

      {weatherData && (
        <div className="flex flex-col items-center mt-5">
          <DisplayWeather data={weatherData} />
        </div>
      )}
    </div>
  );
}
