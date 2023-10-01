import React from "react";
import { useNavigate } from "react-router";
import "../CSS/TrackCard.css";
import "../CSS/MainPage.css";
import { Helmet } from "react-helmet";
import axios from "axios";

class PlayList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.name != null ? props.name : "",
      desc: props.desc != null ? props.desc : "",
      id: this.props.id,
      img: this.props.url,
      albumuri: props.uri,
      token: props.authToken,
      artists: "songs",
      authToken: props.authToken,
    };

    this.handlechanhes = this.handlechanhes.bind(this);
  }

  componentDidMount() {

  }

  handlechanhes = async () => {
    await this.props.setSongId(
      this.state.id,
      this.state.title,
      this.state.img,
      this.state.desc,
      this.state.albumuri
    );
  };

  render() {
    // Lime
    return (
      <>
         <div className="main-card-div-lib" style={{marginRight: "1rem"}} onClick={(e) =>{
          console.log(e.target.tagName + e.target.id)
          if(e.target.tagName !== 'I' && e.target.id !== this.state.id){
            if(this.state.id == '9999999999'){
                this.props.navigate(`/likedtracks/${this.state.title}`, {state: {playlist: this.state}})
            }
            else{
                this.props.navigate(`/playlist/${this.state.title}`, {state: {playlist: this.state}})
            }
            
          }
        }}>
          <div className="x-ver-div x-justify-center">
            {this.state.img == "" ? (
              <svg
                role="img"
                height="24"
                width="24"
                aria-hidden="true"
                data-testid="playlist"
                class="Svg-sc-ytk21e-0 haNxPq"
                viewBox="0 0 24 24"
                data-encore-id="icon"
              >
                <path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z"></path>
              </svg>
            ) : (
              <img
                loading="lazy-load"
                alt="spotify-track-img"
                src={this.state.img}
              ></img>
            )}
          </div>
          <div className="x-ver-div x-justify-center">
            <p className="x-p-title-lib">
              {this.state.title.length > 12
                ? this.state.title.slice(0, 12) + "..."
                : this.state.title}
            </p>
            <p className="x-p-artist-lib">
              Playlist •{" "}
              {this.state.artists.length > 30
                ? this.state.artists.slice(0, 30) + "..."
                : this.state.artists}
            </p>
          </div>
        </div>
      </>
    );
  }
}

export function PlaylistWithRouter(props) {
  const navigate = useNavigate();
  return (
    <PlayList
      description={props.description}
      authToken={props.authToken}
      id={props.id}
      url={props.url}
      navigate={navigate}
      name={props.name}
      uri={props.uri}
      href={props.href}
    ></PlayList>
  );
}

export default PlayList;
