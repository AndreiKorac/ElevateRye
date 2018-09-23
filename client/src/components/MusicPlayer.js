import React, { Component } from 'react';
import styled from 'styled-components';

const EmbedSpotify = styled.iframe`
	display: block;
	margin: auto;
`;

export default class MusicPlayer extends Component{

    renderPlayer = () => {
        console.log("test")
        let playlist;
        let temp = this.props.weatherData.weather[0].main;
        if (temp === "Clear") {
            playlist = "37i9dQZF1DX5Ozry5U6G0d";
            console.log("CLEAR");
        } else if(temp === "Clouds") {
            playlist = "5NZaOHX4B7WXMpin3plCzF";
            console.log("Clouds");
        } else if(temp === "Snow") {
            playlist = "37i9dQZF1DX6R7QUWePReA";
            console.log("Snow");
        } else if(temp === "Thunderstorm") {
            playlist = "1rqfUOM7dVvfSQ9TIT1fu5";
            console.log("Thunder");
        } else if(temp === "Drizzle") {
            playlist = "37i9dQZF1DX9sIqqvKsjG8";
            console.log("Drizzle");
        } else if(temp === "Rain") {
            playlist = "37i9dQZF1DX2UgsUIg75Vg";
            console.log("Rain");
        } else {
            playlist = "37i9dQZF1DXarlH9zHuV0v";
            console.log("Atmosphere (Fog and Mist)");
        }

        return <EmbedSpotify src={"https://open.spotify.com/embed/user/spotify/playlist/" + playlist} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></EmbedSpotify>;
    }

    render() {
        return (
            <div>{this.renderPlayer()}</div>
        );
    }
}
