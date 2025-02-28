import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import fetchWeatherData from "../utils/fetchWeather"; // Import fetch function
import { CircularProgress } from "@mui/material";

// Sample trail data (replace with actual dataset)
const trailData = [
  { name: "Aanbu Kahireni Trail" },
  { name: "Annapurna Base Camp Heli Trek" },
  { name: "Annapurna Base Camp Short Trek" },
  { name: "Annapurna Base Camp Trek" },
  { name: "Annapurna Circle Trek" },
  { name: "Annapurna Circuit Short Trek" },
  { name: "Annapurna Circuit Trek" },
  { name: "Annapurna Circuit Trek with Tilicho Lake and Poon Hill" },
  { name: "Annapurna Panorama Trek" },
  { name: "Annapurna Sanctuary Trek" },
  { name: "Annapurna Sunrise and Everest View Trek" },
  { name: "Annapurna Tilicho Lake Trek" },
  { name: "Annapurna Trek: Manang to Tilicho Base Camp" },
  { name: "Annapurna With Tilicho Lake Trek" },
  { name: "Banthati Mohare Trail I" },
  { name: "Banthati Mohare Trail via Lespar Village" },
  { name: "Birendra Taal via Manaslu Base Camp" },
  { name: "Birendra Taal via Samagaun" },
  { name: "Champa Devi" },
  { name: "Chandragiri to Hattiban" },
  { name: "Chimp Tower Trail" },
  { name: "Chisapani Trek- Sundarijal to Chauki Bhanjyang" },
  { name: "Chitwan Safari" },
  { name: "Dadagaun - Surya Chaur Trek" },
  { name: "Daruabari Trail" },
  { name: "Dhaulagiri Circuit Trek" },
  { name: "Dhorpatan Trek" },
  { name: "Dingboche to Chukhung to Imja Tse Base Camp" },
  { name: "Everest Advanced Base Camp Trek from Tibet" },
  { name: "Everest Base Camp Heli Shuttle Trek" },
  { name: "Everest Base Camp Short Trek" },
  { name: "Everest Base Camp Trek" },
  { name: "Everest Base Camp Trek for Seniors" },
  { name: "Everest Base Camp Trek for Youths" },
  { name: "Everest Base Camp Trek via Gokyo Lake" },
  { name: "Everest Base Camp Trek via Gokyo Lakes and Cho La Pass" },
  { name: "Everest Base Camp Trek with Chola and Renjo La Pass" },
  { name: "Everest Chola Pass Trek" },
  { name: "Everest High Passes Trek" },
  { name: "Everest Kalapathar Trekking" },
  { name: "Everest Kangshung Face Trek" },
  { name: "Everest Panorama Trek" },
  { name: "Everest View Trek" },
  { name: "Fewa Lake Trek" },
  { name: "Ganja La Pass Trek" },
  { name: "Ghorepani Poon Hill Trek" },
  { name: "Gokyo Lake Renjo La Pass Trek" },
  { name: "Gokyo Lake Trek" },
  { name: "Gokyo Lakes and Gokyo Ri Trek" },
  { name: "Gokyo Ri Trek" },
  { name: "Gosaikunda Lake Trek" },
  { name: "Guerrilla Trail Trek" },
  { name: "Helambu Circuit Trek" },
  { name: "Helambu Trek" },
  { name: "HInku Cave" },
  { name: "Ice Lakes (Kicho Tal) Trail" },
  { name: "Jumla Rara Lake Trek" },
  { name: "Kanchenjunga Circuit Trek" },
  { name: "Kathmandu MTB to Tatopani Hot-Springs" },
  { name: "Kathmandu MTB Circuit" },
  { name: "Khopra Ridge Community Trek" },
  { name: "Kulekhani via Naubise" },
  { name: "Kuri Kalinchowk Hiking Trail" },
  { name: "Langtang Gosaikunda Trek" },
  { name: "Langtang Helambu Trek" },
  { name: "Langtang Trek" },
  { name: "Langtang Valley to Kganjin Ri" },
  { name: "Langtang Valley Trek" },
  { name: "Langtang Valley Trek with Ganja la Pass" },
  { name: "Langtang Valley Trekking" },
  { name: "Langtang, Gosainkunda and Helambu Trek" },
  { name: "Lukla Pakhding Namchebazar" },
  { name: "Makalu Base Camp Trek" },
  { name: "Makalu Base Camp Trek with Arun Valley" },
  { name: "Manang Trail" },
  { name: "Manaslu - Tsum Valley - Annapurna Trek" },
  { name: "Manaslu and Annapurna Trek with Tilicho Lake" },
  { name: "Manaslu Circuit Trek" },
  { name: "Manaslu Circuit Trekking" },
  { name: "Mardi Himal - Kande to High Camp Trail" },
  { name: "Mardi Himal Trek" },
  { name: "Mera Peak Trek" },
  { name: "Milerepa Cave and Glacier Trail" },
  { name: "Mohare Danda Segment 1" },
  { name: "Mohare Danda Segment 2" },
  { name: "Mohare Danda Segment 3" },
  { name: "Mohare Danda Segment 4" },
  { name: "Moharedada Trail" },
  { name: "Nagarjung HIll Top" },
  { name: "Nagarkot to Kattike Nature Trail" },
  { name: "Nar Phu Valley Trek" },
  { name: "Phulchowki" },
  { name: "Pikey Peak Trek" },
  { name: "Poon Hill Trek: Ghandruk to Naya Pol" },
  { name: "Poon Hill Trek: Ghorepani Doerali to Tadapani" },
  { name: "Poon Hill Trek: Naya Pol to Tikhedunga" },
  { name: "Poon Hill Trek: Tadapani to Ghandruk" },
  { name: "Poon Hill Trek: Tikhedhunga to Ghorepani Deorali" },
  { name: "Rara Lake Trek" },
  { name: "Ruby Valley Trek" },
  { name: "Samagaun - Gomba" },
  { name: "Sarangkot Tower" },
  { name: "Shey Phoksundo Lake Trek" },
  { name: "Tamang Heritage Trail" },
  { name: "Tamang Heritage Trek" },
  { name: "Tashi Lapcha Pass Trek" },
  { name: "Tenzing Hillary Everest Marathon" },
  { name: "The Royal Trek" },
  { name: "Three Passes Trek" },
  { name: "Tinpane Tower Ghusel" },
  { name: "Tokla to Chhomrong" },
  { name: "Tsum Valley and Manaslu Trek" },
  { name: "Tsum Valley Trek" },
  { name: "Tsum Valley with Manaslu Trek" },
  { name: "Upper Dolpo Circuit Trek" },
  { name: "Upper Mustang Tiji Festival Trek" },
  { name: "Upper Mustang Trek" },
  { name: "Upper Mustang Trek with Yara" },
  { name: "Valley Kora" },
  { name: "World Peace Pagoda" },
  { name: "Yalung Base Camp Trek" },
];

// Define the type for each trail suggestion
interface Trail {
  name: string;
}

// Define the type for the weather data
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
// Function to get suggestions based on input
const getSuggestions = (value: string) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0
    ? []
    : trailData.filter((trail) =>
        trail.name.toLowerCase().startsWith(inputValue)
      );
};

// Function to get the value to be displayed in the input field
const getSuggestionValue = (suggestion: { name: string }) => suggestion.name;

// Function to render suggestion items
const renderSuggestion = (suggestion: { name: string }) => (
  <div>{suggestion.name}</div>
);

// Define props type for passing data
interface SearchBarProps {
  onWeatherDataFetched: (data: WeatherData[]) => void;
}

// SearchBar component
const SearchBar: React.FC<SearchBarProps> = ({ onWeatherDataFetched }) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<Trail[]>([]);
  const [loading, setLoading] = useState(false);

  // Handle input change
  const onChange = (
    event: React.FormEvent,
    { newValue }: { newValue: string }
  ) => {
    setValue(newValue);
  };

  // Handle suggestions fetch
  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setSuggestions(getSuggestions(value));
  };

  // Handle suggestions clear
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // Handle selection of a suggestion
  const onSuggestionSelected = async (
    event: React.FormEvent,
    { suggestion }: { suggestion: { name: string } }
  ) => {
    console.log("Selected suggestion:", suggestion);
    setValue(suggestion.name); // Set input field to selected value
    setLoading(true); // Set loading to true when fetching data

    const data = await fetchWeatherData(suggestion.name); // Fetch weather data
    onWeatherDataFetched(data); // Send data to parent component
    setLoading(false); // Set loading to false once data is fetched
  };

  return (
    <div className="w-full">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          placeholder: "Type a trail location",
          value,
          onChange,
          className:
            "w-full p-2 border border-transparent rounded-md focus:outline-none focus:ring-0 focus:border-transparent",
        }}
        onSuggestionSelected={onSuggestionSelected} // Handle selection
        theme={{
          input: {
            width: "100%",
            // Ensure the input takes full width
            padding: "8px", // Adjust padding if needed
            // Style the border
          },
          suggestion: {
            padding: "8px 16px",
            cursor: "pointer",
            fontSize: "14px", // Make text smaller
            color: "#6b7280", // Grey color (Tailwind's gray-500)
          },
          suggestionsContainerOpen: {
            maxHeight: "200px", // Limit the height of the suggestion list
            overflowY: "auto", // Enable vertical scrolling
          },
        }}
      />
      {loading && (
        <div className="flex justify-center mt-2">
          <CircularProgress /> {/* Display the loading spinner */}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
