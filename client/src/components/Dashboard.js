import React, { Component } from 'react';
import axios from 'axios';
import WeatherStatus from './WeatherStatus';


class Dashboard extends Component{

    constructor(props) {
        super(props);
        this.confirmAuthentication();
    }

    confirmAuthentication = () => {
        const {match: {params}} = this.props;
        console.log("Access Token: ", params.access_token);
        console.log("Refresh Token: ", params.refresh_token);
        let config = {
            headers: {'Authorization': "Bearer " + params.access_token }
        };
        axios.get(`https://api.spotify.com/v1/me`, config)
            .then(response => console.log(response))
            .catch(error => {
                console.log(error);
                this.props.history.push('/login');
            })
    }

    render(){
        return(
            <div>
                <WeatherStatus />
            </div>
        )
    }
}

export default Dashboard;
