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
    };

    this.setSongId = this.setSongId.bind(this);
    this.onClick = this.onClick.bind(this);
    this.getSongName = this.getSongName.bind(this);
    this.getSongArtist = this.getSongArtist.bind(this);
    this.getSongImage = this.getSongImage.bind(this);
    this.updateTracksButtons = this.updateTracksButtons.bind(this);
    this.SearchAppearenceChange = this.SearchAppearenceChange.bind(this);

    this.InvokePlayPause = this.InvokePlayPause.bind(this);
  }

  setSongId = (id, name, img, author, albumuri) => {
    // try {

    // if (id != this.state.currentSongid) {
    //   this.setState({ currentSongid: id });

    //   setTimeout(() => {
    //     console.log(player.paused);
    //     player.play();
    //     player.loop = true;
    //     player.continuous = true;
    //   }, 650);
    // } else {
    //   player.paused ? player.play() : player.pause();

    //   player.loop = true;
    //   player.continuous = true;
    // }

    // console.log("IAMGE" + img);

    console.log("Uri" + albumuri);
    try {
      const options = {
        method: "PUT",
        url: "https://api.spotify.com/v1/me/player/play",
        headers: {
          Authorization: "Bearer " + this.state.authToken,
          "Content-Type": "application/json",
        },
        data: {
          context_uri: albumuri,
          offset: {
            position: 0,
          },
          // position_ms: 0,
        },
      };

      axios(options)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
   
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

  onClick = (new_array) => {
    const array = new_array.slice();
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
      console.log("CHIUFEHUFIEFHIOE");
      console.log(this.state.currentSongImage);
    } catch {}
  };

  getSongArtist = (artist) => {
    try {
      this.setState({ currentSongArtist: artist });
    } catch {}
  };

  SearchAppearenceChange = (value) => {
    const div = document.getElementById('search-cat-div-x');
    const divflex = document.querySelector('.x-main-flex-div');
    if(value.length > 0){
      div.classList.add('cat-div-x');
      divflex.classList.add('x-active-cat');
      divflex.classList.remove('x-non-active-cat');
    }
    else{
      div.classList.remove('cat-div-x');
      divflex.classList.remove('x-active-cat');
      divflex.classList.add('x-non-active-cat');
    }
  }

  updateTracksButtons = (currentTrackId) => {
    try {
      const tracks = document.querySelectorAll(".main-card-div");
      let x = 0;
      tracks.forEach((element) => {
        if (element.children[3].id != currentTrackId) {
          if (
            element.children[3].children[0].classList.contains("ri-pause-fill")
          ) {
            element.children[3].children[0].classList.remove("ri-pause-fill");
            element.children[3].children[0].classList.add("ri-play-fill");
          }
        } else {
          if (
            element.children[3].children[0].classList.contains("ri-pause-fill")
          ) {
            element.children[3].children[0].classList.remove("ri-pause-fill");
            element.children[3].children[0].classList.add("ri-play-fill");
          } else {
            element.children[3].children[0].classList.add("ri-pause-fill");
            element.children[3].children[0].classList.remove("ri-play-fill");
          }
        }
      });
    } catch {}
  };

  InvokePlayPause = () =>{

  }

  render() {
    return (
      <>
        <div className="main-div">
          <div className="content-div x-hor-div">
            <div className="x-ver-div">
              <div className="sn-div-side x-border">
                <div className="x-hor-div x-menu-scarlet">
                  <p>
                    <i class="ri-home-2-fill"></i> Home
                  </p>
                </div>
                <div className="x-hor-div x-menu-scarlet">
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
                <div className="lib-list-div-x x-border">

                </div>
              </div>
            </div>
            <div className="sn-div-main x-border">
              <div className="x-ver-div x-search-absolute-div" style={{}}>
                
                <div className="x-hor-div">
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
                  onClick={() => {
                    axios
                      .get("https://api.spotify.com/v1/search", {
                        headers: {
                          Authorization: `Bearer ${this.props.token}`,
                        },
                        params: {
                          q: this.state.searchString, //
                          type: "track",
                          limit: 49,
                        },
                      })
                      .then((res) => {
                        // res.data.tracks.items.forEach((e) =>{
                        //   console.log(e.album.uri)
                        // })
                        const x_new_array = [];
                        res.data.tracks.items.forEach((element) => {
                          let track_object = {
                            id: element.id,
                            name: element.name,
                            image: element.album.images[0].url,
                            albumuri: element.album.uri,
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
                        }).then((res) =>{
                          res.data.tracks.items.forEach((element) => {
                            let track_object = {
                              id: element.id,
                              name: element.name,
                              image: element.album.images[0].url,
                              albumuri: element.album.uri,
                            };
                            x_new_array.push(track_object);
                          });

                          this.onClick(x_new_array);
                        })
                      });
                  }}
                >
                  Search
                </button>
              </div>
              <div id="search-cat-div-x" className="x-hor-div">
              </div>
              <div className="x-main-flex-div x-active-cat">
                <List
                  token={this.state.authToken}
                  ListMAP={this.state.tracks}
                  setSongId={this.setSongId}
                ></List>
              </div>
            </div>
          </div>
          <div className="media-player-div">
            <img id="corner-img-x" src={this.state.currentSongImage}></img>

            <div className="x-ver-div corner-x-div">
              <p id="corner-name-x">{this.state.currentSongName}</p>
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
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                className="player-volume-controller"
                onChange={(e) => {
                  // player.setVolume(Number(e.target.value / 100));
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
