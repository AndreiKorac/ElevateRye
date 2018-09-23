import React, { Component } from 'react';
import axios from 'axios';


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

    render(){
        return(
            <div className="container card card-body">
                <div className="row center">
                    <div className="center col-md-12">
                        {!this.state.loading ? <div className="text-center">
                            <h4>latitude: {this.state.latitude}, longitude: {this.state.longitude}</h4>
                            <h4>The weather is: {this.state.weatherData.weather[0].main}</h4>
                        </div> : null}
                    </div>
                </div>
            </div>
        );
    }

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

}

export default WeatherStatus;
