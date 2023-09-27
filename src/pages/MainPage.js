import React from "react";
import { useLocation, useNavigate } from "react-router";
import Helmet from "react-helmet";
import "../CSS/MainPage.css";
import TrackCard from "../Components/TrackCardComponent";
import axios from "axios";
import { useEffect, useState } from "react";
import List from "../Components/TracksListComponent";
import "spotify-audio-element";
import '../Scripts/mainpage_script'

const client_id = "16a2505a2a24488a875f183c93c76089";
const client_secret = "6fbef267aa9a46bd915fbd9cc63d37a3";

class MainPage extends React.Component {
  baseUrl = "https://api.spotify.com/v1/episodes/q=512ojhOuo1ktJprKbVcKyQ";
  timer;
  constructor(props) {
    super(props);

    this.state = {
      currentSongid: "",
      authToken: "",
      tracks: [],
      searchString: "",
      time: 0,
      duration: 0,
      currentSongName: "",
    };

    this.setSongId = this.setSongId.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  setSongId = (id, name, img, author) => {

    try{
      const player = document.getElementById("xx-U-xx");
      if (id != this.state.currentSongid) {
        this.setState({ currentSongid: id });
  
        setTimeout(() => {
         
  
          console.log(player.paused);
          player.play();
          player.loop = true;
          player.continuous = true;
        
        }, 650);
      } else {
        player.paused ? player.play() : player.pause();
  
        player.loop = true;
        player.continuous = true;
      }
  
      const imagex = document.getElementById("corner-img-x");
      imagex.src = img;
      console.log("IAMGE" + img);
  
      document.querySelector(".media-player-div").style.display = "flex";
  
      clearInterval(this.timer);
  
      
      this.timer = setInterval(() => {
        this.setState({ time:  Math.round(player.currentTime)});
        if(this.state.duration != player.duration){
          this.setState({duration: Math.round(player.duration)})
        }
        
      }, 1);
  
     
  
      this.setState({currentSongName: name})
    }
    catch{
      this.setSongId(id, name, img, author);
    }
    
  };

  componentDidMount() {
    // const script = document.createElement("script");
    // script.src = "../Scripts/mainpage_script";
    // script.async = true;
    // document.body.appendChild(script);

    if (this.state.currentSongid === "") {
      document.querySelector(".media-player-div").style.display = "none";
    } else {
      document.querySelector(".media-player-div").style.display = "flex";
    }
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
                    {this.state.tracks.length}
                    <br></br>
                    {this.state.time}
                    <br></br>
                    {this.state.duration}
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
              </div>
            </div>
            <div className="sn-div-main x-border">
              <div className="x-hor-div" style={{}}>
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
                  }}
                ></input>

                <button id="x-x" style={{ height: "2rem" }} onClick={() =>{
                  this.setState({tracks: this.state.tracks})
                }}>
                  Play
                </button>

                <button
                  style={{ height: "2rem" }}
                  onClick={() => {
                    axios
                      .get("https://api.spotify.com/v1/search", {
                        headers: {
                          Authorization: `Bearer ${this.props.token}`,
                        },
                        params: {
                          q: this.state.searchString, //
                          type: "album",
                          limit: 49,
                        },
                      })
                      .then((res) => {
                        console.log(res);

                        //data.albums.items
                        //data.albums.items[i].images[0]
                        //data.albums.items[i].name

                        //compilation, album, album_type
                      });
                  }}
                >
                  Albums
                </button>

                <button
                  id="search-btn-x"
                  style={{ height: "2rem", display: 'none' }}
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
                        const x_new_array = [];
                        res.data.tracks.items.forEach((element) => {
                          let track_object = {
                            id: element.id,
                            name: element.name,
                            image: element.album.images[0].url,
                          };
                          x_new_array.push(track_object);
                        });
                        this.onClick(x_new_array);
                      });
                  }}
                >
                  Search
                </button>
              </div>
              <div className="x-main-flex-div">
                <List
                  ListMAP={this.state.tracks}
                  setSongId={this.setSongId}
                ></List>
              </div>
            </div>
          </div>
          <div className="media-player-div">
            <img id="corner-img-x"></img>

            <div className="x-ver-div corner-x-div">
              <p id="corner-name-x">{this.state.currentSongName}</p>
              <p id="corner-artist-x"></p>
            </div>

            <spotify-audio
              id="xx-U-xx"
              controls
              src={"https://open.spotify.com/track/" + this.state.currentSongid}
            ></spotify-audio>
          </div>
        </div>
      </> //1cAU2LwAyO2DDg6cVAoW3A
    );
  }
}

export function MainPageWithRouter(props) {
  const navigate = useNavigate();

  const location = useLocation();

  function getHashValue(key) {
    var matches = location.hash.match(new RegExp(key + "=([^&]*)"));
    return matches ? matches[1] : null;
  }

  if (getHashValue("access_token") != null) {
    return (
      <MainPage
        navigate={navigate}
        token={getHashValue("access_token")}
      ></MainPage>
    );
  } else {
    navigate("/authorization");
  }
}

export default MainPage;
