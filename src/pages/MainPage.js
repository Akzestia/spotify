import React from "react";
import { useNavigate } from "react-router";
import Helmet from "react-helmet";
import "../CSS/MainPage.css";
import ScriptJs from "../Scripts/mainpage_script";
import TrackCard from "../Components/TrackCardComponent";
import axios from "axios";

class MainPage extends React.Component {
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
                    <i class="ri-search-line"></i>  Search
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
                  <button className="btn-x-lib-navigate" style={{marginLeft: 0}}>
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
            <iframe src="https://open.spotify.com/embed/track/5UB5NtHsXFA4DK7gqOsIra?utm_source=generator"  allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
          </div>
        </div>

        <Helmet>
          <ScriptJs></ScriptJs>
        </Helmet>
      </>
    );
  }
}

export function MainPageWithRouter(props) {
  const navigate = useNavigate();

  return <MainPage navigate={navigate}></MainPage>;
}

export default MainPage;
