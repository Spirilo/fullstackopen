import axios from "axios";
import { useEffect, useState } from "react";
import CountryInfo from './components/countryInfo'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  
  console.log(countries)
  console.log(filter)

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  }, [])

  const handleChange = ev => {
    setFilter(ev)
  }

  return (
    <div>
      find countries <input value={filter} onChange={ev => handleChange(ev.target.value)} />
      <CountryInfo countries={countries} filter={filter}/>
    </div>
  )
}

export default App;
