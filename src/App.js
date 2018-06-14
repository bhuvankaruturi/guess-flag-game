import React, { Component } from 'react';
import './App.css';
/*global fetch*/
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {data: [], countries: [], answer: undefined, won: false, clicked: false, clickedIndex: undefined, score: 0, played: 0};
    this.crossOriginUrl = "https://cors-anywhere.herokuapp.com/";
    this.handleClick = this.handleClick.bind(this);
  }
  
  componentDidMount() {
    let countriesUrl = 'http://restcountries.eu/rest/v2/all';
    fetch((this.crossOriginUrl + countriesUrl))
      .then(data => data.json())
      .then(data => {
        this.handleData(data);
    });
  }
  
  handleData(data) {
    if(data) {
      let countries = [];
      let randomIndex = Math.floor(Math.random() * data.length);
      for(let i = 0; i < 4; i++) {
        countries.push(data[randomIndex]);
        randomIndex = (randomIndex + 40) % data.length;
      }
      let answer = Math.floor(Math.random() * 4);
      this.setState({data, countries, answer, won: false, clicked: false, clickedIndex: undefined});
    }
  }
   
  handleClick(e){
    if (!this.state.clicked) {
      let {score, played} = this.state;
      if (Number(e.target.value) === this.state.answer) {
        this.setState({won: true, clicked: true, clickedIndex: e.target.value, score: score + 1, played: played + 1});
      } else {
        this.setState({won: false, clicked: true, clickedIndex: Number(e.target.value), played: played + 1});
      }
    }
  }
  
  render() {
    let views = [<div key="1">Loading...</div>];
    let image = undefined;
    let status = undefined;
    let stats = undefined;
    let button = undefined;
    const {data, countries, answer, won, clicked, clickedIndex, score, played} = this.state;
    if(data && data.length > 0) {
      views = countries.map((country, i) => {
          return (<label key={i}>
                    <input type="radio" name="country" onChange={this.handleClick} value={i} disabled={clicked} checked={clickedIndex === i}/>
                    {country.name}
                  </label>);
      });
      stats = <p className="score">Played: <strong>{played}</strong> | Score: <strong>{score}</strong></p>;
      image = <img src={countries[answer].flag} alt="country flag"/>;
      button = <button type="button" onClick={() => this.handleData(data)}>Next</button>;
      if(clicked) {
         status = won?<p><strong>You won</strong></p>:<p><strong>You Lost.</strong> Answer: {countries[answer].name}</p>;
      }
    }
    return (
      <div className="App">
        <div className="header">
          <img src={"https://i.pinimg.com/originals/91/4c/7e/914c7e91d5f010e172f11c2a15520637.png"} alt="header"/>
        </div>
        <h1 className="centered">The Flag Guessing Game</h1>
        {stats}
        <div className="labels">
          {views}
          {button}
        </div>
        {status}
        {image}
      </div>
    );
  }
}

export default App;
