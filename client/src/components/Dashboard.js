import React, { Component } from 'react';
import axios from 'axios';
import WeatherStatus from './WeatherStatus';
import SpotifyWebApi from 'spotify-web-api-js';
import styled from 'styled-components';

const AlbumArt = styled.img`
  border-radius: 30%;
  display: inline-block;
  margin-left:28%;
  margin-top:5%;
  margin-bottom:5%;
  height:80%;
`;
const Now = styled.div`
  font-family: Ubuntu;
  text-align:center;
`;
const ArtBG = styled.div`
  background-color: #1db954;
`;
const spotifyApi = new SpotifyWebApi();

class Dashboard extends Component{

  constructor(props) {
    super(props);
    this.confirmAuthentication();
    const params = this.getHashParams();
    console.log(params);
    const token = params.access_token;
    console.log("TOKEN",token);
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      weatherData: '',
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' },
      latitude: null,
      longitude: null,
      loading: true,
      songSearch: '',
    };

  }
  componentDidMount(){
    this.geoFindMe();
  };

  getWeatherData = (lat, lon) => {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=7d877d1adb4c82f7649c13fb0071425e`)
            .then(response => {
              this.setState({ weatherData: response.data, loading: false })
              console.log(this.state.weatherData);
          }
        );
          };

  geoFindMe = () => {
        if (!navigator.geolocation) {
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
          console.log('Unable to retrieve your location');
        }

        navigator.geolocation.getCurrentPosition(success, error);
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
        console.log(response);
        this.setState({
          nowPlaying: {
              name: response.item.name,
              albumArt: response.item.album.images[0].url,
            },
        });
      });
  };

  confirmAuthentication = () => {
    const { match: { params } } = this.props;
    console.log('Access Token: ', params.access_token);
    console.log('Refresh Token: ', params.refresh_token);
    let config = {
        headers: {'Authorization': "Bearer " + params.access_token }
      };
    axios.get(`https://api.spotify.com/v1/me`, config)
    .then(response => {
      spotifyApi.setAccessToken(params.access_token)
      this.getNowPlaying();
    })
    .catch(error => {
      console.log(error);
      this.props.history.push('/login');
    });
  };

  onLogout = () => {
      // Soft logout
      this.props.history.push('/');
    };

  render() {
    return (


      <div>
           {!this.state.loading ?
             <span>
               <WeatherStatus weatherData={this.state.weatherData}/>
              <ArtBG>
                <AlbumArt src={this.state.nowPlaying.albumArt} style={{ height: 350 }}/>
                  <Now>
                     Now Playing: { this.state.nowPlaying.name }
                 </Now>
              </ArtBG>
              </span>
             : <h4>Loading...</h4>}
</div>

        );
  }
}

export default Dashboard;
