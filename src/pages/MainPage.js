import React from "react";
import { useLocation, useNavigate } from "react-router";
import Helmet from "react-helmet";
import "../CSS/MainPage.css";
import ScriptJs from "../Scripts/mainpage_script";
import TrackCard from "../Components/TrackCardComponent";
import axios from "axios";
import { useEffect, useState } from "react";
import List from '../Components/TracksListComponent'

const client_id = "16a2505a2a24488a875f183c93c76089";
const client_secret = "6fbef267aa9a46bd915fbd9cc63d37a3";


class MainPage extends React.Component {
  baseUrl = "https://api.spotify.com/v1/episodes/q=512ojhOuo1ktJprKbVcKyQ";

  constructor(props) {
    super(props);

    this.state = {
      currentSongid: "5UB5NtHsXFA4DK7gqOsIra",
      authToken: "",
      tracks: [],
      searchString: ''
    };

    this.setSongId = this.setSongId.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  setSongId = (id) => {



    if(id != this.state.currentSongid){
        this.setState({ currentSongid: id });

        setTimeout(() =>{
            const player = document.getElementById('xx-U-xx');
    
            console.log(player.paused )
            player.play();
            player.loop = true;
            player.continuous = true
        
        }, 750)
    }
    else{
        const player = document.getElementById('xx-U-xx');
    
        player.paused ? player.play() : player.pause();

        player.loop = true;
        player.continuous = true
        
    }

   
  
  };

  componentDidMount() {}


  onClick = (new_array) =>{
    const array = new_array.slice();
    this.setState({tracks: array})
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
                    <i class="ri-bill-fill"></i> Library {this.state.tracks.length}
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
            <button className="btn-x-lib-navigate" style={{marginLeft: "1.4rem",marginTop: "1.4rem"}}>
                    <i class="ri-arrow-left-s-line"></i>
                  </button>
            <button className="btn-x-lib-navigate" style={{marginLeft: "0.4rem", marginTop: "1.4rem"}}>
                    <i class="ri-arrow-right-s-line"></i>
                  </button>
                  <input className="x-scarlet-input" placeholder={'Search...'} id="search-input" type="text"
                    onChange={(e) => {
                        this.setState({searchString: e.target.value})
                    }}
                  >

                  </input>
                    </div>
              <div className="x-main-flex-div">

                <List ListMAP={this.state.tracks}  setSongId={this.setSongId}></List>

              </div>
            </div>
          </div>
          <div className="media-player-div">
            <spotify-audio id="xx-U-xx" controls src={"https://open.spotify.com/track/" + this.state.currentSongid}
            ></spotify-audio>
          </div>
        </div>

        <button id="x-x">Play</button>

        <button
          onClick={() => {
            axios
              .get("https://api.spotify.com/v1/tracks/1cAU2LwAyO2DDg6cVAoW3A", {

                headers: {
                    
                    
                  Authorization: `Bearer ${this.props.token}`,
                },
              })
              .then((res) => {
                console.log(res);
              });
          }}
        >
          Click
        </button>

        <button
          onClick={() => {
            axios
              .get("https://api.spotify.com/v1/search", {
                headers: {
                  Authorization: `Bearer ${this.props.token}`,
                },
                params: {
                  q: this.state.searchString,//
                  type: "track",
                  limit: 49,
                },
              })
              .then((res) => {
                console.log(res)
                const x_new_array = []
                res.data.tracks.items.forEach(element => {
                    console.log(element.id)
                    console.log(element.name)
                    console.log(element.album.images[0])
                    let track_object = {id: element.id, name: element.name, image: element.album.images[0].url}
                    x_new_array.push(track_object)
                }); 
                this.onClick(x_new_array)
              })
          }}
        >
          Search
        </button>

        <Helmet>
          <script
            src="https://open.spotify.com/embed-podcast/iframe-api/v1"
            async
          ></script>
          <script type="module" src="https://cdn.jsdelivr.net/npm/spotify-audio-element@0.1/+esm"></script>
          <ScriptJs></ScriptJs>
        </Helmet>
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
