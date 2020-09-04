import React from 'react'
import './Result.css'

const Result = props => {
    //destrukturyzacja
    const {err, city, date, sunrise, sunset, temp, wind, pressure} = props.weather
    
    let content = null

    if(!err && city){
        const sunriseTime = new Date(sunrise*1000).toLocaleTimeString()
        const sunsetTime = new Date(sunset*1000).toLocaleTimeString()
        content = (
            <>
                <h3>Wyniki wyszukiwania dla <em>{city}</em></h3>
                <h4>Dane dla dnia i godziny: {date}</h4>
                <h4>Aktualna temperatura: {temp} &#176;C</h4>
                <h4>Wschód słońca: {sunriseTime}</h4>
                <h4>Zachód słońca: {sunsetTime}</h4>
                <h4>Prędkość wiatru: {wind} m/s</h4>
                <h4>Ciśnienie: {pressure} hPa</h4>
            </>
        )
    }

    return (
        <div className='result'>
            {err? `"${city}" nie ma w bazie`: content}
        </div>
    )
}


export default Result