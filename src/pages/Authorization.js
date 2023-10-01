
import React from 'react';
import { useLocation } from 'react-router';
const SPOTIFY_CLIENT_ID='d78104bf9e7c41edb529b1d1207e96db'


var generateRandomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

  var scope = "streaming \ user-read-recently-played \ user-library-modify \ user-top-read \ user-modify-playback-state \ ugc-image-upload \ playlist-read-collaborative \ user-library-read \
  playlist-modify-private \ user-read-email \ user-read-playback-state \ app-remote-control \ playlist-read-private \
  playlist-modify-public \ user-follow-modify \  user-follow-read \ user-read-private \ user-read-currently-playing"
               

  var state = generateRandomString(16);

  var auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: SPOTIFY_CLIENT_ID,
    scope: scope,
    redirect_uri: "http://localhost:3000/callback",
    state: state,
  })


class Authorization extends React.Component {


  componentDidMount() {

    const location = this.props.location;

    try{
      if(location.state.logout){
        auth_query_parameters = new URLSearchParams({
          response_type: "code",
          client_id: SPOTIFY_CLIENT_ID,
          scope: scope,
          redirect_uri: "http://localhost:3000/callback",
          state: state,
          show_dialog: true,
        })
        window.location = 'https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString();
      }
    }
    catch{
      auth_query_parameters = new URLSearchParams({
        response_type: "code",
        client_id: SPOTIFY_CLIENT_ID,
        scope: scope,
        redirect_uri: "http://localhost:3000/callback",
        state: state,
      })
      window.location = 'https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString();
    }
  
   

    
    
  }


  render() {
    return (
      <div></div>
    );
  }
}

export function AuthWithRoute(props) {

  const location = useLocation();

  return <Authorization location={location}></Authorization>
}


export default Authorization;