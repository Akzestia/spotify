import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import "../CSS/MainPage.css";
import axios from "axios";
import List from "../Components/TracksListComponent";
import "../Scripts/mainpage_script";
import "media-chrome";
import WebPlayback from "../Components/WepPLayback";
import LikedTracksList from "../Components/LikedTracksComponent";
import PlayList_List from "../Components/PlaylistsLIST_Component";
import PlayList, {PlaylistWithRouter} from "../Components/PlaylistComponent";

class LikedTracksPage extends React.Component {
  baseUrl = "https://api.spotify.com/v1/episodes/q=512ojhOuo1ktJprKbVcKyQ";
  timer;
  timer2;
  constructor(props) {
    super(props);

    this.state = {
      currentSongid: "",
      authToken: this.props.token,
      tracks: [],
      likedtracks: [],

      searchString: "",
      time: 0,
      duration: 0,
      currentSongName: "",
      currentSongArtist: "",
      currentSongImage: "",
      renderList: false,

      currentTrackDuration: "",
      currentTrackPosition: "",

      currentTrackDurationSec: 0,
      currentTrackPositionSec: 0,

      currentTrackDurationNegative: "",

      searchTypeParam: "track",
      currentUserID: "",
      currentUserPlaylists: "",

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
    this.secondsToMinutesSecondsNegative =
      this.secondsToMinutesSecondsNegative.bind(this);

    this.setDeviceID = this.setDeviceID.bind(this);
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

  async secondsToMinutesSecondsNegative(seconds, duration) {
    // Get the number of minutes.

    var x = duration - seconds;
    const minutes = Math.floor(x / 60);

    // Get the remaining seconds.
    const secondsRemaining = x % 60;

    // Pad the minutes and seconds with leading zeros, if necessary.
    // const minutesString = minutes.toString().padStart(2, "0");
    const secondsString = secondsRemaining.toString().padStart(2, "0");

    return `-${minutes}:${secondsString}`;
  }

  setTrackTimeValues = (position, duration) => {
    clearInterval(this.timer);

    this.timer = setInterval(async () => {
      const options = {
        method: "GET",
        url: "https://api.spotify.com/v1/me/player/currently-playing",
        headers: {
          Authorization: "Bearer " + this.state.authToken,
        },
      };

      await axios(options)
        .then(async (response) => {
          this.setState({
            currentTrackDuration: await this.secondsToMinutesSeconds(
              Math.round(response.data.item.duration_ms / 1000)
            ),
          });
          this.setState({
            currentTrackPosition: await this.secondsToMinutesSeconds(
              Math.round(response.data.progress_ms / 1000)
            ),
          });
          this.setState({
            currentTrackDurationNegative:
              await this.secondsToMinutesSecondsNegative(
                Math.round(response.data.progress_ms / 1000),
                Math.round(response.data.item.duration_ms / 1000)
              ),
          });
          this.setState({ currentTrackPositionSec: response.data.progress_ms });
          this.setState({
            currentTrackDurationSec: response.data.item.duration_ms,
          });

          const input_x = document.getElementById("x--f");

          if (!input_x.classList.contains("x-seeking-x")) {
            input_x.style.width =
              Math.round(response.data.progress_ms / 1000) /
                (Math.round(response.data.item.duration_ms / 1000) / 100) +
              "%";

            const input_y = document.getElementById("sliding-track-input");

            input_y.value =
              Math.round(response.data.progress_ms / 1000) /
              (Math.round(response.data.item.duration_ms / 1000) / 100);
          } else {
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }, 1000);
  };

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
                      console.log(error);
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
                      console.log(error);
                    });
                }
              })
              .catch((error) => {
                console.log(error);
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
                console.log(error);
              });
          }
        })
        .catch(async (error) => {
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
              console.log(error);
            });
        });
    } catch (error) {}

    this.setState({ currentSongid: id });
    const icon = document.getElementById("like-icon");

    var isliked = false;
    this.state.likedtracks.forEach((e) => {
      if (e.id == id) {
        isliked = true;
      }
    });

    if (!icon.classList.contains("ri-heart-line")) {
      icon.classList.add("ri-heart-line");
      icon.classList.remove("ri-heart-fill");
      icon.style.color = "white";
    }

    if (isliked) {
      icon.classList.remove("ri-heart-line");
      icon.classList.add("ri-heart-fill");
      icon.style.color = "#1ED760";
    }

    try {
      //update btns
    } catch {}
  };

  setDeviceID = (value) => {};

  componentDidMount = async () => {
    //likedtracks
    try {
      const div = document.getElementById("search-cat-div-x");
      div.style.display = "none";
      const options2 = {
        method: "GET",
        url: "https://api.spotify.com/v1/me/player/currently-playing",
        headers: {
          Authorization: "Bearer " + this.state.authToken,
        },
      };

      await axios(options2).then(async (response) => {
        console.log("dwodhoubfouqfuowhqoufiqwiof");
        console.log(response.data); //response.data.item.album.images[0].url
        this.setState({ currentSongid: response.data.item.id });
        this.setState({
          currentSongImage: response.data.item.album.images[0].url,
        });
        var str = "";
        for (var xx = 0; xx < response.data.item.artists.length; xx++) {
          if (xx != response.data.item.artists.length - 1) {
            str += response.data.item.artists[xx].name + ", ";
          } else {
            str += response.data.item.artists[xx].name;
          }
        }
        this.setState({ currentSongName: response.data.item.name });
        this.setState({ currentSongArtist: str });
      });
    } catch (error) {
      console.log(error);
    }

    try {
      console.log("UWU-x");
      const config = {
        method: "get",
        url: "https://api.spotify.com/v1/me/tracks",
        headers: {
          Authorization: "Bearer " + this.state.authToken,
        },
      };

      axios(config)
        .then((response) => {
          console.log("UWU");
          const tr_op = [];

          var count_cc = 0;

          response.data.items.forEach((element) => {
            var str = "";
            for (var xx = 0; xx < element.track.artists.length; xx++) {
              if (xx != element.track.artists.length - 1) {
                str += element.track.artists[xx].name + ", ";
              } else {
                str += element.track.artists[xx].name;
              }
            }
            let track_object = {
              id: element.track.id,
              name: element.track.name,
              image: element.track.album.images[0].url,
              albumuri: element.track.album.uri,
              artists: str,
              count_cc: count_cc++,
            };
            tr_op.push(track_object);

            this.setState({ likedtracks: tr_op });
            this.setState({ tracks: tr_op });
            this.setState({ renderList: true });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }

    try {
      const axiosInstance = axios.create({
        headers: {
          Authorization: "Bearer " + this.state.authToken,
        },
      });

      axiosInstance
        .get("https://api.spotify.com/v1/me")
        .then((response) => {
          this.setState({ currentUserID: response.data.id });

          axiosInstance
            .get(
              `https://api.spotify.com/v1/users/${this.state.currentUserID}/playlists`
            )
            .then((response) => {
              console.log("Playlists");
              console.log(response);
              this.setState({ currentUserPlaylists: response.data.items });

              //
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidUpdate = async (nextProps) => {
    clearInterval(this.timer);
    clearInterval(this.timer2);

    if (nextProps != this.props) {
      if (this.state.currentSongid === "") {
        document.querySelector(".media-player-div").style.display = "none";
      } else {
        document.querySelector(".media-player-div").style.display = "flex";
      }

      try {
        const div = document.getElementById("search-cat-div-x");
        div.style.display = "none";
        const options2 = {
          method: "GET",
          url: "https://api.spotify.com/v1/me/player/currently-playing",
          headers: {
            Authorization: "Bearer " + this.state.authToken,
          },
        };

        await axios(options2).then(async (response) => {
          console.log("dwodhoubfouqfuowhqoufiqwiof");
          console.log(response.data); //response.data.item.album.images[0].url
          this.setState({ currentSongid: response.data.item.id });
          this.setState({
            currentSongImage: response.data.item.album.images[0].url,
          });
          var str = "";
          for (var xx = 0; xx < response.data.item.artists.length; xx++) {
            if (xx != response.data.item.artists.length - 1) {
              str += response.data.item.artists[xx].name + ", ";
            } else {
              str += response.data.item.artists[xx].name;
            }
          }
          this.setState({ currentSongName: response.data.item.name });
          this.setState({ currentSongArtist: str });
        });
      } catch (error) {
        console.log(error);
      }

      try {
        console.log("UWU-x");
        const config = {
          method: "get",
          url: "https://api.spotify.com/v1/me/tracks",
          headers: {
            Authorization: "Bearer " + this.state.authToken,
          },
        };

        axios(config)
          .then((response) => {
            console.log("UWU");
            const tr_op = [];

            var count_cc = 0;

            response.data.items.forEach((element) => {
              var str = "";
              for (var xx = 0; xx < element.track.artists.length; xx++) {
                if (xx != element.track.artists.length - 1) {
                  str += element.track.artists[xx].name + ", ";
                } else {
                  str += element.track.artists[xx].name;
                }
              }
              let track_object = {
                id: element.track.id,
                name: element.track.name,
                image: element.track.album.images[0].url,
                albumuri: element.track.album.uri,
                artists: str,
                count_cc: count_cc++,
              };
              tr_op.push(track_object);

              this.setState({ likedtracks: tr_op });
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }

      try {
        const axiosInstance = axios.create({
          headers: {
            Authorization: "Bearer " + this.state.authToken,
          },
        });

        axiosInstance
          .get("https://api.spotify.com/v1/me")
          .then((response) => {
            this.setState({ currentUserID: response.data.id });

            axiosInstance
              .get(
                `https://api.spotify.com/v1/users/${this.state.currentUserID}/playlists`
              )
              .then((response) => {
                console.log("Playlists");
                console.log(response);
                this.setState({ currentUserPlaylists: response.data.items });

                //
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }

      console.log("Xrx");
      try {
        const x_new_array = [];

        const axiosInstance = axios.create({
          headers: {
            Authorization: "Bearer " + this.state.authToken,
          },
        });
        console.log(this.props.albumid_x);
        console.log(
          `https://api.spotify.com/v1/playlists/${this.props.albumid_x}/tracks`
        );
        axiosInstance
          .get(
            `https://api.spotify.com/v1/playlists/${this.props.albumid_x}/tracks`
          )
          .then((response) => {
            console.log("O_I_O");
            console.log(response);

            var count_cc = 0;
            response.data.items.forEach((element) => {
              var str = "";
              for (var xx = 0; xx < element.track.artists.length; xx++) {
                if (xx != element.track.artists.length - 1) {
                  str += element.track.artists[xx].name + ", ";
                } else {
                  str += element.track.artists[xx].name;
                }
              }
              let track_object = {
                id: element.track.id,
                name: element.track.name,
                image: element.track.album.images[0].url,
                albumuri: element.track.album.uri,
                artists: str,
                count_cc: count_cc++,
              };
              x_new_array.push(track_object);

              this.setState({ tracks: x_new_array });
              this.setState({ renderList: true });
            });

            this.setState({ tracks: x_new_array });
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

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
                <div className="x-hor-div x-menu-scarlet"  onClick={() => {
                        clearInterval(this.timer);
                        clearInterval(this.timer2);
                        this.props.navigate("/mainpage", {
                          state: { authToken: this.state.authToken },
                        });
                      }}>
                  <p>
                    <i
                      className="ri-home-2-fill"
                     
                    ></i>{" "}
                    Home
                  </p>
                </div>
                <div
                  className="x-hor-div x-menu-scarlet"
                  onClick={() => {
                    this.props.navigate("/mainpage", {
                        state: { authToken: this.state.authToken },
                      });
                    // document.getElementById("search-input").focus();
                  }}
                >
                  <p>
                    <i className="ri-search-line"></i> Search
                  </p>
                </div>
              </div>
              <div className="sx-div-side x-border">
                <div className="x-hor-div x-menu-scarlet">
                  <p>
                    <i className="ri-bill-fill"></i> Library{" "}
                  </p>
                  <button className="btn-x-lib-navigate">
                    <i className="ri-arrow-right-line"></i>
                  </button>
                  <button
                    className="btn-x-lib-navigate"
                    style={{ marginLeft: 0 }}
                  >
                    <i className="ri-add-line"></i>
                  </button>
                </div>
                {/* currentUserPlaylists */}
                <div className="lib-list-div-x x-border">
                  <PlaylistWithRouter
                    key={9999999999}
                    description={""}
                    authToken={this.props.token}
                    id={"9999999999"}
                    url={""}
                    name={"Liked traks"}
                    uri={""}
                    href={""}
                  ></PlaylistWithRouter>
                  <PlayList_List
                    token={this.state.authToken}
                    ListMAP={this.state.currentUserPlaylists}
                  ></PlayList_List>

                  {/* <LikedTracksList
                    searchTypeParam={this.state.searchTypeParam}
                    token={this.state.authToken}
                    ListMAP={this.state.likedtracks}
                    setSongId={this.setSongId}
                  ></LikedTracksList> */}
                </div>
              </div>
            </div>
            <div className="sn-div-main x-border">
              <div className="x-search-absolute-div" style={{}}>
                <div className="xx-nv-uu-ss x-border">
                  <button
                    className="btn-x-lib-navigate"
                    style={{ marginLeft: "1.4rem", marginTop: "1.4rem" }}
                    onClick={() =>{
                        this.props.navigate(-1)
                    }}
                  >
                    <i className="ri-arrow-left-s-line" ></i>
                  </button>
                  <button
                    className="btn-x-lib-navigate"
                    style={{ marginLeft: "0.4rem", marginTop: "1.4rem" }}
                    onClick={() =>{
                        this.props.navigate(1)
                    }}
                  >
                    <i className="ri-arrow-right-s-line" ></i>
                  </button>
                  {/* <input
                    className="x-scarlet-input"
                    placeholder={"Search..."}
                    id="search-input"
                    type="text"
                    onChange={(e) => {
                      this.setState({ searchString: e.target.value });
                      this.SearchAppearenceChange(e.target.value);
                    }}
                  ></input> */}

                  <div className="account-div-wrapper">
                    <button
                      className="Account-drop-down-btn"
                      style={{ width: "7.411rem", borderRadius: "1.78rem" }}
                      onClick={() => {
                        window.open(
                          "https://www.spotify.com/ua-uk/download/windows/",
                          "_blank"
                        );
                      }}
                    >
                      <pre>
                        <i className="ri-arrow-down-circle-line"></i> Install
                        App
                      </pre>
                    </button>

                    <button className="Account-drop-down-btn">
                      <svg
                        role="img"
                        height="16"
                        width="16"
                        aria-hidden="true"
                        className="Svg-sc-ytk21e-0 haNxPq t93PZphItuM19kPhX7tC"
                        viewBox="0 0 16 16"
                        data-encore-id="icon"
                      >
                        <path d="M8 1.5a4 4 0 0 0-4 4v3.27a.75.75 0 0 1-.1.373L2.255 12h11.49L12.1 9.142a.75.75 0 0 1-.1-.374V5.5a4 4 0 0 0-4-4zm-5.5 4a5.5 5.5 0 0 1 11 0v3.067l2.193 3.809a.75.75 0 0 1-.65 1.124H10.5a2.5 2.5 0 0 1-5 0H.957a.75.75 0 0 1-.65-1.124L2.5 8.569V5.5zm4.5 8a1 1 0 1 0 2 0H7z"></path>
                      </svg>
                    </button>

                    <button
                      className="Account-drop-down-btn"
                      onClick={() => {
                        const u = document.querySelector(".ul-account");
                        u.style.display == "none"
                          ? (u.style.display = "block")
                          : (u.style.display = "none");
                      }}
                    >
                      <svg
                        role="img"
                        height="16"
                        width="16"
                        aria-hidden="true"
                        data-testid="user-icon"
                        viewBox="0 0 16 16"
                        data-encore-id="icon"
                        className="Svg-sc-ytk21e-0 haNxPq"
                      >
                        <path d="M6.233.371a4.388 4.388 0 0 1 5.002 1.052c.421.459.713.992.904 1.554.143.421.263 1.173.22 1.894-.078 1.322-.638 2.408-1.399 3.316l-.127.152a.75.75 0 0 0 .201 1.13l2.209 1.275a4.75 4.75 0 0 1 2.375 4.114V16H.382v-1.143a4.75 4.75 0 0 1 2.375-4.113l2.209-1.275a.75.75 0 0 0 .201-1.13l-.126-.152c-.761-.908-1.322-1.994-1.4-3.316-.043-.721.077-1.473.22-1.894a4.346 4.346 0 0 1 .904-1.554c.411-.448.91-.807 1.468-1.052zM8 1.5a2.888 2.888 0 0 0-2.13.937 2.85 2.85 0 0 0-.588 1.022c-.077.226-.175.783-.143 1.323.054.921.44 1.712 1.051 2.442l.002.001.127.153a2.25 2.25 0 0 1-.603 3.39l-2.209 1.275A3.25 3.25 0 0 0 1.902 14.5h12.196a3.25 3.25 0 0 0-1.605-2.457l-2.209-1.275a2.25 2.25 0 0 1-.603-3.39l.127-.153.002-.001c.612-.73.997-1.52 1.052-2.442.032-.54-.067-1.097-.144-1.323a2.85 2.85 0 0 0-.588-1.022A2.888 2.888 0 0 0 8 1.5z"></path>
                      </svg>
                    </button>

                    <ul className="ul-account" style={{ display: "none" }}>
                      <li
                        onClick={() => {
                          clearInterval(this.timer);
                          clearInterval(this.timer2);
                          this.props.navigate("/user/account", {
                            state: { authToken: this.state.authToken },
                          });
                        }}
                      >
                        <p>Account</p> <i className="ri-login-box-line"></i>
                      </li>
                      <li
                        onClick={() => {
                          window.open(
                            "https://support.spotify.com/us/",
                            "_blank"
                          );
                        }}
                      >
                        <p>Support</p> <i className="ri-login-box-line"></i>
                      </li>
                      <li
                        onClick={() => {
                          window.open(
                            "https://www.spotify.com/ua-uk/download/windows/",
                            "_blank"
                          );
                        }}
                      >
                        <p>Download</p> <i className="ri-login-box-line"></i>
                      </li>
                      <li
                        onClick={() => {
                          clearInterval(this.timer);
                          clearInterval(this.timer2);
                          this.props.navigate("/user/settings", {
                            state: { authToken: this.state.authToken },
                          });
                        }}
                      >
                        Settings
                      </li>
                      <li
                        onClick={async (e) => {
                          clearInterval(this.timer);
                          clearInterval(this.timer2);
                          this.props.navigate("/", { state: { logout: true } });
                        }}
                      >
                        Log out
                      </li>
                    </ul>
                  </div>
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
                        type: this.state.searchTypeParam,
                        limit: 49,
                      },
                    };

                    await axios(optionsx).then(async (res) => {
                      //UUUUUU
                    });
                  }}
                >
                  Search
                </button>
              </div>
              <div id="search-cat-div-x" className="x-hor-div">
                <button
                  className="cat-div-x-active-u-non-button cat-div-x-active-u-button"
                  id="c-all-u"
                  onClick={() => {
                    const btn = document.getElementById("c-all-u"); //cat-div-x-active-u-non-button

                    btn.classList.add("cat-div-x-active-u-button");

                    const btns = document.querySelectorAll(
                      ".cat-div-x-active-u-non-button"
                    );

                    btns.forEach((b) => {
                      if (b.id != btn.id) {
                        b.classList.remove("cat-div-x-active-u-button");
                      }
                    });

                    this.setState({
                      searchTypeParam: "track,artist,playlist,album",
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
                    btn.classList.add("cat-div-x-active-u-button");

                    const btns = document.querySelectorAll(
                      ".cat-div-x-active-u-non-button"
                    );

                    btns.forEach((b) => {
                      if (b.id != btn.id) {
                        b.classList.remove("cat-div-x-active-u-button");
                      }
                    });
                    this.setState({ searchTypeParam: "track" });
                  }}
                >
                  Songs
                </button>
                <button
                  className="cat-div-x-active-u-non-button"
                  id="c-artist-u"
                  onClick={() => {
                    const btn = document.getElementById("c-artist-u"); //cat-div-x-active-u-non-button
                    btn.classList.add("cat-div-x-active-u-button");
                    const btns = document.querySelectorAll(
                      ".cat-div-x-active-u-non-button"
                    );

                    btns.forEach((b) => {
                      if (b.id != btn.id) {
                        b.classList.remove("cat-div-x-active-u-button");
                      }
                    });

                    this.setState({ searchTypeParam: "artist" });
                  }}
                >
                  Artist
                </button>

                <button
                  className="cat-div-x-active-u-non-button"
                  id="c-playlists-u"
                  onClick={() => {
                    const btn = document.getElementById("c-playlists-u"); //cat-div-x-active-u-non-button
                    btn.classList.add("cat-div-x-active-u-button");
                    const btns = document.querySelectorAll(
                      ".cat-div-x-active-u-non-button"
                    );

                    btns.forEach((b) => {
                      if (b.id != btn.id) {
                        b.classList.remove("cat-div-x-active-u-button");
                      }
                    });

                    this.setState({ searchTypeParam: "playlist" });
                  }}
                >
                  Playlists
                </button>

                <button
                  className="cat-div-x-active-u-non-button"
                  id="c-albums-u"
                  onClick={() => {
                    const btn = document.getElementById("c-albums-u"); //cat-div-x-active-u-non-button
                    btn.classList.add("cat-div-x-active-u-button");
                    const btns = document.querySelectorAll(
                      ".cat-div-x-active-u-non-button"
                    );

                    btns.forEach((b) => {
                      if (b.id != btn.id) {
                        b.classList.remove("cat-div-x-active-u-button");
                      }
                    });

                    this.setState({ searchTypeParam: "album" });
                  }}
                >
                  Albums
                </button>
              </div>
              <div className="x-main-flex-div x-active-cat" style={{marginTop: "4rem"}}>
                {this.state.renderList ? (
                  <List
                    searchTypeParam={this.state.searchTypeParam}
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
            <img
              loading="lazy-load"
              id="corner-img-x"
              src={this.state.currentSongImage}
            ></img>

            <div className="x-ver-div corner-x-div corner-song-div">
              <marquee direction={"left"} id="corner-name-x">
                {this.state.currentSongName}
              </marquee>
              <p id="corner-artist-x">{this.state.currentSongArtist}</p>
            </div>
            <div
              className="x-ver-div corner-x-div"
              style={{
                position: "relative",
                zIndex: "4",
                marginTop: "0.3rem",
                marginLeft: "1.6rem",
                minWidth: "2rem",
              }}
              onClick={() => {
                const icon = document.getElementById("like-icon");

                if (icon.classList.contains("ri-heart-line")) {
                  icon.classList.remove("ri-heart-line");
                  icon.classList.add("ri-heart-fill");
                  icon.style.color = "#1ED760";

                  const idx = this.state.currentSongid;

                  const config = {
                    method: "PUT",
                    url: "https://api.spotify.com/v1/me/tracks",
                    headers: {
                      Authorization: "Bearer " + this.state.authToken,
                      "Content-Type": "application/json",
                    },
                    params: {
                      ids: idx,
                    },
                  };

                  axios(config)
                    .then((response) => {
                      try {
                        console.log("UWU-x");
                        const config = {
                          method: "get",
                          url: "https://api.spotify.com/v1/me/tracks",
                          headers: {
                            Authorization: "Bearer " + this.state.authToken,
                          },
                        };

                        axios(config)
                          .then((response) => {
                            console.log("UWU");
                            const tr_op = [];

                            var count_cc = 0;

                            response.data.items.forEach((element) => {
                              var str = "";
                              for (
                                var xx = 0;
                                xx < element.track.artists.length;
                                xx++
                              ) {
                                if (xx != element.track.artists.length - 1) {
                                  str += element.track.artists[xx].name + ", ";
                                } else {
                                  str += element.track.artists[xx].name;
                                }
                              }
                              let track_object = {
                                id: element.track.id,
                                name: element.track.name,
                                image: element.track.album.images[0].url,
                                albumuri: element.track.album.uri,
                                artists: str,
                                count_cc: count_cc++,
                              };
                              tr_op.push(track_object);

                              this.setState({ tracks: tr_op });
                            });
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      } catch (error) {
                        console.log(error);
                      }
                      // Handle success
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                } else {
                  icon.classList.add("ri-heart-line");
                  icon.classList.remove("ri-heart-fill");
                  icon.style.color = "white";

                  const idx = this.state.currentSongid;

                  const config = {
                    method: "DELETE",
                    url: "https://api.spotify.com/v1/me/tracks",
                    headers: {
                      Authorization: "Bearer " + this.state.authToken,
                      "Content-Type": "application/json",
                    },
                    params: {
                      ids: idx,
                    },
                  };

                  axios(config)
                    .then((response) => {
                      try {
                        console.log("UWU-x");
                        const config = {
                          method: "get",
                          url: "https://api.spotify.com/v1/me/tracks",
                          headers: {
                            Authorization: "Bearer " + this.state.authToken,
                          },
                        };

                        axios(config)
                          .then((response) => {
                            console.log("UWU");
                            const tr_op = [];

                            var count_cc = 0;

                            response.data.items.forEach((element) => {
                              var str = "";
                              for (
                                var xx = 0;
                                xx < element.track.artists.length;
                                xx++
                              ) {
                                if (xx != element.track.artists.length - 1) {
                                  str += element.track.artists[xx].name + ", ";
                                } else {
                                  str += element.track.artists[xx].name;
                                }
                              }
                              let track_object = {
                                id: element.track.id,
                                name: element.track.name,
                                image: element.track.album.images[0].url,
                                albumuri: element.track.album.uri,
                                artists: str,
                                count_cc: count_cc++,
                              };
                              tr_op.push(track_object);

                              this.setState({ tracks: tr_op });
                            });
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      } catch (error) {
                        console.log(error);
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }
              }}
            >
              <p>
                <i
                  id="like-icon"
                  className="ri-heart-line"
                  style={{ fontSize: "1.5rem" }}
                ></i>
              </p>
            </div>

            <div className="x-hor-div"></div>

            <WebPlayback
              secondsToMinutesSeconds={this.secondsToMinutesSeconds}
              currentTrackDurationSec={this.state.currentTrackDurationSec}
              currentTrackDuration={this.state.currentTrackDuration}
              currentTrackDurationNegative={
                this.state.currentTrackDurationNegative
              }
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
              {/* <svg id="v-muted" role="presentation" height="16" width="16" aria-hidden="true" aria-label="Volume off"  viewBox="0 0 16 16" data-encore-id="icon" className="Svg-sc-ytk21e-0 haNxPq"><path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"></path><path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path></svg> */}
              <svg
                id="v-unmuted"
                role="presentation"
                height="16"
                width="16"
                aria-hidden="true"
                aria-label="Volume medium"
                viewBox="0 0 16 16"
                data-encore-id="icon"
                className="Svg-sc-ytk21e-0 haNxPq"
              >
                <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 0 0 0-8.474v1.65a2.999 2.999 0 0 1 0 5.175v1.649z"></path>
              </svg>

              <input
                type="range"
                min={-1}
                max={101}
                step={1}
                className="player-volume-controller"
                onInput={(e) => {
                  this.setState({ volume: Number(e.target.value) / 100 });
                  const rangeInput = document.getElementById("p-x-c");
                  rangeInput.value = e.target.value;
                  rangeInput.click();
                  console.log(this.state.volume);
                }}
              ></input>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export function LikedTracksPageWithRouter(props) {
  const navigate = useNavigate();

  const location = useLocation();
  console.log(location.state);
  if (
    location.state.playlist != null &&
    location.state.playlist.authToken != null
  ) {
    console.log("token = " + location.state.playlist.authToken);
    return (
      <LikedTracksPage
        navigate={navigate}
        albumid_x={location.state.playlist.id}
        token={location.state.playlist.authToken}
      ></LikedTracksPage>
    );
  } else {
    console.log("PLayList Page State Error");
    navigate("/");
  }
}

export default LikedTracksPage;
