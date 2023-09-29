import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import Helmet from "react-helmet";
import "../CSS/MainPage.css";
import TrackCard from "../Components/TrackCardComponent";
import axios from "axios";
import { useEffect, useState } from "react";
import List from "../Components/TracksListComponent";
import "../Scripts/mainpage_script";
import "media-chrome";
import { debounce } from "lodash";
import WebPlayback from "../Components/WepPLayback";
import { Buffer } from "buffer";

const client_id = "16a2505a2a24488a875f183c93c76089";
const client_secret = "6fbef267aa9a46bd915fbd9cc63d37a3";

class MainPage extends React.Component {
  baseUrl = "https://api.spotify.com/v1/episodes/q=512ojhOuo1ktJprKbVcKyQ";
  timer;
  timer2;
  constructor(props) {
    super(props);

    this.state = {
      currentSongid: "",
      authToken: this.props.token,
      tracks: [],
      searchString: "",
      time: 0,
      duration: 0,
      currentSongName: "",
      currentSongArtist: "",
      currentSongImage: "",
      renderList: false,

      currentTrackDuration: '',
      currentTrackPosition: '',

      currentTrackDurationSec: 0,
      currentTrackPositionSec: 0,

      currentTrackDurationNegative: '',

      volume: 0,

    };

    this.setSongId = this.setSongId.bind(this);
    this.onClickX = this.onClickX.bind(this);
    this.getSongName = this.getSongName.bind(this);
    this.getSongArtist = this.getSongArtist.bind(this);
    this.getSongImage = this.getSongImage.bind(this);
    this.updateTracksButtons = this.updateTracksButtons.bind(this);
    this.SearchAppearenceChange = this.SearchAppearenceChange.bind(this);

    this.InvokePlayPause = this.InvokePlayPause.bind(this);
    this.setTrackTimeValues = this.setTrackTimeValues.bind(this);
    this.secondsToMinutesSecondsNegative = this.secondsToMinutesSecondsNegative.bind(this)
  }

  timer;

  async secondsToMinutesSeconds(seconds) {
    // Get the number of minutes.
    const minutes = Math.floor(seconds / 60);
  
    // Get the remaining seconds.
    const secondsRemaining = Math.round(seconds % 60);
  
    // Pad the minutes and seconds with leading zeros, if necessary.
    // const minutesString = minutes.toString().padStart(2, "0");
    const secondsString = secondsRemaining.toString().padStart(2, "0");
  
    return `${minutes}:${secondsString}`;
  }

  async secondsToMinutesSecondsNegative (seconds, duration) {
    // Get the number of minutes.
   
    var x = duration - seconds;
    console.log(duration + " " + seconds);
    const minutes = Math.floor(x / 60);
  
    // Get the remaining seconds.
    const secondsRemaining = x % 60;
  
    // Pad the minutes and seconds with leading zeros, if necessary.
    // const minutesString = minutes.toString().padStart(2, "0");
    const secondsString = secondsRemaining.toString().padStart(2, "0");
  
    return `-${minutes}:${secondsString}`;
  }

  setTrackTimeValues = (position, duration) =>{

    clearInterval(this.timer)
    
   
    this.timer = setInterval(async () =>{
      const options = {
        method: "GET",
        url: "https://api.spotify.com/v1/me/player/currently-playing",
        headers: {
          Authorization: "Bearer " + this.state.authToken,
        },
      }
  
      await axios(options).then(async (response) =>{
          this.setState({currentTrackDuration: await this.secondsToMinutesSeconds(Math.round(response.data.item.duration_ms / 1000))})
          this.setState({currentTrackPosition: await this.secondsToMinutesSeconds(Math.round(response.data.progress_ms / 1000))})
          this.setState({currentTrackDurationNegative: await this.secondsToMinutesSecondsNegative(Math.round(response.data.progress_ms / 1000), Math.round(response.data.item.duration_ms/ 1000))})
          this.setState({currentTrackPositionSec: response.data.progress_ms});
          this.setState({currentTrackDurationSec: response.data.item.duration_ms});

          const input_x = document.getElementById('x--f');

          if(!input_x.classList.contains('x-seeking-x')){
            input_x.style.width = Math.round(response.data.progress_ms / 1000) / (Math.round(response.data.item.duration_ms / 1000)/100) + "%";

            const input_y = document.getElementById('sliding-track-input');
  
            input_y.value = Math.round(response.data.progress_ms / 1000) / (Math.round(response.data.item.duration_ms / 1000)/100);
          }
          else{

          }
          
      })
      .catch((error) => {
        console.log(error)
      });

    }, 1000)

   

   
  }

  setSongId = async (id, name, img, author, albumuri) => {
    console.log(id);
    console.log(albumuri);

    clearInterval(this.timer);
    try {
      const options2 = {
        method: "GET",
        url: "https://api.spotify.com/v1/me/player/currently-playing",
        headers: {
          Authorization: "Bearer " + this.state.authToken,
        },
      };

      await axios(options2)
        .then(async (response) => {
          console.log("UUUUUUUUUUU");
          console.log(response);
          if ("spotify:track:" + id == response.data.item.uri) {
            const options = {
              method: "GET",
              url: "https://api.spotify.com/v1/me/player",
              headers: {
                Authorization: "Bearer " + this.state.authToken,
              },
            };

            await axios(options)
              .then(async (response) => {
                if (response.data.is_playing) {
                  const options = {
                    method: "PUT",
                    url: "https://api.spotify.com/v1/me/player/pause",
                    headers: {
                      Authorization: "Bearer " + this.state.authToken,
                    },
                  };

                  await axios(options)
                    .then((response) => {})
                    .catch((error) => {
                      console.log(error)
                    });
                } else {
                  const options = {
                    method: "PUT",
                    url: "https://api.spotify.com/v1/me/player/play",
                    headers: {
                      Authorization: "Bearer " + this.state.authToken,
                    },
                  };

                  await axios(options)
                    .then((response) => {})
                    .catch((error) => {
                      console.log(error)
                    });
                }
              })
              .catch((error) => {
                console.log(error)
              });
          } else {
            const options = {
              method: "PUT",
              url: "https://api.spotify.com/v1/me/player/play",
              headers: {
                Authorization: "Bearer " + this.state.authToken,
                "Content-Type": "application/json",
              },
              data: {
                uris: ["spotify:track:" + id],
              },
            };

            await axios(options)
              .then((response) => {})
              .catch((error) => {
                console.log(error)
              });
          }
        })
        .catch((error) => {
          console.log(error)
        });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    const div = document.getElementById("search-cat-div-x");
    div.style.display = "none";
  }

  componentDidUpdate(nextProps) {
    if (nextProps != this.props) {
      if (this.state.currentSongid === "") {
        document.querySelector(".media-player-div").style.display = "none";
      } else {
        document.querySelector(".media-player-div").style.display = "flex";
      }
    }
  }

  onClickX = (new_array) => {
    const array = new_array.slice();
    alert("CHANGED");
    this.setState({ tracks: array });
  };

  getSongName = (name) => {
    try {
      this.setState({ currentSongName: name });
    } catch {}
  };

  getSongImage = (image) => {
    try {
      this.setState({ currentSongImage: image });
    } catch {}
  };

  getSongArtist = (artist) => {
    try {
      this.setState({ currentSongArtist: artist });
    } catch {}
  };

  SearchAppearenceChange = (value) => {
    const div = document.getElementById("search-cat-div-x");
    const divflex = document.querySelector(".x-main-flex-div");

    if (value.length > 0) {
      div.style.display = "flex";
      div.classList.add("cat-div-x");
      divflex.classList.add("x-active-cat");
      divflex.classList.remove("x-non-active-cat");
    } else {
      div.style.display = "none";
      div.classList.remove("cat-div-x");
      divflex.classList.remove("x-active-cat");
      divflex.classList.add("x-non-active-cat");
    }
  };

  updateTracksButtons = (currentTrackId, playstate) => {
    try {
      const tracks = document.querySelectorAll(".main-card-div");
      let x = 0;
      tracks.forEach((element) => {
        if ("spotify:track:" + element.children[3].id != currentTrackId) {
          if (
            element.children[3].children[0].classList.contains("ri-pause-fill")
          ) {
            element.children[3].children[0].classList.remove("ri-pause-fill");
            element.children[3].children[0].classList.add("ri-play-fill");
          }
        } else {
          if (playstate) {
            element.children[3].children[0].classList.remove("ri-pause-fill");
            element.children[3].children[0].classList.add("ri-play-fill");
          } else {
            element.children[3].children[0].classList.add("ri-pause-fill");
            element.children[3].children[0].classList.remove("ri-play-fill");
          }
        }
      });
    } catch (error) {}
  };

  InvokePlayPause = () => {};

  render() {
    return (
      <>
        <div className="main-div">
          <div className="content-div x-hor-div">
            <div className="x-ver-div">
              <div className="sn-div-side x-border">
                <div className="x-hor-div x-menu-scarlet">
                  <p>
                    <i
                      class="ri-home-2-fill"
                      onClick={() => {
                        this.setState({ authToken: "" });
                        this.props.navigate("/");
                      }}
                    ></i>{" "}
                    Home
                  </p>
                </div>
                <div
                  className="x-hor-div x-menu-scarlet"
                  onClick={() => {
                    document.getElementById("search-input").focus();
                  }}
                >
                  <p>
                    <i class="ri-search-line"></i> Search
                  </p>
                </div>
              </div>
              <div className="sx-div-side x-border">
                <div className="x-hor-div x-menu-scarlet">
                  <p>
                    <i class="ri-bill-fill"></i> Library{" "}
                  </p>
                  <button className="btn-x-lib-navigate">
                    <i class="ri-arrow-right-line"></i>
                  </button>
                  <button
                    className="btn-x-lib-navigate"
                    style={{ marginLeft: 0 }}
                  >
                    <i class="ri-add-line"></i>
                  </button>
                </div>
                <div className="lib-list-div-x x-border"></div>
              </div>
            </div>
            <div className="sn-div-main x-border">
              <div className="x-ver-div x-search-absolute-div" style={{}}>
                <div className="xx-nv-uu-ss x-border">
                  <button
                    className="btn-x-lib-navigate"
                    style={{ marginLeft: "1.4rem", marginTop: "1.4rem" }}
                  >
                    <i class="ri-arrow-left-s-line"></i>
                  </button>
                  <button
                    className="btn-x-lib-navigate"
                    style={{ marginLeft: "0.4rem", marginTop: "1.4rem" }}
                  >
                    <i class="ri-arrow-right-s-line"></i>
                  </button>
                  <input
                    className="x-scarlet-input"
                    placeholder={"Search..."}
                    id="search-input"
                    type="text"
                    onChange={(e) => {
                      this.setState({ searchString: e.target.value });
                      this.SearchAppearenceChange(e.target.value);
                    }}
                  ></input>
                </div>

                <button
                  id="search-btn-x"
                  style={{ height: "2rem", display: "none" }}
                  onClick={async () => {
                    var count_cc = 0;

                    const optionsx = {
                      method: "GET",
                      url: "https://api.spotify.com/v1/search",
                      headers: {
                        Authorization: "Bearer " + this.state.authToken,
                      },
                      params: {
                        q: this.state.searchString, //
                        type: "track",
                        limit: 49,
                      },
                    };

                    await axios(optionsx).then((res) => {
                      console.log(res.data);
                      const x_new_array = [];
                      res.data.tracks.items.forEach((element) => {
                        var str = "";
                        for (var xx = 0; xx < element.artists.length; xx++) {
                          if (xx != element.artists.length - 1) {
                            str += element.artists[xx].name + ", ";
                          } else {
                            str += element.artists[xx].name;
                          }
                        }
                        let track_object = {
                          id: element.id,
                          name: element.name,
                          image: element.album.images[0].url,
                          albumuri: element.album.uri,
                          artists: str,
                          count_cc: count_cc++,
                        };
                        x_new_array.push(track_object);
                      });

                      axios
                        .get("https://api.spotify.com/v1/search", {
                          headers: {
                            Authorization: `Bearer ${this.props.token}`,
                          },
                          params: {
                            q: this.state.searchString, //
                            type: "track",
                            limit: 49,
                            offset: 49,
                          },
                        })
                        .then((res) => {
                          res.data.tracks.items.forEach((element) => {
                            var str = "";
                            for (
                              var xx = 0;
                              xx < element.artists.length;
                              xx++
                            ) {
                              if (xx != element.artists.length - 1) {
                                str += element.artists[xx].name + ", ";
                              } else {
                                str += element.artists[xx].name;
                              }
                            }
                            let track_object = {
                              id: element.id,
                              name: element.name,
                              image: element.album.images[0].url,
                              albumuri: element.album.uri,
                              artists: str,
                              count_cc: count_cc++,
                            };
                            x_new_array.push(track_object);
                          });

                          this.setState({ tracks: x_new_array });
                          this.setState({ renderList: true });

                        });

                       
                    });

                    count_cc = 0;

                    await axios(optionsx).then((res) => {
                      console.log(res.data);
                      const x_new_array = [];
                      res.data.tracks.items.forEach((element) => {
                        var str = "";
                        for (var xx = 0; xx < element.artists.length; xx++) {
                          if (xx != element.artists.length - 1) {
                            str += element.artists[xx].name + ", ";
                          } else {
                            str += element.artists[xx].name;
                          }
                        }
                        let track_object = {
                          id: element.id,
                          name: element.name,
                          image: element.album.images[0].url,
                          albumuri: element.album.uri,
                          artists: str,
                          count_cc: count_cc++,
                        };
                        x_new_array.push(track_object);
                      });


                      count_cc = 0;

                      
                      axios
                        .get("https://api.spotify.com/v1/search", {
                          headers: {
                            Authorization: `Bearer ${this.props.token}`,
                          },
                          params: {
                            q: this.state.searchString, //
                            type: "track",
                            limit: 49,
                            offset: 49,
                          },
                        })
                        .then((res) => {
                          res.data.tracks.items.forEach((element) => {
                            var str = "";
                            for (
                              var xx = 0;
                              xx < element.artists.length;
                              xx++
                            ) {
                              if (xx != element.artists.length - 1) {
                                str += element.artists[xx].name + ", ";
                              } else {
                                str += element.artists[xx].name;
                              }
                            }
                            let track_object = {
                              id: element.id,
                              name: element.name,
                              image: element.album.images[0].url,
                              albumuri: element.album.uri,
                              artists: str,
                              count_cc: count_cc++,
                            };
                            x_new_array.push(track_object);
                          });

                          this.setState({ tracks: x_new_array });
                          this.setState({ renderList: true });
                        });
                    });
                  }}
                >
                  Search
                </button>
              </div>
              <div id="search-cat-div-x" className="x-hor-div">
                <button
                  className="cat-div-x-active-u-non-button"
                  id="c-all-u"
                  onClick={() => {
                    const btn = document.getElementById("c-all-u"); //cat-div-x-active-u-non-button
                    if (btn.classList.contains("cat-div-x-active-u-button")) {
                      btn.classList.remove("cat-div-x-active-u-button");
                    } else {
                      btn.classList.add("cat-div-x-active-u-button");
                    }
                    const btns = document.querySelectorAll(
                      ".cat-div-x-active-u-non-button"
                    );

                    btns.forEach((b) => {
                      if (b.id != btn.id) {
                        b.classList.remove("cat-div-x-active-u-button");
                      }
                    });
                  }}
                >
                  All
                </button>
                <button
                  className="cat-div-x-active-u-non-button"
                  id="c-song-u"
                  onClick={() => {
                    const btn = document.getElementById("c-song-u"); //cat-div-x-active-u-non-button
                    if (btn.classList.contains("cat-div-x-active-u-button")) {
                      btn.classList.remove("cat-div-x-active-u-button");
                    } else {
                      btn.classList.add("cat-div-x-active-u-button");
                    }

                    const btns = document.querySelectorAll(
                      ".cat-div-x-active-u-non-button"
                    );

                    btns.forEach((b) => {
                      if (b.id != btn.id) {
                        b.classList.remove("cat-div-x-active-u-button");
                      }
                    });
                  }}
                >
                  Songs
                </button>
                <button
                  className="cat-div-x-active-u-non-button"
                  id="c-artist-u"
                  onClick={() => {
                    const btn = document.getElementById("c-artist-u"); //cat-div-x-active-u-non-button
                    if (btn.classList.contains("cat-div-x-active-u-button")) {
                      btn.classList.remove("cat-div-x-active-u-button");
                    } else {
                      btn.classList.add("cat-div-x-active-u-button");
                    }
                    const btns = document.querySelectorAll(
                      ".cat-div-x-active-u-non-button"
                    );

                    btns.forEach((b) => {
                      if (b.id != btn.id) {
                        b.classList.remove("cat-div-x-active-u-button");
                      }
                    });
                  }}
                >
                  Artist
                </button>

                <button
                  className="cat-div-x-active-u-non-button"
                  id="c-playlists-u"
                  onClick={() => {
                    const btn = document.getElementById("c-playlists-u"); //cat-div-x-active-u-non-button
                    if (btn.classList.contains("cat-div-x-active-u-button")) {
                      btn.classList.remove("cat-div-x-active-u-button");
                    } else {
                      btn.classList.add("cat-div-x-active-u-button");
                    }
                    const btns = document.querySelectorAll(
                      ".cat-div-x-active-u-non-button"
                    );

                    btns.forEach((b) => {
                      if (b.id != btn.id) {
                        b.classList.remove("cat-div-x-active-u-button");
                      }
                    });
                  }}
                >
                  Playlists
                </button>

                <button
                  className="cat-div-x-active-u-non-button"
                  id="c-albums-u"
                  onClick={() => {
                    const btn = document.getElementById("c-albums-u"); //cat-div-x-active-u-non-button
                    if (btn.classList.contains("cat-div-x-active-u-button")) {
                      btn.classList.remove("cat-div-x-active-u-button");
                    } else {
                      btn.classList.add("cat-div-x-active-u-button");
                    }
                    const btns = document.querySelectorAll(
                      ".cat-div-x-active-u-non-button"
                    );

                    btns.forEach((b) => {
                      if (b.id != btn.id) {
                        b.classList.remove("cat-div-x-active-u-button");
                      }
                    });
                  }}
                >
                  Albums
                </button>
              </div>
              <div className="x-main-flex-div x-active-cat">
                {this.state.renderList ? (
                  <List
                    token={this.state.authToken}
                    ListMAP={this.state.tracks}
                    setSongId={this.setSongId}
                  ></List>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className="media-player-div">
            <img id="corner-img-x" src={this.state.currentSongImage}></img>

            <div className="x-ver-div corner-x-div corner-song-div">
              <marquee direction={"left"} id="corner-name-x">
                {this.state.currentSongName}
              </marquee>
              <p id="corner-artist-x">{this.state.currentSongArtist}</p>
            </div>
            <div
              className="x-ver-div corner-x-div"
              style={{ position: "relative", zIndex: "2" }}
              onClick={() => {
                const icon = document.getElementById("like-icon");

                if (icon.classList.contains("ri-heart-line")) {
                  icon.classList.remove("ri-heart-line");
                  icon.classList.add("ri-heart-fill");
                  icon.style.color = "#1ED760";
                } else {
                  icon.classList.add("ri-heart-line");
                  icon.classList.remove("ri-heart-fill");
                  icon.style.color = "white";
                }
              }}
            >
              <p>
                <i
                  id="like-icon"
                  class="ri-heart-line"
                  style={{ fontSize: "1.5rem" }}
                ></i>
              </p>
            </div>

            <div className="x-hor-div"></div>

            {/* <spotify-audio
              id="xx-U-xx"
              controls
              src={"https://open.spotify.com/track/" + this.state.currentSongid}
            ></spotify-audio> */}

            <WebPlayback
              secondsToMinutesSeconds={this.secondsToMinutesSeconds}
              currentTrackDurationSec={this.state.currentTrackDurationSec}
              currentTrackDuration={this.state.currentTrackDuration}
              currentTrackDurationNegative={this.state.currentTrackDurationNegative}
              currentTrackPosition={this.state.currentTrackPosition}
              volume={this.state.volume}
              setTrackTimeValues={this.setTrackTimeValues}
              InvokePlayPause={this.InvokePlayPause}
              authToken={this.state.authToken}
              getSongName={this.getSongName}
              getSongArtist={this.getSongArtist}
              getSongImage={this.getSongImage}
              updateTracksButtons={this.updateTracksButtons}
              updateCurrentSongState={this.updateCurrentSongState}
              id="spotify-player"
              token={this.props.token}
              src={"https://open.spotify.com/track/" + this.state.currentSongid}
            ></WebPlayback>

            <div className="volume-controller-div">
           
           {/* <svg id="v-muted" role="presentation" height="16" width="16" aria-hidden="true" aria-label="Volume off"  viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 haNxPq"><path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"></path><path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path></svg> */}
            <svg id="v-unmuted" role="presentation" height="16" width="16" aria-hidden="true" aria-label="Volume medium" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 haNxPq"><path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 0 0 0-8.474v1.65a2.999 2.999 0 0 1 0 5.175v1.649z"></path></svg>
              
              <input
                type="range"
                min={-1}
                max={101}
                step={1}
                className="player-volume-controller"
                onInput={(e) =>{
                  this.setState({volume: Number(e.target.value) / 100})
                  const rangeInput = document.getElementById("p-x-c");
                  rangeInput.value = e.target.value;
                  rangeInput.click();
                  console.log(this.state.volume)
                }}
              ></input>
            </div>
          </div>
        </div>
      </> //1cAU2LwAyO2DDg6cVAoW3A
    );
  }
}

export function MainPageWithRouter(props) {
  const navigate = useNavigate();

  // const debouncedAdjustVolume = useCallback(
  //   debounce((volume ) =>{
  //     spotifyApi.setVolume(volume)
  //   })
  // );

  const location = useLocation();

  // function getHashValue(key) {
  //   var matches = location.hash.match(new RegExp(key + "=([^&]*)"));
  //   return matches ? matches[1] : null;
  // }

  if (location.state.authToken != null) {
    return (
      <MainPage navigate={navigate} token={location.state.authToken}></MainPage>
    );
  } else {
    console.log("TOKEN BAD");
    navigate("/");
  }
}

export default MainPage;
