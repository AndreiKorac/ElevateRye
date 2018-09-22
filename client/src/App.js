import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-js'; 


const spotifyApi = new SpotifyWebApi();

export default class App extends Component {

  constructor(props) {
    super(props);
    const params = this.getHashParams();
    console.log(params);
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      weatherData: '',
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' },
      latitude: null,
      longitude: null,
      loading: false
    };
	
	
  };

  componentDidMount(){
    this.geoFindMe();
  };
  
  getHashParams = () => {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  };

  getNowPlaying = () => {
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: {
              name: response.item.name,
              albumArt: response.item.album.images[0].url,
            },
        });
      });
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
  }

  getWeatherData = (lat, lon) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=7d877d1adb4c82f7649c13fb0071425e`)
    .then(response => this.setState({ weatherData: response.data, loading: false }));
  };

  render() {
    return (
      <div className='App'>
        <a href='http://localhost:8888'> Login to Spotify </a>
        <div>
         Now Playing: { this.state.nowPlaying.name }
       </div>
       <div>
         <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
       </div>
       {!this.state.loading ? <div>
        <h4>latitude: {this.state.latitude}, longitude: {this.state.longitude}</h4>
        <h4>{JSON.stringify(this.state.weatherData)}</h4>
       </div> : <h4>Loading...</h4>}
       { this.state.loggedIn &&
        <button onClick={() => this.getNowPlaying()}>
          Check Now Playing
        </button>
      }
	  /*
      <button className = "button" onClick ={this.handleClick}> Click this shit</button>
	  */
        <p>{JSON.stringify(this.state.username)}</p>

    </div>
    );
  }
}
