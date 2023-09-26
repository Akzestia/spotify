


import React from "react";
import { useNavigate } from "react-router";
import '../CSS/MainPage.css'

class MainPage extends React.Component{

    constructor(props){
        super(props)

        this.state = {

        }
    }

    render(){
        return(
            <div className="main-div">
                <div className="content-div">

                </div>
                <div className="media-player-div">
                    
                </div>
            </div>
        )
    }
}


export function MainPageWithRouter(props){

    const navigate = useNavigate();

    return(<MainPage navigate={navigate}></MainPage>)
}

export default MainPage;