import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import Helmet from "react-helmet";
import "../CSS/MainPage.css";
import TrackCard from "../Components/TrackCardComponent";
import axios from "axios";
import { useEffect, useState } from "react";
import List from "../Components/TracksListComponent";
import "../Scripts/mainpage_script";
import { useParams } from 'react-router-dom';
import "media-chrome";
import { debounce } from "lodash";
import WebPlayback from "../Components/WepPLayback";
import { Buffer } from "buffer";

export function SeachResultWithNavigate(props) {
  const [tracklist, setTracklist] = useState([]);
  const params = useParams();

  const location = useLocation();

  var list = location.state.tracklist;

  return (
    <div style={{color: "white"}}>
      <h1>Tracklist</h1>
      <ul>
        {list.map((e) => (
          <li key={e.id + e.count_cc}>{e.name}</li>
        ))}
      </ul>
    </div>
  );
}
