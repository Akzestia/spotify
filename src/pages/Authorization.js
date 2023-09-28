
import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import './App.css';
const SPOTIFY_CLIENT_ID='d78104bf9e7c41edb529b1d1207e96db'
const SPOTIFY_CLIENT_SECRET='fb96c81dbac746dbaab4c919a37415b5'
const CLIENT_ID = 'd78104bf9e7c41edb529b1d1207e96db'
const REDIRECT_URI = "http://localhost:3000/spotify"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"


var generateRandomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

  var scope = "streaming \
               user-read-email \
               user-read-private"

  var state = generateRandomString(16);

  var auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: SPOTIFY_CLIENT_ID,
    scope: scope,
    redirect_uri: "http://localhost:3000/callback",
    state: state
  })

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
            <div>
              <a href={'https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString()}>Login</a>
              <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
              Login to Spotify
            </a>
            </div>
           
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