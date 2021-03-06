import React, { Component } from 'react';
import styled from 'styled-components';

const Navigation = styled.nav`
    box-shadow: rgba(0,0,0,0.2) 0 0 30px;
    background-color:#000 !important;
`;
const Title = styled.h1`
font-family:Quicksand;
font-weight:700;
font-style:italic;
color:#fff;
`;
export default class Navbar extends Component {

  onLogout = () => {
      // Soft logout
      this.props.history.push('/');
    };

  render() {
    return (
            <Navigation className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href=""><Title>Musiqlo</Title></a>
                <button className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto" />
                    <button className="btn btn-danger my-2 my-sm-0"
                      onClick={this.onLogout}>Logout</button>
                </div>
            </Navigation>
        );
  }
}
