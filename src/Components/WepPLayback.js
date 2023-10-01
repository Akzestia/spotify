import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/WebPlayback.css";
import "../CSS/MainPage.css";
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

let id_auth = "";

function WebPlayback(props) {
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const [current_track, setTrack] = useState(track);
  const [devixeId, setId] = useState("");
  const navigate = useNavigate();
  const [isnegative, setNegative] = useState(false);
  const [repeatMode, setMode] = useState("off");
  const [shuffleState, setShuffle] = useState(false);

  var percents;
  var intXint;



  var id_device = "";

  function getImg() {
    alert("GET");
  }

  function ClickNEXT() {
    player.nextTrack();
  }

  function ClickPREVIOUS() {
    player.previousTrack();
  }

  function ClickToggle() {
    player.togglePlay();
  }

  function ClickShuffle(){

    setShuffle(!shuffleState)
    const config = {
      method: 'put',
      url: `https://api.spotify.com/v1/me/player/shuffle?state=${shuffleState}`,
      headers: {
        Authorization: 'Bearer ' + props.authToken,
      },
    };
    
    axios(config)
      .then((response) => {
        // Handle success response
      })
      .catch((error) => {
        console.log(error)
      });
  }

  function ClickRepeat(){
    switch(repeatMode){
      case 'track':{
        setMode('context')
        const config = {
          method: 'put',
          url: `https://api.spotify.com/v1/me/player/repeat?state=${repeatMode}`,
          headers: {
            Authorization: 'Bearer ' + props.authToken,
          },
        };
        
        axios(config)
        .then((response) => {
          console.log(repeatMode)
        })
        .catch((error) => {
          console.log(error)
        });
      }
      break;
      case 'context':{
        setMode('off')
        const config = {
          method: 'put',
          url: `https://api.spotify.com/v1/me/player/repeat?state=${repeatMode}`,
          headers: {
            Authorization: 'Bearer ' + props.authToken,
          },
        };
        
        axios(config)
        .then((response) => {
          console.log(repeatMode)
        })
        .catch((error) => {
          console.log(error)
        });
      }
      break;
      case 'off':{
        setMode('track')
        const config = {
          method: 'put',
          url: `https://api.spotify.com/v1/me/player/repeat?state=${repeatMode}`,
          headers: {
            Authorization: 'Bearer ' + props.authToken,
          },
        };
        
        axios(config)
          .then((response) => {
            console.log(repeatMode)
          })
          .catch((error) => {
            console.log(error)
          });
      }
      break;
    }
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = async () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(props.authToken);
        },
        volume: 0.5,
        enableMediaSession: true,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setId(device_id);
        const data = {
          device_ids: [device_id],
        };

        const options = {
          method: "PUT",
          url: "https://api.spotify.com/v1/me/player",
          headers: {
            Authorization: "Bearer " + props.authToken,
            "Content-Type": "application/json",
          },
          data,
        };

        axios(options)
          .then((response) => {})
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

        try {
          setTrack(state.track_window.current_track);
          setPaused(state.paused);

          player.getCurrentState().then((state) => {
            !state ? setActive(false) : setActive(true);
          });

          props.getSongImage(
            state.track_window.current_track.album.images[2].url
          );
          props.getSongName(state.track_window.current_track.name);
          var str = "";
          state.track_window.current_track.artists.forEach((element) => {
            str += element.name + " ";
          });
          props.getSongArtist(str);

          props.updateTracksButtons(
            state.track_window.current_track.uri,
            state.paused
          );

          props.setTrackTimeValues(
            state.position,
            state.context.metadata.current_item.estimated_duration
          );

          document.title = state.track_window.current_track.name;
        } catch {}
      });

      player.on("playback_error", ({ message }) => {
        console.error("Failed to perform playback", message);
      });

      await player.connect().then(() => {
        console.log("ID: " + id_auth);
      });
    };
  }, []);

  if (!is_active) {
    if (devixeId != "") {
      const configx = {
        method: "get",
        url: "https://api.spotify.com/v1/me/player/recently-played?limit=1",
        headers: {
          Authorization: "Bearer " + props.authToken,
        },
      };

      axios(configx)
        .then((response) => {
          const config = {
            method: "put",
            url: `https://api.spotify.com/v1/me/player/play?device_id=${devixeId}`,
            headers: {
              Authorization: "Bearer " + props.authToken,
              "Content-Type": "application/json",
            },
            data: {
              uris: [response.data.items[0].track.uri],
              position_ms: 0,
            },
          };

          axios(config)
            .then((response) => {
              setActive(true);
            })
            .catch((error) => {
              // Handle error response
            });
        })
        .catch((error) => {
          // Handle error response
        });
    }
    return (
      <div
        className="container-div-scarlet"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="div-x-azure">
          <button className="xxx-next-prev" onClick={ClickPREVIOUS}>
            <svg
              role="img"
              height="16"
              width="16"
              aria-hidden="true"
              viewBox="0 0 16 16"
              data-encore-id="icon"
              class="Svg-sc-ytk21e-0 haNxPq"
            >
              <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"></path>
            </svg>
          </button>
          <button
            className="xxx-i"
            onClick={ClickToggle}
            onMouseDown={() => {
              document.querySelector(".xxx-i").classList.add("active");
            }}
            onMouseUp={() => {
              document.querySelector(".xxx-i").classList.remove("active");
            }}
          >
            {is_paused ? (
              <svg
                role="img"
                height="16"
                width="16"
                aria-hidden="true"
                viewBox="0 0 16 16"
                data-encore-id="icon"
                class="Svg-sc-ytk21e-0 haNxPq"
              >
                <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
              </svg>
            ) : (
              <svg
                role="img"
                height="16"
                width="16"
                aria-hidden="true"
                viewBox="0 0 16 16"
                data-encore-id="icon"
                class="Svg-sc-ytk21e-0 haNxPq"
              >
                <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
              </svg>
            )}
          </button>
          <button className="xxx-next-prev" onClick={ClickNEXT}>
            <svg
              role="img"
              height="16"
              width="16"
              aria-hidden="true"
              viewBox="0 0 16 16"
              data-encore-id="icon"
              class="Svg-sc-ytk21e-0 haNxPq"
            >
              <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"></path>
            </svg>
          </button>
          <input
            type="range"
            className="pseudo-volume-controller"
            id="p-x-c"
            min={-1}
            max={101}
            step={1}
            value={props.value}
            onClick={(e) => {
              try {
                player.setVolume(Number(e.target.value) / 100);
              } catch {}
            }}
          ></input>
        </div>
        <div className="div-x-azure">
          <p className="progress_ms_label">{props.currentTrackPosition}</p>
          <div className="track-wrapper-div">
            <div id="tk-div" className="track-active-div"></div>
            <div
              id="progressbar"
              onMouseEnter={() => {
                document.getElementById("x--f").style.background = "#1db954";
              }}
              onMouseLeave={() => {
                document.getElementById("x--f").style.background = "#fff";
              }}
            >
              <input
                min={0}
                max={100}
                id="sliding-track-input"
                type="range"
                className="spotify-range"
                onChange={async (e) => {
                  document.getElementById("x--f").style.width =
                    e.target.value + "%";
                }}
                onMouseDown={async (e) => {
                  document.getElementById("x--f").classList.add("x-seeking-x");
                }}
                onMouseUp={async (e) => {
                  const options = {
                    method: "PUT",
                    url: "https://api.spotify.com/v1/me/player/seek",
                    headers: {
                      Authorization: "Bearer " + props.authToken,
                    },
                    params: {
                      position_ms: Number(
                        Math.round(
                          (props.currentTrackDurationSec / 100) *
                            Number(e.target.value)
                        )
                      ),
                    },
                  };

                  await axios(options)
                    .then((response) => {
                      // Success!
                    })
                    .catch((error) => {
                      // Error!
                    });

                  await props
                    .secondsToMinutesSeconds(
                      Number(
                        Math.round(
                          (props.currentTrackDurationSec / 100) *
                            Number(e.target.value)
                        )
                      ) / 1000
                    )
                    .then((res) => {
                      document.querySelector(".progress_ms_label").innerHTML =
                        res;
                    });

                  setTimeout(() => {
                    document
                      .getElementById("x--f")
                      .classList.remove("x-seeking-x");
                  }, 1000);
                }}
              ></input>
            </div>
            <div id="x--f"></div>
          </div>
          <p
            className="duration_ms_label"
            onClick={() => {
              setNegative(!isnegative);
            }}
          >
            {isnegative
              ? props.currentTrackDurationNegative
              : props.currentTrackDuration}
          </p>
        </div>
      </div>
    );
  } else if (player) {
    if (devixeId != "" && !is_active) {
      const configx = {
        method: "get",
        url: "https://api.spotify.com/v1/me/player/recently-played?limit=1",
        headers: {
          Authorization: "Bearer " + props.authToken,
        },
      };

      axios(configx)
        .then((response) => {
          const config = {
            method: "put",
            url: `https://api.spotify.com/v1/me/player/play?device_id=${devixeId}`,
            headers: {
              Authorization: "Bearer " + props.authToken,
              "Content-Type": "application/json",
            },
            data: {
              uris: [response.data.items[0].track.uri],
              position_ms: 0,
            },
          };

          axios(config)
            .then((response) => {
              setActive(true);
            })
            .catch((error) => {
              // Handle error response
            });
        })
        .catch((error) => {
          // Handle error response
        });
    }

    return (
      <div
        className="container-div-scarlet"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="div-x-azure">
          <button className="xxx-next-prev" onClick={ClickShuffle}>
            <svg
              role="img"
              height="16"
              width="16"
              aria-hidden="true"
              viewBox="0 0 16 16"
              data-encore-id="icon"
              class="Svg-sc-ytk21e-0 haNxPq"
            >
              <path d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 0 0 .39 3.5z"></path>
              <path d="m7.5 10.723.98-1.167.957 1.14a2.25 2.25 0 0 0 1.724.804h1.947l-1.017-1.018a.75.75 0 1 1 1.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 1 1-1.06-1.06L13.109 13H11.16a3.75 3.75 0 0 1-2.873-1.34l-.787-.938z"></path>
            </svg>
          </button>
          <button className="xxx-next-prev" onClick={ClickPREVIOUS}>
            <svg
              role="img"
              height="16"
              width="16"
              aria-hidden="true"
              viewBox="0 0 16 16"
              data-encore-id="icon"
              class="Svg-sc-ytk21e-0 haNxPq"
            >
              <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"></path>
            </svg>
          </button>
          <button
            className="xxx-i"
            onClick={ClickToggle}
            onMouseDown={() => {
              document.querySelector(".xxx-i").classList.add("active");
            }}
            onMouseUp={() => {
              document.querySelector(".xxx-i").classList.remove("active");
            }}
          >
            {is_paused ? (
              <svg
                role="img"
                height="16"
                width="16"
                aria-hidden="true"
                viewBox="0 0 16 16"
                data-encore-id="icon"
                class="Svg-sc-ytk21e-0 haNxPq"
              >
                <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
              </svg>
            ) : (
              <svg
                role="img"
                height="16"
                width="16"
                aria-hidden="true"
                viewBox="0 0 16 16"
                data-encore-id="icon"
                class="Svg-sc-ytk21e-0 haNxPq"
              >
                <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
              </svg>
            )}
          </button>
          <button className="xxx-next-prev" onClick={ClickNEXT}>
            <svg
              role="img"
              height="16"
              width="16"
              aria-hidden="true"
              viewBox="0 0 16 16"
              data-encore-id="icon"
              class="Svg-sc-ytk21e-0 haNxPq"
            >
              <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"></path>
            </svg>
          </button>
          <button className="xxx-next-prev" onClick={ClickRepeat}>
            <svg
              role="img"
              height="16"
              width="16"
              aria-hidden="true"
              viewBox="0 0 16 16"
              data-encore-id="icon"
              class="Svg-sc-ytk21e-0 haNxPq"
            >
              <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z"></path>
            </svg>
          </button>
          <input
            type="range"
            className="pseudo-volume-controller"
            id="p-x-c"
            min={-1}
            max={101}
            step={1}
            value={props.value}
            onClick={(e) => {
              try {
                player.setVolume(Number(e.target.value) / 100);
              } catch {}
            }}
          ></input>
        </div>
        <div className="div-x-azure">
          <p className="progress_ms_label">{props.currentTrackPosition}</p>
          <div className="track-wrapper-div">
            <div id="tk-div" className="track-active-div"></div>
            <div
              id="progressbar"
              onMouseEnter={() => {
                document.getElementById("x--f").style.background = "#1db954";
              }}
              onMouseLeave={() => {
                document.getElementById("x--f").style.background = "#fff";
              }}
            >
              <input
                min={0}
                max={100}
                id="sliding-track-input"
                type="range"
                className="spotify-range"
                onChange={async (e) => {
                  document.getElementById("x--f").style.width =
                    e.target.value + "%";
                }}
                onMouseDown={async (e) => {
                  document.getElementById("x--f").classList.add("x-seeking-x");
                }}
                onMouseUp={async (e) => {
                  const options = {
                    method: "PUT",
                    url: "https://api.spotify.com/v1/me/player/seek",
                    headers: {
                      Authorization: "Bearer " + props.authToken,
                    },
                    params: {
                      position_ms: Number(
                        Math.round(
                          (props.currentTrackDurationSec / 100) *
                            Number(e.target.value)
                        )
                      ),
                    },
                  };

                  await axios(options)
                    .then((response) => {
                      // Success!
                    })
                    .catch((error) => {
                      // Error!
                    });

                  await props
                    .secondsToMinutesSeconds(
                      Number(
                        Math.round(
                          (props.currentTrackDurationSec / 100) *
                            Number(e.target.value)
                        )
                      ) / 1000
                    )
                    .then((res) => {
                      document.querySelector(".progress_ms_label").innerHTML =
                        res;
                    });

                  setTimeout(() => {
                    document
                      .getElementById("x--f")
                      .classList.remove("x-seeking-x");
                  }, 1000);
                }}
              ></input>
            </div>
            <div id="x--f"></div>
          </div>
          <p
            className="duration_ms_label"
            onClick={() => {
              setNegative(!isnegative);
            }}
          >
            {isnegative
              ? props.currentTrackDurationNegative
              : props.currentTrackDuration}
          </p>
        </div>
      </div>
    );
  }
}

export default WebPlayback;
