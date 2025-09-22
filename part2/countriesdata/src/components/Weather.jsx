import { useEffect, useState } from "react"
import axios from "axios"

const Weather = ({ city }) => {
    const api_key = import.meta.env.VITE_API_KEY
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`)
            .then((response) => {
                setWeather(response.data)
                console.log(response.data)
            })
    }, [])

    if (weather === null) {
        return null
    } else {
        return (
            <>
                <h2>Weather in {city}</h2>
                <p>Temperature {weather.current.temperature} Celsius</p>
                <img src={weather.current.weather_icons} alt={`weather at ${city}`}/>
                <p>Wind {weather.current.wind_speed} m/s</p>
            </>
        )
    }
}

export default Weather