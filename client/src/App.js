import React, { Component } from 'react';
import styled from 'styled-components';
import SpotifyWebApi from 'spotify-web-api-js';
import Dashboard from './components/Dashboard';
import WeatherStatus from "./components/WeatherStatus";
import MusicPlayer from "./components/MusicPlayer";

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
      loading: false,
        songSearch: ''
    };
	
	
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


  render() {
    return (
      <div className='App'>
        <a href='http://localhost:8888/login'> Login to Spotify </a>
        <WeatherStatus/>
		<MusicPlayer/>
        <div>
         Now Playing: { this.state.nowPlaying.name }
       </div>
       <div>
         <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
       </div>
       {!this.state.loading ? <div>
        <h4>{JSON.stringify(this.state.weatherData)}</h4>
       </div> : <h4>Loading...</h4>}
       { this.state.loggedIn &&
        <button onClick={() => this.getNowPlaying()}>
          Check Now Playing
        </button>
      }

      <button onClick={()=>this.getMusic()}>Search Songs</button>
        <p>{JSON.stringify(this.state.username)}</p>
    </div>
    );
  }
}
