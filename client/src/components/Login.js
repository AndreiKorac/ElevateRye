import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import styled from 'styled-components';

const LoginForm = styled.div`
    background-color: #b4ade6;
    height: 400px;
    width: 400px;
    top: 50%;
    display: block;
    margin: auto;
    margin-top: 20vh;
    border-radius: 50px;
`;

const LoginTitle = styled.h1`
    padding-top: 20px;
    text-align: center;
    font-weight: bold;
`;

const LoginButton = styled.a`
    margin-top: 50px;
    margin-left: 90px;
`;

const spotifyApi = new SpotifyWebApi();

export default class Login extends Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }

    this.state = {
        loggedIn: token ? true : false
      };
  }

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

    render() {
        return (
            <LoginForm>
                <LoginTitle>Login to WeatherMusic</LoginTitle>
                <LoginButton className="btn btn-success btn-lg" href="http://localhost:8888/login">Authorize with Spotify</LoginButton>
            </LoginForm>
        );
    }
}
