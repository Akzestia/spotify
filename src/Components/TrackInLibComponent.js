import React from "react";
import { useNavigate } from "react-router";
import "../CSS/TrackCard.css";
import "../CSS/MainPage.css"



class TrackCardLib extends React.Component {
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
  }
  
  handlechanhes = async () =>{
    await this.props.setSongId(this.state.id, this.state.title, this.state.img, this.state.desc, this.state.albumuri);
  }



  render() {
    // Lime
    return (
      <>
        <div className="main-card-div-lib" style={{marginRight: "1rem"}} onClick={(e) =>{
          console.log(e.target.tagName + e.target.id)
          if(e.target.tagName !== 'I' && e.target.id !== this.state.id){
            this.props.navigate(`/playlist/${this.state.title}`, {state: {song: this.state}})
          }
        }}>
          <div className="x-ver-div x-justify-center" >
            <img loading="lazy-load" alt="spotify-track-img" src={this.state.img}></img>
          </div>
          <div className="x-ver-div x-justify-center" >
            <p className="x-p-title-lib">{this.state.title.length > 12 ? this.state.title.slice(0, 12) + "..." :  this.state.title}</p>
            <p className="x-p-artist-lib">Playlist  • {this.state.artists.length > 30 ? this.state.artists.slice(0, 30) + "..." : this.state.artists}</p>
          </div>
         </div>
      </>
    );
  }
}

export function TrackinLibWithRouter(props) {
  const navigate = useNavigate();
  return <TrackCardLib artist={props.artist} authToken={props.token} albumuri={props.albumuri} setSongId={props.setSongId} navigate={navigate} id={props.id} name={props.name} img={props.img} desc={props.desc}></TrackCardLib>;
}

export default TrackCardLib;
