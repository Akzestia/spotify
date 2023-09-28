import React from "react";
import { useNavigate } from "react-router";
import "../CSS/TrackCard.css";
import { Helmet } from "react-helmet";
import axios from "axios";
const authToken = "BQDTZgngQlKR_N8YIrnq1BInHM2q9rEMxT0AsTKQo6-8CcB1375Mqj3q8PSx3cSVamfuZRiDb23xbTOTXg4k1uE_CzNsMwS-HDgYD97DBoJoeNi5xKh7rSwZRos-RpdIptevSApoV15-9qhYatJCs-xFOdKCkN5WpDQychaXZUtVq6_Y3y68ct8TEMkAKzqX10FZX81l_sIT74B9vEoeYdkvCWMkEtRY"


class TrackCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.name != null ? props.name : '',
      desc: props.desc != null ? props.desc: '',
      id: this.props.id,
      img: this.props.img,
      albumuri: props.albumuri
    };

    this.handlechanhes = this.handlechanhes.bind(this);
  }

  componentDidMount(){
    console.log("PROPS")
    console.log(this.props)
  }
  
  handlechanhes = () =>{
    this.props.setSongId(this.state.id, this.state.title, this.state.img, this.state.desc, this.state.albumuri);

    const tracks = document.querySelectorAll('.main-card-div');
    let x = 0;
    tracks.forEach((element) =>{
      if(element.children[3].id != this.state.id){
        if(element.children[3].children[0].classList.contains('ri-pause-fill')){
          element.children[3].children[0].classList.remove('ri-pause-fill');
          element.children[3].children[0].classList.add('ri-play-fill')
        }
      }
      else{
        if(element.children[3].children[0].classList.contains('ri-pause-fill')){
          element.children[3].children[0].classList.remove('ri-pause-fill');
          element.children[3].children[0].classList.add('ri-play-fill')
        }
        else{
          element.children[3].children[0].classList.add('ri-pause-fill');
          element.children[3].children[0].classList.remove('ri-play-fill')
        }
      }
     
    });
  }



  render() {
    // Lime
    return (
      <>
        <div className="main-card-div">
          <img alt="spotify-track-img" src={this.state.img}></img>
          <p className="x-p-title">{this.state.title.slice(0, 12) + "..."}</p>
          <p className="x-p-artist">{this.state.desc.slice(0, 35) + "..."}</p>
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
  return <TrackCard albumuri={props.albumuri} setSongId={props.setSongId} navigate={navigate} id={props.id} name={props.name} img={props.img} desc={props.desc}></TrackCard>;
}

export default TrackCard;
