const express = require("express")
const cors = require("cors")
const axios = require("axios")
const { parse } = require("dotenv")
require("dotenv").config()

const app = express()

const corsOptions = {
  // origin: "http://localhost:1234",
  origin: "https://client-sage-eight-38.vercel.app/",
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))

const forecastDays = 8

app.get("/weather", (req, res) => {
  const { lat, lon } = req.query
  axios
    .get(`https://api.weatherapi.com/v1/forecast.json`, {
      params: {
        key: process.env.WEATHER_API_KEY,
        q: `${lat},${lon}`,
        days: forecastDays,
      },
    })
    .then(({ data }) => {
      res.json({
        location: parseLocation(data),
        current: parseCurrentWeather(data),
        daily: parseDailyWeather(data),
        hourly: parseHourlyWeather(data),
      })
    })
    .catch((e) => {
      console.log(e)
      res.sendStatus(500)
    })
})

function parseLocation({ location }) {
  const { name, country } = location
  return {
    city: name,
    country: country,
  }
}

function parseCurrentWeather({ current, forecast }) {
  const { temp_c: currentTemp, condition, wind_kph, feelslike_c } = current
  const { forecastday } = forecast
  const { maxtemp_c, mintemp_c } = forecastday[0].day

  return {
    currentTemp: Math.round(currentTemp),
    highTemp: Math.round(maxtemp_c),
    lowTemp: Math.round(mintemp_c),
    windSpeed: Math.round(wind_kph),
    precip: forecastday[0].day.daily_chance_of_rain,
    feelslike: Math.round(feelslike_c),
    icon: condition.icon,
    description: condition.text,
  }
}

function parseDailyWeather({ forecast }) {
  return forecast.forecastday.slice(1).map(({ day, date_epoch }) => {
    const { avgtemp_c } = day
    return {
      timestamp: date_epoch * 1000,
      icon: day.condition.icon,
      temp: Math.round(avgtemp_c),
    }
  })
}

HOUR_IN_SECONDS = 3600
function parseHourlyWeather({ forecast, current }) {
  const { forecastday } = forecast
  const { hour } = forecastday[0]

  return hour
    .filter(
      (hour) => hour.time_epoch > current.last_updated_epoch - HOUR_IN_SECONDS
    )
    .map((hour) => {
      return {
        timestamp: hour.time_epoch * 1000,
        temp: Math.round(hour.temp_c),
        icon: hour.condition.icon,
        feelslike: Math.round(hour.feelslike_c),
        windSpeed: Math.round(hour.wind_kph),
        precip: Math.round(hour.chance_of_rain),
      }
    })
}

// app.listen(3001)
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
