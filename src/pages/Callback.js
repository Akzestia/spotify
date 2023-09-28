
import React, { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import "../CSS/MainPage.css";
import axios from "axios";
import "../Scripts/mainpage_script";
import "media-chrome";
import { Buffer } from "buffer";




export function Callback(props) {

    const navigate = useNavigate();
    const location = useLocation();
  
    const params = new URLSearchParams(location.search);
    const codeParam = params.get("code");
  
    var code = codeParam;

  
    const SPOTIFY_CLIENT_ID='d78104bf9e7c41edb529b1d1207e96db'
    const SPOTIFY_CLIENT_SECRET='fb96c81dbac746dbaab4c919a37415b5'
  
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        code,
        redirect_uri: "http://localhost:3000/callback",
        grant_type: "authorization_code",
      },
    };
    

   

        useEffect(() =>{
          let accessToken = null;
          axios(authOptions)
            .then((response) => {
              accessToken = response.data.access_token;
              console.log("TOKEN SSSSSSSSss= " + accessToken)
              navigate('/mainpage', {state:{authToken: accessToken}})
            })
            .catch((error) => {
              console.log(error);
              console.log("ERROR");
            });
        })
   
    return(
      <div><h1 style={{color: "white"}}>CALLBACK</h1></div>
    )
}
  