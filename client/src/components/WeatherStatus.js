import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const WeatherCard = styled.div`
  display: inline-block;
  border-radius: 10%;
  margin: 3%;
  background-color: #fff;
  padding: 2%;
  font-family: Ubuntu;
  font-weight:400;
`;
const Location = styled.h3`
  font-size:2.2em;
`;

class WeatherStatus extends Component{

  render() {
    return (
            <div>
                <div>
                    <WeatherCard>
                            <Location>{this.props.weatherData.name} Weather</Location>
                            <h4>{(this.props.weatherData.main.temp - 273).toFixed(2)} °C</h4>
                              <h4>{this.props.weatherData.weather[0].main}</h4>
                    </WeatherCard>
                </div>
            </div>
        );
  };

}

export default WeatherStatus;
