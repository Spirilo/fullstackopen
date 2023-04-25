import axios from "axios"
import { useEffect, useState } from "react"

const CountryInfo = ({countries, filter}) => {
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  const key = process.env.REACT_APP_API_KEY

  console.log(weather)

  useEffect(() => {
    setCountry(null)
  }, [filter])

  const handleClick = (c) => {
    setCountry(c)
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${c.latlng[0]}&lon=${c.latlng[1]}&units=metric&appid=${key}`)
        .then(response => {
            console.log(response.data)
            setWeather(response.data)
        })
  }

  let filtered = countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()))
  console.log(filtered)
  if (filtered.length > 10) {
    return (
        <p>Too many matches, specify another filter</p>
    )
  }
  if (filtered.length > 1 && !country) {
    return (
        <div>
          {filtered.map(c =>
            <p>{c.name.common} <button onClick={() => handleClick(c)} >show</button> </p>  
          )}  
        </div>
    )
  }
  if (country && weather) {
    let languages = Object.values(country.languages)
    return (
        <div>
          <h2>{country.name.common}</h2>
          <p>capital: {country.capital}</p>
          <p>area: {country.area}</p>
          <p><b>languages:</b></p>
          <ul>
            {languages.map(l =>
              <li>{l}</li>    
            )}
          </ul>
          <img src={country.flags.png} />
          <h3>Weather in {country.capital}</h3>
          <p>temperature {weather.main.temp} Celsius</p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      )
  }
}
export default CountryInfo