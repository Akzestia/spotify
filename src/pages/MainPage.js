


import React from "react";
import { useNavigate } from "react-router";

class MainPage extends React.Component{

    constructor(props){
        super(props)

        this.state = {

        }
    }

    render(){
        return(
            <div>
                <p>Hello</p>
            </div>
        )
    }
}


export function MainPageWithRouter(props){

    const navigate = useNavigate();

    return(<MainPage navigate={navigate}></MainPage>)
}

export default MainPage;