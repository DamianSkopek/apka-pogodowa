import React, { Component } from 'react';
import Form from './Form'
import Result from './Result'
import './App.css';

//klucz do API openweathermap
const APIkey = '8099bee8d6cd03374c7715bd87dfa16c'


class App extends Component {
  state={
    value: "",
    date: '',
    city: '',
    sunrise: '',
    sunset: '',
    temp: '',
    pressure: '',
    wind: '',
    err: false
  }

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }



  componentDidUpdate(prevProps, prevState){
    //e.preventDefault() // to już nie jest potrzebne, nie ma już "e", nie korzystamy z submit, więc nie ma czego preventować

    if(prevState.value!==this.state.value){

    //jeśli nic nie będzie wpisane, to zakończ komponent
    if(this.state.value.length === 0) return

    const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&units=metric&appid=${APIkey}`

    fetch(API)
    .then(response => {
      if(response.ok){
        return response
      }
      throw Error("Nie udało się")
    })
    .then(response => response.json())
    .then(data => {
      const time = new Date().toLocaleTimeString()
      this.setState(prevState =>({
        err:false,
        date: time,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        temp: data.main.temp,
        pressure: data.main.pressure,
        wind: data.wind.speed,
        city: prevState.value,
      }))
    })
    .catch(err => {
      console.log(err)
      this.setState(prevState=>({
        err:true,
        city: prevState.value
      }))
    })
    
  }
}
  render(){
  return (
    <div className="App">
      <Form
        value={this.state.value}
        change={this.handleInputChange}
        />
      <Result weather={this.state} />
    </div>
  );
}
}

export default App;

//wyjaśnienie jak działa componentDidUpdate()
            // did update - za każdą zmianą jest wywołanie komponentu
            //prevProps - właściwości, sprzed ponownego wywołania render()
            //prevProps nie jest tu używane, ale prevState jest przekazywany jako drugi argument
    //componentDidUpdate(prevProps, prevState){
              //te 2 wartości w consolol logach są różne
    //console.log("poprzednia wartość " + prevState.value)
    //console.log("aktualna wartość " + this.state.value)

              //if jest ucieczką od nieskończonej pętli, za każdym wywołaniem setState, wywołuje się render(), po którym wykona się komponent DidUpdate, w którym jest setState...
              //jak to przejdzie przez setState, to te wartości już nie będą różne i nie będzie pętli, bo setState się nie wywoła
              //te 2 console logi wyżej zostaną wywołane 2 razy, tylko za drugim razem, dzięki setState, prevState.value i this.state.value będą miały już te same wartości
  //   if(prevState.value!==this.state.value){
  //     console.log("różne")
  //     this.setState({
  //       value: this.state.value
  //     })
  //   }
  // }