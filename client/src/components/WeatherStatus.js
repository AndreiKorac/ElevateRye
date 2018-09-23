import React, { Component } from 'react';
import styled from 'styled-components';

const WeatherCard = styled.div`
  display: block;
  border-radius: 50px;
  margin: 5%;
  background-color: #fff;
  padding: 2%;
  font-family: Ubuntu;
  font-weight:400;
  border: solid;
`;
const Location = styled.h3`
  font-size:2.2em;
  color: #FC4445;
`;

class WeatherStatus extends Component{

  render() {
    return (
        <WeatherCard>
                <Location>{this.props.weatherData.name} Weather</Location>
                <h4>{(this.props.weatherData.main.temp - 273).toFixed(2)} °C</h4>
                  <h4>{this.props.weatherData.weather[0].main}</h4>
        </WeatherCard>
    );
  };

}

export default WeatherStatus;
