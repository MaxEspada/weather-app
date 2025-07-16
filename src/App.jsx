import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeather } from './redux/weatherSlice'
import './App.css'
import WeatherCard from './components/WeatherCard'
import { getWeatherBackground } from './utils/backgroundSelector'

const uzbekistanRegions = [
  'Tashkent', 'Samarkand', 'Bukhara', 'Khiva', 'Fergana', 
  'Andijan', 'Namangan', 'Nukus', 'Jizzakh', 'Kashkadarya'
];


export default function App() {
  const dispatch = useDispatch()
  const weather = useSelector(state => state.weather.data)
  const [location, setLocation] = useState('Tashkent')
  const [query, setQuery] = useState('')

const handleSearch = useCallback((e) => {
  e.preventDefault()
  if (!query) return

  const normalizedQuery = query.trim().toLowerCase()
  const matchedRegion = uzbekistanRegions.find(region => region.toLowerCase() === normalizedQuery)

  if (matchedRegion) {
    setLocation(matchedRegion)
    setQuery('')
  } else {
    alert('Регион не найден. Пожалуйста, выберите из списка.')
  }
}, [query])


  const backgroundStyle = useCallback({
    backgroundImage: `url(${getWeatherBackground(weather?.weather[0].main)})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  },[weather])

    useEffect(() => {
    dispatch(fetchWeather(location))
  }, [dispatch, location])


  

  return <div className={"app"}>
      <div className="weather-container" style={backgroundStyle}>
        <WeatherCard
          temperature={weather?.main?.temp}
          location={location}
          date={new Date().toISOString()}
          weather={weather?.weather?.[0]} 
          backgroundImage={backgroundStyle}
        />  

       <div className="right-panel">
        <form onSubmit={handleSearch} className="search-box">
          <input
            type="text"
            placeholder="Another location"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
           <button type="submit" className="search-button-fixed" onClick={handleSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </form>


        <div className="regions-list">
          {uzbekistanRegions.map((region, idx) => (
            <div
              key={idx}
              className={region === location ? 'active' : ''}
              onClick={() => setLocation(region)}
            >
              {region}
            </div>
          ))}
        </div>

         <div className="details-box">
          <strong>Weather Details</strong>
          <p>
            <span className="label">Cloudy:</span>
            <span className="value">{weather?.clouds?.all ?? 0}%</span>
          </p>
          <p>
            <span className="label">Humidity:</span>
            <span className="value">{weather?.main?.humidity ?? 0}%</span>
          </p>
          <p>
            <span className="label">Wind:</span>
            <span className="value">{weather?.wind?.speed ?? 0} km/h</span>
          </p>
          <p>
            <span className="label">Rain:</span>
            <span className="value">{weather?.rain?.['1h'] ?? 0} mm</span>
          </p>
        </div>
       </div>
      </div>
    </div>
}
