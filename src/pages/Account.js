import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import Helmet from "react-helmet";
import "../CSS/MainPage.css";
import TrackCard from "../Components/TrackCardComponent";
import axios from "axios";
import { useEffect, useState } from "react";
import List from "../Components/TracksListComponent";
import "../Scripts/mainpage_script";
import "media-chrome";
import { debounce } from "lodash";
import WebPlayback from "../Components/WepPLayback";
import { Buffer } from "buffer";





export function AccountPageWithRouter(props) {
    const navigate = useNavigate();
  
    const location = useLocation();

    return;
}