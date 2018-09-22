import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };

  };

  handleClick = () => {
    axios.get('http://api.openweathermap.org/data/2.5/weather?q=Toronto,ca&APPID=7d877d1adb4c82f7649c13fb0071425e')
    .then(response => this.setState({ username: response.data }));
  };

  render() {
    return (
      <div className="App">

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button className = "button" onClick ={this.handleClick}> What's the fucking weather?</button>

        <p>{JSON.stringify(this.state.username)}</p>
      </div>
    );
  }
}
