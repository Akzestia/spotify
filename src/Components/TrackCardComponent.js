import React from "react";
import { useNavigate } from "react-router";
import "../CSS/TrackCard.css";

class TrackCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.name != null ? props.name : '',
      desc: props.desc != null ? props.desc: '',
      id: this.props.id,
      img: this.props.img,
      albumuri: props.albumuri,
      token: props.authToken,
      artists: props.artist,
    };

    this.handlechanhes = this.handlechanhes.bind(this);
  }

  componentDidMount(){
    // console.log("PROPS")
    // console.log(this.props)
  }
  
  handlechanhes = async () =>{
    await this.props.setSongId(this.state.id, this.state.title, this.state.img, this.state.desc, this.state.albumuri);
  }



  render() {
    // Lime
    return (
      <>
        <div className="main-card-div" onClick={(e) =>{
          console.log(e.target.tagName + e.target.id)
          if(e.target.tagName !== 'I' && e.target.id !== this.state.id){
            this.props.navigate(`/track/${this.state.title}`, {state: {song: this.state}})
          }
        }}>
          <img loading="lazy-load" alt="spotify-track-img" src={this.state.img}></img>
          <p className="x-p-title">{this.state.title.length > 12 ? this.state.title.slice(0, 12) + "..." :  this.state.title}</p>
          <p className="x-p-artist">{this.state.artists.length > 30 ? this.state.artists.slice(0, 30) + "..." : this.state.artists}</p>
          <div id={this.state.id} className="play-btn" onClick={this.handlechanhes}>
            <i
              class={"ri-play-fill"}
            ></i>
          </div>
        </div>
      </>
    );
  }
}

export function TrackCardWithRouter(props) {
  const navigate = useNavigate();
  return <TrackCard artist={props.artist} authToken={props.token} albumuri={props.albumuri} setSongId={props.setSongId} navigate={navigate} id={props.id} name={props.name} img={props.img} desc={props.desc}></TrackCard>;
}

export default TrackCard;
