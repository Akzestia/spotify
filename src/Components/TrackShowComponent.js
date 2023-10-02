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
import PlayList, {PlaylistWithRouter} from "../Components/PlaylistComponent";





export function TracShowComponentWithRouter(props) {
    const navigate = useNavigate();
  
    const location = useLocation();
  
    if (location.state.authToken != null) {
      return (
        <MainPage navigate={navigate} token={location.state.authToken}></MainPage>
      );
    } else {
      console.log("TOKEN BAD");
      navigate("/");
    }
  }
  
  export default MainPage;