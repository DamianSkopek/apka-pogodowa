import React, { Component } from 'react';
import Form from './Form'
import Result from './Result'
import './App.css';

//klucz do API openweathermap
const APIkey = '8099bee8d6cd03374c7715bd87dfa16c'

class App extends Component {
  state={
    //zmienna używana do wpisywania tekstu do inputa
    value: "",
    //zminne używane do wyświetlania danych z API
    date: '',
    city: '',
    sunrise: '',
    sunset: '',
    temp: '',
    pressure: '',
    wind: '',
    //zmienna do ewentualnego błędu
    err: false
  }

  // metoda pobiera value, ustawia je do state.value i ponownie renderuje komponenty
  handleInputChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }
  // 
  handleCitySubmit = (e) =>{
    //blokuje domyślną akcję, tu chodzi o przeładowanie strony
    e.preventDefault()
    console.log('Przesłano formularz')
    //zmienna API, z linkiem do API z weathermaps, zmodyfikowanym, że zamiast konkretnej nazwy miasta wstawiamy wartość z tego co wpiszemy w input
    const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&units=metric&appid=${APIkey}`
    //fetch() - metoda asynchronicznicznego rządania, wysyłamy rządanie pod wskazany link
    //fetch tworzy "obietnicę", po jej stworzeniu, jest nierozstrzygnięta, gdy dostaniemy info zwrotne z serwera, to obietnica jest spełniona, chyba że coś pójdzie nie tak, to wtedy też jest rozstrzygnięta, ale odrzucona
    fetch(API)
    // kiedy spełniony, zostanie wywołana metoda then
    //fetch zwraca obiekt nazywany "response", ale można dać jakąkolwiek nazwę w metodzie then()
    .then(response => {
      if(response.ok){
        return response
      }
      throw Error("Nie udało się")
    }) //ok jest jedną z właściwości obiektu response, jeśli true, to przekazujemy response do kolejnego then()
    .then(response => response.json()) // wyodrębniamy dane z jsona, wiemy, że tam coś takiego jest z dokumentacji tego API, a inaczej nie można się do tego dostać
    // zmiana err na false, domyślnie ustawione też na false
    .then(data => {
      const time = new Date().toLocaleTimeString() // lokalny czas bez daty dnia
      this.setState(prevState =>({
        err:false,
        date: time,
        sunrise: data.sys.sunrise, //dane z API, które są w 'data'
        sunset: data.sys.sunset,
        temp: data.main.temp,
        pressure: data.main.pressure,
        wind: data.wind.speed,
        city: prevState.value, //tak zamiast pobierać z API, bo w API są angielskie nazwy
        //prevState, zamiast this.state, bo daje to pewność korzystanie z akutualnej wartości tej zmiennej, jak się odwołujemy do poprzedniego stanu, tak jak tutaj, do wcześniej wpisanego value, to należy użyć funckji, która zwraca obiekt, a nie samej zwrotki obiektu
        // jeszce uwaga, dlaczego nie musi być return, bo tak działa funkcja strzałkowa, ale musi być nawias () który obejmuje zwracaną całość
      }))
    })
    //kiedy odrzucony, metoda catch - zmiana err na true
    .catch(err => {
      console.log(err)
      this.setState(prevState=>({
        err:true,
        city: prevState.value
      }))
    })

  }

  render(){
  return (
    <div className="App">
      <Form
        //przekazujemy wartość value do Forma, pod propsem 'value'
        value={this.state.value}
        //przekazujemy mentodę handleinp do Forma, pod propsem 'change'
        change={this.handleInputChange}
        //przekazujemy metodę handlecitysub do Forma, pod propsem 'submit'
        submit={this.handleCitySubmit}
        />
      <Result weather={this.state} />
    </div>
  );
}
}

export default App;
