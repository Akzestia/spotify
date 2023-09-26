


import React from "react";
import { useNavigate } from "react-router";

class TrackCard extends React.Component{
    constructor(props){
        super(props)

        this.state = {

        }
    }


    render(){
        return(
            <div className="main-card-div">

            </div>
        )
    }
}


export function TrackCardWithRouter(props) {
    const navigate = useNavigate();
  
    return <TrackCard navigate={navigate}></TrackCard>;
  }
  
  export default TrackCard;
  