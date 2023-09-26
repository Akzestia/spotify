import React from "react";
import { useNavigate } from "react-router";
import Helmet from "react-helmet";
import "../CSS/MainPage.css";
import ScriptJs from "../Scripts/mainpage_script";
import TrackCard from "../Components/TrackCardComponent";
import axios from "axios";
import { useEffect, useState } from "react";

const CLIENT_ID = "16a2505a2a24488a875f183c93c76089";
const REDIRECT_URI = "http://localhost:3000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

class MainPage extends React.Component {
  baseUrl = "https://api.spotify.com/v1/episodes/q=512ojhOuo1ktJprKbVcKyQ";

  constructor(props) {
    super(props);

    this.state = {};
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
                    <i class="ri-bill-fill"></i> Library
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
              <div className="x-main-flex-div">
                <TrackCard
                  title={"Liar Liar ライアー・ライアー"}
                  desc={
                    'I will add the OP "LIES GOES ON" by May\'n and ED "faky merry game" by Smile Princess of Liar Liar ライアー・ライアー as soon as they are available on Spotify!'
                  }
                ></TrackCard>
                <TrackCard
                  title={"Liar Liar ライアー・ライアー"}
                  desc={
                    'I will add the OP "LIES GOES ON" by May\'n and ED "faky merry game" by Smile Princess of Liar Liar ライアー・ライアー as soon as they are available on Spotify!'
                  }
                ></TrackCard>
                <TrackCard
                  title={"Liar Liar ライアー・ライアー"}
                  desc={
                    'I will add the OP "LIES GOES ON" by May\'n and ED "faky merry game" by Smile Princess of Liar Liar ライアー・ライアー as soon as they are available on Spotify!'
                  }
                ></TrackCard>
                <TrackCard
                  title={"Liar Liar ライアー・ライアー"}
                  desc={
                    'I will add the OP "LIES GOES ON" by May\'n and ED "faky merry game" by Smile Princess of Liar Liar ライアー・ライアー as soon as they are available on Spotify!'
                  }
                ></TrackCard>
                <TrackCard
                  title={"Liar Liar ライアー・ライアー"}
                  desc={
                    'I will add the OP "LIES GOES ON" by May\'n and ED "faky merry game" by Smile Princess of Liar Liar ライアー・ライアー as soon as they are available on Spotify!'
                  }
                ></TrackCard>
                <TrackCard
                  title={"Liar Liar ライアー・ライアー"}
                  desc={
                    'I will add the OP "LIES GOES ON" by May\'n and ED "faky merry game" by Smile Princess of Liar Liar ライアー・ライアー as soon as they are available on Spotify!'
                  }
                ></TrackCard>
                <TrackCard
                  title={"Liar Liar ライアー・ライアー"}
                  desc={
                    'I will add the OP "LIES GOES ON" by May\'n and ED "faky merry game" by Smile Princess of Liar Liar ライアー・ライアー as soon as they are available on Spotify!'
                  }
                ></TrackCard>
                <TrackCard
                  title={"Liar Liar ライアー・ライアー"}
                  desc={
                    'I will add the OP "LIES GOES ON" by May\'n and ED "faky merry game" by Smile Princess of Liar Liar ライアー・ライアー as soon as they are available on Spotify!'
                  }
                ></TrackCard>
                <TrackCard
                  title={"Liar Liar ライアー・ライアー"}
                  desc={
                    'I will add the OP "LIES GOES ON" by May\'n and ED "faky merry game" by Smile Princess of Liar Liar ライアー・ライアー as soon as they are available on Spotify!'
                  }
                ></TrackCard>
                <TrackCard
                  title={"Liar Liar ライアー・ライアー"}
                  desc={
                    'I will add the OP "LIES GOES ON" by May\'n and ED "faky merry game" by Smile Princess of Liar Liar ライアー・ライアー as soon as they are available on Spotify!'
                  }
                ></TrackCard>
                <TrackCard
                  title={"Liar Liar ライアー・ライアー"}
                  desc={
                    'I will add the OP "LIES GOES ON" by May\'n and ED "faky merry game" by Smile Princess of Liar Liar ライアー・ライアー as soon as they are available on Spotify!'
                  }
                ></TrackCard>
                <TrackCard
                  title={"Liar Liar ライアー・ライアー"}
                  desc={
                    'I will add the OP "LIES GOES ON" by May\'n and ED "faky merry game" by Smile Princess of Liar Liar ライアー・ライアー as soon as they are available on Spotify!'
                  }
                ></TrackCard>
                <TrackCard
                  title={"Liar Liar ライアー・ライアー"}
                  desc={
                    'I will add the OP "LIES GOES ON" by May\'n and ED "faky merry game" by Smile Princess of Liar Liar ライアー・ライアー as soon as they are available on Spotify!'
                  }
                ></TrackCard>
                <TrackCard
                  title={"Liar Liar ライアー・ライアー"}
                  desc={
                    'I will add the OP "LIES GOES ON" by May\'n and ED "faky merry game" by Smile Princess of Liar Liar ライアー・ライアー as soon as they are available on Spotify!'
                  }
                ></TrackCard>
                <TrackCard
                  title={"Liar Liar ライアー・ライアー"}
                  desc={
                    'I will add the OP "LIES GOES ON" by May\'n and ED "faky merry game" by Smile Princess of Liar Liar ライアー・ライアー as soon as they are available on Spotify!'
                  }
                ></TrackCard>
                <TrackCard
                  title={"Liar Liar ライアー・ライアー"}
                  desc={
                    'I will add the OP "LIES GOES ON" by May\'n and ED "faky merry game" by Smile Princess of Liar Liar ライアー・ライアー as soon as they are available on Spotify!'
                  }
                ></TrackCard>
                <TrackCard
                  title={"Liar Liar ライアー・ライアー"}
                  desc={
                    'I will add the OP "LIES GOES ON" by May\'n and ED "faky merry game" by Smile Princess of Liar Liar ライアー・ライアー as soon as they are available on Spotify!'
                  }
                ></TrackCard>
                <TrackCard
                  title={"Liar Liar ライアー・ライアー"}
                  desc={
                    'I will add the OP "LIES GOES ON" by May\'n and ED "faky merry game" by Smile Princess of Liar Liar ライアー・ライアー as soon as they are available on Spotify!'
                  }
                ></TrackCard>
                <TrackCard
                  title={"Liar Liar ライアー・ライアー"}
                  desc={
                    'I will add the OP "LIES GOES ON" by May\'n and ED "faky merry game" by Smile Princess of Liar Liar ライアー・ライアー as soon as they are available on Spotify!'
                  }
                ></TrackCard>
                <TrackCard
                  title={"Liar Liar ライアー・ライアー"}
                  desc={
                    'I will add the OP "LIES GOES ON" by May\'n and ED "faky merry game" by Smile Princess of Liar Liar ライアー・ライアー as soon as they are available on Spotify!'
                  }
                ></TrackCard>
                <TrackCard
                  title={"Liar Liar ライアー・ライアー"}
                  desc={
                    'I will add the OP "LIES GOES ON" by May\'n and ED "faky merry game" by Smile Princess of Liar Liar ライアー・ライアー as soon as they are available on Spotify!'
                  }
                ></TrackCard>
                <TrackCard
                  title={"Liar Liar ライアー・ライアー"}
                  desc={
                    'I will add the OP "LIES GOES ON" by May\'n and ED "faky merry game" by Smile Princess of Liar Liar ライアー・ライアー as soon as they are available on Spotify!'
                  }
                ></TrackCard>
                <TrackCard
                  title={"Liar Liar ライアー・ライアー"}
                  desc={
                    'I will add the OP "LIES GOES ON" by May\'n and ED "faky merry game" by Smile Princess of Liar Liar ライアー・ライアー as soon as they are available on Spotify!'
                  }
                ></TrackCard>
                <TrackCard
                  title={"Liar Liar ライアー・ライアー"}
                  desc={
                    'I will add the OP "LIES GOES ON" by May\'n and ED "faky merry game" by Smile Princess of Liar Liar ライアー・ライアー as soon as they are available on Spotify!'
                  }
                ></TrackCard>
                <TrackCard
                  title={"Liar Liar ライアー・ライアー"}
                  desc={
                    'I will add the OP "LIES GOES ON" by May\'n and ED "faky merry game" by Smile Princess of Liar Liar ライアー・ライアー as soon as they are available on Spotify!'
                  }
                ></TrackCard>
                <TrackCard
                  title={"Liar Liar ライアー・ライアー"}
                  desc={
                    'I will add the OP "LIES GOES ON" by May\'n and ED "faky merry game" by Smile Princess of Liar Liar ライアー・ライアー as soon as they are available on Spotify!'
                  }
                ></TrackCard>
                <TrackCard
                  title={"Liar Liar ライアー・ライアー"}
                  desc={
                    'I will add the OP "LIES GOES ON" by May\'n and ED "faky merry game" by Smile Princess of Liar Liar ライアー・ライアー as soon as they are available on Spotify!'
                  }
                ></TrackCard>
                <TrackCard
                  title={"Liar Liar ライアー・ライアー"}
                  desc={
                    'I will add the OP "LIES GOES ON" by May\'n and ED "faky merry game" by Smile Princess of Liar Liar ライアー・ライアー as soon as they are available on Spotify!'
                  }
                ></TrackCard>
                <TrackCard
                  title={"Liar Liar ライアー・ライアー"}
                  desc={
                    'I will add the OP "LIES GOES ON" by May\'n and ED "faky merry game" by Smile Princess of Liar Liar ライアー・ライアー as soon as they are available on Spotify!'
                  }
                ></TrackCard>
                <TrackCard
                  title={"Liar Liar ライアー・ライアー"}
                  desc={
                    'I will add the OP "LIES GOES ON" by May\'n and ED "faky merry game" by Smile Princess of Liar Liar ライアー・ライアー as soon as they are available on Spotify!'
                  }
                ></TrackCard>
                <TrackCard
                  title={"Liar Liar ライアー・ライアー"}
                  desc={
                    'I will add the OP "LIES GOES ON" by May\'n and ED "faky merry game" by Smile Princess of Liar Liar ライアー・ライアー as soon as they are available on Spotify!'
                  }
                ></TrackCard>
                <TrackCard
                  title={"Liar Liar ライアー・ライアー"}
                  desc={
                    'I will add the OP "LIES GOES ON" by May\'n and ED "faky merry game" by Smile Princess of Liar Liar ライアー・ライアー as soon as they are available on Spotify!'
                  }
                ></TrackCard>
                <TrackCard
                  title={"Liar Liar ライアー・ライアー"}
                  desc={
                    'I will add the OP "LIES GOES ON" by May\'n and ED "faky merry game" by Smile Princess of Liar Liar ライアー・ライアー as soon as they are available on Spotify!'
                  }
                ></TrackCard>
              </div>
            </div>
          </div>
          <div className="media-player-div">
            <iframe
              src="https://open.spotify.com/embed/track/6DKOg6giLDYNgwvEaSjg2A?utm_source=generator"
              allowfullscreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <button
          onClick={() => {
            axios
              .get("https://api.spotify.com/v1/search", {
                headers: {
                  Authorization: `Bearer ${this.props.token}`,
                },
                params: {
                  q: " Liar Liar ライアー・ライアー",
                  type: "track",
                },
              })
              .then((res) => {
                res.data.tracks.items.forEach(element => {
                    console.log(element.id)
                });
              });
          }}
        >
          Click
        </button>


        <button
          onClick={() => {
            axios
              .get("https://api.spotify.com/v1/tracks/1cAU2LwAyO2DDg6cVAoW3A", {
                headers: {
                  Authorization: `Bearer ${this.props.token}`,
                }
              })
              .then((res) => {
                console.log(res);
              });
          }}
        >
          Click
        </button>

        <div id="embed-iframe"></div>

        <Helmet>
          <ScriptJs></ScriptJs>
          <script
            src="https://open.spotify.com/embed-podcast/iframe-api/v1"
            async
          ></script>

          
        </Helmet>
      </>//1cAU2LwAyO2DDg6cVAoW3A
    );
  }
}

export function MainPageWithRouter(props) {
  const navigate = useNavigate();

  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  return <MainPage navigate={navigate} token={token}></MainPage>;
}

export default MainPage;
