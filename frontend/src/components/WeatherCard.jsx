import { useEffect, useState } from 'react'

function WeatherCard() {

  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {

    const fetchWeather = async () => {

      try {

        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=17.3850&longitude=78.4867&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=Asia%2FKolkata'
        )

        if (!response.ok) {
          throw new Error('Weather request failed')
        }

        const data = await response.json()

        setWeather(data.current)

      } catch (error) {

        setError(true)

      } finally {

        setLoading(false)

      }
    }

    fetchWeather()

  }, [])

  const getWeatherDescription = (code) => {

    if (code === 0) return 'Clear Sky'
    if (code <= 3) return 'Partly Cloudy'
    if (code <= 48) return 'Foggy'
    if (code <= 57) return 'Drizzle'
    if (code <= 67) return 'Rain'
    if (code <= 77) return 'Snow'
    if (code <= 82) return 'Rain Showers'
    if (code <= 86) return 'Snow Showers'
    if (code >= 95) return 'Thunderstorm'

    return 'Cloudy'
  }

  const getWeatherIcon = (code) => {

    if (code === 0) return '☀️'
    if (code <= 3) return '🌤️'
    if (code <= 48) return '🌫️'
    if (code <= 67) return '🌧️'
    if (code <= 77) return '❄️'
    if (code <= 82) return '🌦️'
    if (code <= 86) return '🌨️'
    if (code >= 95) return '⛈️'

    return '☁️'
  }

  return (
    <section className="py-5">

      <div className="container">

        <div className="weather-card">

          <div className="weather-heading">
            <span className="section-label">
              CAMPUS WEATHER
            </span>

            <h2 className="fw-bold mt-2 mb-1">
              Hyderabad
            </h2>

            <p className="text-secondary mb-0">
              Current weather conditions
            </p>
          </div>

          {loading && (
            <div className="weather-status">
              <div className="spinner-border text-primary"></div>
              <span>Loading weather...</span>
            </div>
          )}

          {error && (
            <div className="weather-status">
              <span>⚠️</span>
              <span>Unable to load weather data.</span>
            </div>
          )}

          {weather && !loading && !error && (

            <div className="weather-content">

              <div className="weather-main">

                <div className="weather-icon">
                  {getWeatherIcon(weather.weather_code)}
                </div>

                <div>
                  <div className="weather-temperature">
                    {Math.round(weather.temperature_2m)}°C
                  </div>

                  <div className="text-secondary">
                    {getWeatherDescription(weather.weather_code)}
                  </div>
                </div>

              </div>

              <div className="weather-details">

                <div>
                  <span>💧</span>
                  <strong>
                    {weather.relative_humidity_2m}%
                  </strong>
                  <small>Humidity</small>
                </div>

                <div>
                  <span>💨</span>
                  <strong>
                    {Math.round(weather.wind_speed_10m)} km/h
                  </strong>
                  <small>Wind Speed</small>
                </div>

              </div>

            </div>

          )}

        </div>

      </div>

    </section>
  )
}

export default WeatherCard