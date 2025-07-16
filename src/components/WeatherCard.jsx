import React from 'react'
import moment from 'moment'

export default function WeatherCard({ 
  temperature,
  location,
  date,
  weather,
  backgroundImage
}) {
  const formattedDate = moment(date).format('dddd • D MMM YYYY');
  const formattedTime = moment(date).format('HH:mm');

  const icon = weather?.icon;
  const description = weather?.main || 'Unknown';

  return  <div className="left-panel">
      <div className="logo">the.weather</div>

      <div className="weather-overlay">
        <div className="weather-row">
         <div className="main-info">
            <div className="top-row">
              <div className="temperature">
                {temperature ? `${Math.round(temperature)}°` : '--°'}
              </div>

              <div className="bottom-info">
                <div className="location">{location}</div>
                <div className="date-time">{`${formattedTime} - ${formattedDate}`}</div>
              </div>

              <div className="icon-wrapper">
                {icon && (
                  <img
                    className="weather-icon"
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt={description}
                  />
                )}
                <div className="description-text">{description}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

}
