import React from "react";
import { useNavigate } from "react-router";
import "../CSS/TrackCard.css";
import { Helmet } from "react-helmet";
import ScriptJs from "../Scripts/TrackCardScript";

class TrackCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.name != null ? props.name.slice(0, 12) + "..." : '',
      desc: props.desc != null ? props.desc.slice(0, 35) + "..." : '',
      id: this.props.id,
      playState: 'play',
    };

    this.handlechanhes = this.handlechanhes.bind(this);
  }

  handlechanhes = () =>{
    this.props.setSongId(this.state.id);
    this.state.playState == 'pause' ? this.setState({playState: 'play'}) : this.setState({playState: 'pause'});
  }

  render() {
    // Lime
    return (
      <>
        <div className="main-card-div">
          <img src={this.props.img}></img>
          <p className="x-p-title">{this.state.title}</p>
          <p className="x-p-artist">{this.state.desc}</p>
          <div id={this.state.id} className="play-btn" onClick={this.handlechanhes}>
            <i
              class={"ri-" + this.state.playState + "-fill"}
              
            ></i>
          </div>
        </div>

        <Helmet>
          <ScriptJs></ScriptJs>
        </Helmet>
      </>
    );
  }
}

export function TrackCardWithRouter(props) {
  const navigate = useNavigate();
  return <TrackCard setSongId={props.setSongId} navigate={navigate} id={props.id} name={props.name} img={props.img} desc={props.desc}></TrackCard>;
}

export default TrackCard;
