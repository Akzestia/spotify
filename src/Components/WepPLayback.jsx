import React, { useState, useEffect } from "react";
import axios from "axios";
import "../pages/App.css";
import apiCLient from "./ApiClient";
import "../CSS/MainPage.css"
import { useLocation, useNavigate } from "react-router";

const track = {
  uri: "spotify:track:2vKRKqPl8YhyWzFFKn3NaA", // Spotify URI
  id: "2vKRKqPl8YhyWzFFKn3NaA", // Spotify ID from URI (can be null)
  type: "track", // Content type: can be 'track', 'episode' or 'ad'
  media_type: "audio", // Type of file: can be 'audio' or 'video'
  name: "Rise Up", // Name of content
  is_playable: true, // Flag indicating whether it can be played
  album: {
    uri: "spotify:album:3iygUi5QPyGoBR3TLxfa8Y", // Spotify Album URI
    name: "Album Name",
    images: [
      {
        url: "https://i.scdn.co/image/ab67616d0000b27354bcaba0d19086dae545db62",
      },
    ],
  },
  artists: [
    { uri: "spotify:artist:3exvMmrLV6o4R42YnG3Id6", name: "Artist Name" },
  ],
};

let id_auth = '';

function WebPlayback(props) {
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const [current_track, setTrack] = useState(track);
  const [devixeId, setId] = useState('');
  const navigate = useNavigate();

  function getImg(){
    alert("GET");
  }

  useEffect(() => {

    

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;


    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(
            props.authToken
          );
        },
        volume: 0.5,
        data: JSON.stringify({
          context_uri: "spotify:playlist:6SET13ADRq431RxMsMVlo4",
        }),
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        const data = {
          device_ids: [device_id],
        };
        
        const options = {
          method: 'PUT',
          url: 'https://api.spotify.com/v1/me/player',
          headers: {
            Authorization: 'Bearer ' + props.authToken,
            'Content-Type': 'application/json',
          },
          data,
        };
        
        axios(options)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      });

      
      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }

        try{
        
          setTrack(state.track_window.current_track);
          setPaused(state.paused);
  
          player.getCurrentState().then((state) => {
            !state ? setActive(false) : setActive(true);
          });
  
          props.getSongImage(state.track_window.current_track.album.images[2].url)
          props.getSongName(state.track_window.current_track.name);
          var str = "";
          state.track_window.current_track.artists.forEach(element => {
            
            str += element.name + " "
          });
          props.getSongArtist(str);
  
          props.updateTracksButtons(state.track_window.current_track.uri);
        }
        catch{

        }

      });

      player.on('playback_error', ({ message }) => {
        console.error('Failed to perform playback', message);
      });

      player.connect().then(() =>{
        console.log("ID: " + id_auth)
       
      });
    };
  }, []);

  if (!is_active) {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <b>
              {" "}
              Instance not active. Transfer your playback using your Spotify app{" "}
            </b>
          </div>
        </div>
      </>
    );
  } else if(player && current_track) {
      return (
        <>
            <div className="main-wrapper">
              <img
                style={{display: "none"}}
                src={current_track.album.images[0].url}
                className="now-playing__cover"
                alt=""
              />
  
              <div className="x-hor-div corner-x-div" style={{ marginLeft: "0rem", marginTop: "0.4rem" }}>
                <button
                  className="btn-spotify"
                  onClick={() => {
                    player.previousTrack();
                  }}
                >
                  <i class="ri-skip-left-fill"></i>
                </button>
  
                <button
                  className="btn-spotify"
                  onClick={() => {
                    player.togglePlay();
                  }}
                >
                  {is_paused ? <i class="ri-play-line"></i> : <i class="ri-pause-line"></i>}
                </button>
  
                <button
                  className="btn-spotify"
                  onClick={() => {
                    player.nextTrack();
                  }}
                >
                  <i class="ri-skip-right-fill"></i>
                </button>
              </div>
            </div>
        </>
      );
  }
  else if(player){
    return (
      <>
          <div className="main-wrapper">
            <img
              style={{display: "none"}}
              
              className="now-playing__cover"
              alt=""
            />

            <div className="x-hor-div corner-x-div" style={{ marginLeft: "0rem", marginTop: "0.4rem" }}>
              <button
                className="btn-spotify"
                onClick={() => {
                  player.previousTrack();
                }}
              >
                <i class="ri-skip-left-fill"></i>
              </button>

              <button
                className="btn-spotify"
                id="play-toogle-btn"
                onClick={() => {
                  player.togglePlay();
                }}
              >
                {is_paused ? <i class="ri-play-line"></i> : <i class="ri-pause-line"></i>}
              </button>

              <button
                className="btn-spotify"
                onClick={() => {
                  player.nextTrack();
                }}
              >
                <i class="ri-skip-right-fill"></i>
              </button>
            </div>
          </div>
      </>
    );
  }
}

export default WebPlayback;
