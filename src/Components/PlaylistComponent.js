import React from "react";
import { useNavigate } from "react-router";
import "../CSS/TrackCard.css";
import "../CSS/MainPage.css"
import { Helmet } from "react-helmet";
import axios from "axios";



class PlayList extends React.Component {
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

export function PlaylistWithRouter(props) {
    /*
        description;
        id;
        images[x].url;
        name;
        uri;
    

        tracksList => 

        const axiosInstance = axios.create({
              //   headers: {
              //     Authorization: "Bearer " + this.state.authToken,
              //   },
              // });

              // axiosInstance.get(`${response.data.items[0].tracks.href}`)
              // .then((response) => {
              //   console.log("G_U_G");
              //   console.log(response)
              //   //data.items[x].track
              // })
    
    */
  const navigate = useNavigate();
  return <PlayList artist={props.artist} authToken={props.token} albumuri={props.albumuri} setSongId={props.setSongId} navigate={navigate} id={props.id} name={props.name} img={props.img} desc={props.desc}></PlayList>;
}

export default PlayList;
