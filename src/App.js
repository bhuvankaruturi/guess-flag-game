import React, { Component } from 'react';
import './App.css';
/*global fetch*/
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {data: [], countries: [], answer: undefined, won: false, clicked: false, clickedIndex: undefined};
    this.handleClick = this.handleClick.bind(this);
  }
  
  componentDidMount() {
    let countriesUrl = 'http://restcountries.eu/rest/v2/all';
    fetch(countriesUrl)
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
      if (Number(e.target.value) === this.state.answer) {
        this.setState({won: true, clicked: true, clickedIndex: e.target.value});
      } else {
        this.setState({won: false, clicked: true, clickedIndex: Number(e.target.value)});
      }
    }
  }
  
  render() {
    let views = [<div key="1">Loading...</div>];
    let image = undefined;
    let status = undefined;
    const {data, countries, answer, won, clicked, clickedIndex} = this.state;
    if(data && data.length > 0) {
      views = countries.map((country, i) => {
          return (<label key={i}>
                    <input type="radio" name="country" onChange={this.handleClick} value={i} disabled={clicked} checked={clickedIndex === i}/>
                    {country.name}
                  </label>);
      });
      image = <img src={countries[answer].flag} alt="country flag"/>;
      if(clicked) {
         status = won?<p><strong>You won</strong></p>:<p><strong>You Lost.</strong> Answer: {countries[answer].name}</p>;
      }
    }
    return (
      <div className="App">
        <div className="header">
          <img src="http://freeassembly.net/wp-content/uploads/2016/02/New-world-map-header-1.jpg" alt="header"/>
        </div>
        <h1>The Flag Guessing Game</h1>
        {views}
        <button type="button" onClick={() => this.handleData(data)}>Next</button>
        {status}
        {image}
      </div>
    );
  }
}

export default App;
