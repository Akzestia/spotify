
import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import './App.css';
const CLIENT_ID = "16a2505a2a24488a875f183c93c76089"
const REDIRECT_URI = "http://localhost:3000/"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"

class Authorization extends React.Component {
  state = {
    token: '',
  };

  componentDidMount() {
    const hash = window.location.hash;
    let token = window.localStorage.getItem('token');

    if (!token && hash) {
      token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1];

      window.location.hash = '';
      window.localStorage.setItem('token', token);
    }

    
    this.setState({ token });
  }

  logout = () => {
    this.setState({ token: '' });
    window.localStorage.removeItem('token');
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Spotify React</h1>
          {!this.state.token ? (
            <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
              Login to Spotify
            </a>
          ) : (
            <button onClick={this.logout}>Logout</button>
          )}

          {this.state.token ? (
            <form onSubmit={this.searchArtists}>
              <input
                type="text"
                
              />
              <button type="submit">Search</button>
            </form>
          ) : (
            <h2>Please login</h2>
          )}

        </header>
      </div>
    );
  }
}

export default Authorization;