
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

  var scope = "streaming \ user-modify-playback-state \ ugc-image-upload \ playlist-read-collaborative \ user-library-read \
  playlist-modify-private \ user-read-email \ user-read-playback-state \ app-remote-control \ playlist-read-private \
  playlist-modify-public \ user-follow-modify \  user-follow-read \ user-read-private \ user-read-currently-playing"
               

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

    window.location = 'https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString();
    
  }

  logout = () => {
    this.setState({ token: '' });
    window.localStorage.removeItem('token');
  }


  render() {
    return (
      <div className="App">
        
      </div>
    );
  }
}

export default Authorization;