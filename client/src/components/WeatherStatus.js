import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const WeatherCard = styled.div`
    margin-top: 10px;
    border-radius: 40px;
    box-shadow: 0 0 5px;
`;

class WeatherStatus extends Component{
    constructor(props) {
        super(props);
        this.state = {
            weatherData: '',
            latitude: null,
            longitude: null,
            loading: true
        };
    }

    getWeatherData = (lat, lon) => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=7d877d1adb4c82f7649c13fb0071425e`)
            .then(response => this.setState({ weatherData: response.data, loading: false }));
    };

    componentDidMount(){
        this.geoFindMe();
    };

    geoFindMe = () => {
        if (!navigator.geolocation){
            console.log("Not Supported");
            return;
        }
        let self = this;
        function success(position) {
            let latitude  = position.coords.latitude;
            let longitude = position.coords.longitude;
            self.setState({ latitude: latitude, longitude: longitude });
            self.getWeatherData(latitude, longitude);
        }

        function error() {
            console.log("Unable to retrieve your location");
        }

        navigator.geolocation.getCurrentPosition(success, error);
    };

    render(){
        return(
            <WeatherCard className="container card card-body">
                <div className="row center">
                    <div className="center col-md-12">
                        {!this.state.loading ? <div className="text-center">
                            <h4>Latitude: <span className="badge badge-primary">{this.state.latitude}</span> Longitude: <span className="badge badge-info">{this.state.longitude}</span></h4>
                            <h4>The weather is: <span className="badge badge-success">{this.state.weatherData.weather[0].main}</span></h4>
                        </div> : null}
                    </div>
                </div>
            </WeatherCard>
        );
    }

}

export default WeatherStatus;
