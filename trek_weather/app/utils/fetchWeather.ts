const weatherApiKey = process.env.GETWEATHERCODE;

const fetchWeatherData = async (trailName: string) => {
  try {
    const response = await fetch(
      `https://serve-weather.azurewebsites.net/api/getWeather?trail_name=${encodeURIComponent(
        trailName
      )}&code=${weatherApiKey}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    console.log("Weather data fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

export default fetchWeatherData;
