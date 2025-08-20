import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './SearchBox.css';
import { useState } from 'react';

export default function SearchBox({ updateInfo }) {
    const [city, setCity] = useState("");
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "df44b33a07c87ec72dd98312c3b366c3";

    const getWeatherInfo = async (cityName) => {
        try {
            const response = await fetch(`${API_URL}?q=${cityName}&appid=${API_KEY}&units=metric`);
            const jsonResponse = await response.json();

            if (response.ok) {
                let result = {
                    city: jsonResponse.name,
                    temp: jsonResponse.main.temp,
                    tempMin: jsonResponse.main.temp_min,
                    tempMax: jsonResponse.main.temp_max,
                    humidity: jsonResponse.main.humidity,
                    feelsLike: jsonResponse.main.feels_like,
                    weather: jsonResponse.weather[0].description,
                };
                console.log("Weather Data:", result);
                return result;
            } else {
                alert(`Error: ${jsonResponse.message}`);
                return null;
            }
        } catch (error) {
            console.error("Fetch failed:", error);
            alert("Something went wrong while fetching weather data.");
            return null;
        }
    };

    const handleChange = (event) => {
        setCity(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Submitted City:", city);

        const newInfo = await getWeatherInfo(city);
        if (newInfo) {
            updateInfo(newInfo);
        }

        setCity(""); 
    };

    return (
        <div className='SearchBox'>
            <form onSubmit={handleSubmit}>
                <TextField
                    style={{ backgroundColor: "white" }}
                    id="city"
                    label="City name"
                    variant="outlined"
                    required
                    onChange={handleChange}
                    value={city}
                />
                <br /><br />
                <Button variant="contained" type="submit">Search</Button>
            </form>
        </div>
    );
}
