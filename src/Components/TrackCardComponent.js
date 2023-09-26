


import React from "react";
import { useNavigate } from "react-router";
import '../CSS/TrackCard.css'

class TrackCard extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            title: props.title.slice(0, 12) + "...",
            desc: props.desc.slice(0, 35) + "..."
        }

    }


    render(){
        return(
            <div className="main-card-div">
                <img src="https://cdn.myanimelist.net/images/anime/1571/134525.jpg"></img>
                <p className="x-p-title">{this.state.title}</p>
                <p className="x-p-artist">{this.state.desc}</p>
            </div>
        )
    }
}


export function TrackCardWithRouter(props) {
    const navigate = useNavigate();
  
    return <TrackCard navigate={navigate}></TrackCard>;
  }
  
  export default TrackCard;
  