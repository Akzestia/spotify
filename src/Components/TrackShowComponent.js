import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import "../CSS/MainPage.css";
import axios from "axios";
import List from "../Components/TracksListComponent";
import "../Scripts/mainpage_script";
import "media-chrome";
import WebPlayback from "../Components/WepPLayback";
import LikedTracksList from "../Components/LikedTracksComponent";
import PlayList_List from "../Components/PlaylistsLIST_Component";
import PlayList, { PlaylistWithRouter } from "../Components/PlaylistComponent";



class TrackShowComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authToken: this.props.token,
            trackId: this.props.id,
            trackUri: this.props.trackUri,
        }
    }
}



export function TrackShowComponentWithRouter(props) {
    const navigate = useNavigate();

    const location = useLocation();

    if (location.state.authToken != null) {
        return (
            <MainPage trackId={location.state.track.Id} 
            trackUri={location.state.track.uri}
            navigate={navigate} token={location.state.authToken}></MainPage>
        );
    } else {
        console.log("TOKEN BAD");
        navigate("/");
    }


}

export default MainPage;