import React, { useState, useEffect, useRef } from "react";
import appStyle from "./App.module.css";
const KEY = "b9d76cd61601105b314fb40e7578a9ea";
const URL = "https://api.openweathermap.org/data/2.5/weather?";
function App() {
  const [searchCity, setSearchCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState(null);
  const inputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const city = inputRef.current.value;
    setSearchCity(city);
    if (!city) {
      setErrorMessage("Please select a city");
      setWeatherInfo(null);
    }
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) {
        return;
      }

      setLoading(true);
      // process

      try {
        const response = await fetch(
          URL + `q=${searchCity}&appid=${KEY}&lang=en`
        );
        const data = await response.json();
        if (response.ok) {
          setWeatherInfo(data);
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchWeatherData();
    console.log(weatherInfo);
  }, [searchCity]);

  return (
    <div className={appStyle.container}>
      <div className={appStyle.title}>Current Weather search</div>
      <form onSubmit={submitHandler} action="#">
        <input ref={inputRef} type="text" placeholder="city name" />
        <button> Search</button>
      </form>
      <div className={appStyle.message}>
        {loading && <div>{"loading ...."}</div>}
        {errorMessage && (
          <div
            className="error-message"
            style={{
              color: "red",
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
          >
            {errorMessage}
          </div>
        )}
        {weatherInfo && (
          <div className="weather-info">
            The weather is{" "}
            <strong>
              <i style={{ color: "#862e9c", textTransform: "capitalize" }}>
                {weatherInfo.weather[0].description}
              </i>
            </strong>{" "}
            and outside, the temperature is about{" "}
            <strong>
              <i style={{ color: "#862e9c", textTransform: "capitalize" }}>
                {Math.round(weatherInfo.main.temp - 273.15)} Celcius Degree
              </i>
            </strong>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
