import React, { Component } from 'react';
import axios from 'axios';
import WeatherStatus from './WeatherStatus';
import SpotifyWebApi from 'spotify-web-api-js';
import styled from 'styled-components';
import MusicPlayer from './MusicPlayer.js';
import Navbar from './Navbar';
import LocationSearchInput from './LocationSearchInput';

// Image Imports
import ATMOMAN from '../assets/atmo_man.jpg';
import ATMOWOMAN from '../assets/atmo_woman.jpg';
import CLEARMAN from '../assets/clear_man.jpg';
import CLEARWOMAN from '../assets/clear_woman.jpg';
import CLOUDMAN from '../assets/cloud_man.jpg';
import CLOUDWOMAN from '../assets/cloud_woman.jpg';
import DRIZZLEMAN from '../assets/drizzle_man.jpg';
import DRIZZLEWOMAN from '../assets/drizzle_woman.jpg';
import RAINMAN from '../assets/rain_man.jpg';
import RAINWOMAN from '../assets/rain_woman.jpg';
import SNOWMAN from '../assets/snow_man.jpg';
import SNOWWOMAN from '../assets/snow_woman.jpg';
import THUNDERMAN from '../assets/thunder_man.jpg';
import THUNDERWOMAN from '../assets/thunder_woman.jpg';
import spinner from '../assets/bars.svg';

const AlbumArt = styled.img`
  border-radius: 30%;
  display: block;
  margin: auto;
  margin-bottom: 5%;
  height:80%;
  box-shadow: 0 2 5;
  border: solid;
  height: 350px;
`;
const Now = styled.div`
  font-family: Ubuntu;
  text-align:center;
  margin-bottom: 5vh;
  font-size: 40px;
  font-weight: bold;
`;
const ArtBG = styled.div`
  background-color: #1db954;
  padding-top: 5vh;
  padding-bottom: 2vh;
  flex-direction:row;
`;
const WStatement = styled.h3`
  font-family: Ubuntu;
  text-align:center;
  color: #5cdb95;
`;

const ImageContainer = styled.div`
  margin-left: 35vh;
  margin-right: 0;
  margin-bottom:5 vh;
`;

const OutfitImg = styled.img`
  height: 70vh;
  display: inline-block;
  margin: auto;
`;

const TravelBox = styled.div`
  display: block;
  margin: auto;
  max-width: 600px;
  margin-bottom: 50px;
`;

const TravelLabel = styled.h2`
  text-align: center;
  font-family: Ubuntu;

  color: #5cdb95;
`;

const AnimatedLoading = styled.img`
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -67.5px;
  margin-left: -70px;
`;

const HighlightPlaying = styled.span`
  color: #FC4445;
`;

const SpotifyInfo = styled.div`
  // display: block;
  // margin: auto;
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
      nowPlaying: { name: 'Music is not playing!', albumArt: '' },
      latitude: null,
      longitude: null,
      loading: true,
      songSearch: '',
    };
    this.images = {
      Clear: [CLEARMAN, CLEARWOMAN],
      Clouds: [CLOUDMAN, CLOUDWOMAN],
      Drizzle: [DRIZZLEMAN, DRIZZLEWOMAN],
      Thunder: [THUNDERMAN, THUNDERWOMAN],
      Snow: [SNOWMAN, SNOWWOMAN],
      Fog: [ATMOMAN, ATMOWOMAN],
      Haze: [ATMOMAN, ATMOWOMAN],
      Rain: [RAINMAN, RAINWOMAN]
    }
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
        console.log("RESPONSE: ", response);
        if (response) {
          this.setState({
            nowPlaying: {
                name: response.item.name,
                albumArt: response.item.album.images[0].url,
              },
          });
        }
      })
      .catch(e => {
        console.log(e);
      })
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
      // SET THIS BACK TO 2 SECONDS FOR THE DEMO
      setInterval(() => this.getNowPlaying(), 10000);
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
               <Navbar history={this.props.history} getWeatherData={this.getWeatherData} geoFindMe={this.geoFindMe}/>
                <WeatherStatus weatherData={this.state.weatherData}/>
                <TravelLabel>Local weather too gloomy? Take a virtual trip!</TravelLabel>
                <TravelBox>
                  <form className="form-inline my-2 my-lg-0">
                        <LocationSearchInput getWeatherData={this.getWeatherData} />
                        <button class="btn btn-success my-2 my-sm-0" onClick={this.geoFindMe}>Head Home!</button>
                  </form>
                </TravelBox>
              <ArtBG>
                <SpotifyInfo className="row">
                {this.state.nowPlaying.albumArt ? <div class="col">
                  <AlbumArt src={this.state.nowPlaying.albumArt}/>
                <Now>
                  <HighlightPlaying>Now Playing:</HighlightPlaying><br/>{ this.state.nowPlaying.name }
                </Now>
              </div>: null}
                <MusicPlayer weatherData={this.state.weatherData}/>
                </SpotifyInfo>
              </ArtBG>
              <br/>
              <WStatement>It's a {this.state.weatherData.weather[0].main.toLowerCase()} day. Here are some sample outfits that can be worn today! </WStatement>
              <ImageContainer>
                {this.images[this.state.weatherData.weather[0].main].map((image, key) => {
                  return <OutfitImg key={key} src={image} />
                })}
                </ImageContainer>
              </span>
             : <AnimatedLoading src={spinner}></AnimatedLoading>}
</div>

        );
  }
}

export default Dashboard;
