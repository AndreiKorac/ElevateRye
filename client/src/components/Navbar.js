import React, { Component } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';
import LocationSearchInput from './LocationSearchInput';

export default class Navbar extends Component {

    onLogout = () => {
        // Soft logout
        this.props.history.push('/');
    }

    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href=""><b>Name Tentative</b></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto" />
                    <form className="form-inline my-2 my-lg-0">
                        <LocationSearchInput getWeatherData={this.props.getWeatherData} />
                    </form>
                    <button className="btn btn-danger my-2 my-sm-0" onClick={this.onLogout}>Logout</button>
                </div>
            </nav>
        );
    }
}
