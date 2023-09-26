import React from "react";
import { useNavigate } from "react-router";
import Helmet from 'react-helmet'
import "../CSS/MainPage.css";
import ScriptJs from '../Scripts/mainpage_script'

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <div className="main-div">
          <div className="content-div x-hor-div">
            <div className="x-ver-div">
              <div className="sn-div-side x-border"></div>
              <div className="sx-div-side x-border"></div>
            </div>
            <div className="sn-div-main x-border">
              <div
                style={{
                  height: "30rem",
                  width: "20rem",
                  backgroundColor: "aqua",
                  margin: "2rem",
                }}
              ></div>
              <div
                style={{
                  height: "30rem",
                  width: "20rem",
                  backgroundColor: "aqua",
                  margin: "2rem",
                }}
              ></div>
              <div
                style={{
                  height: "30rem",
                  width: "20rem",
                  backgroundColor: "aqua",
                  margin: "2rem",
                }}
              ></div>
              <div
                style={{
                  height: "30rem",
                  width: "20rem",
                  backgroundColor: "aqua",
                  margin: "2rem",
                }}
              ></div>
              <div
                style={{
                  height: "30rem",
                  width: "20rem",
                  backgroundColor: "aqua",
                  margin: "2rem",
                }}
              ></div>
              <div
                style={{
                  height: "30rem",
                  width: "20rem",
                  backgroundColor: "aqua",
                  margin: "2rem",
                }}
              ></div>
              <div
                style={{
                  height: "30rem",
                  width: "20rem",
                  backgroundColor: "aqua",
                  margin: "2rem",
                }}
              ></div>
              <div
                style={{
                  height: "30rem",
                  width: "20rem",
                  backgroundColor: "aqua",
                  margin: "2rem",
                }}
              ></div>
              <div
                style={{
                  height: "30rem",
                  width: "20rem",
                  backgroundColor: "aqua",
                  margin: "2rem",
                }}
              ></div>
              <div
                style={{
                  height: "30rem",
                  width: "20rem",
                  backgroundColor: "aqua",
                  margin: "2rem",
                }}
              ></div>
              <div
                style={{
                  height: "30rem",
                  width: "20rem",
                  backgroundColor: "aqua",
                  margin: "2rem",
                }}
              ></div>
              <div
                style={{
                  height: "30rem",
                  width: "20rem",
                  backgroundColor: "aqua",
                  margin: "2rem",
                }}
              ></div>
              <div
                style={{
                  height: "30rem",
                  width: "20rem",
                  backgroundColor: "aqua",
                  margin: "2rem",
                }}
              ></div>
              <div
                style={{
                  height: "30rem",
                  width: "20rem",
                  backgroundColor: "aqua",
                  margin: "2rem",
                }}
              ></div>
              <div
                style={{
                  height: "30rem",
                  width: "20rem",
                  backgroundColor: "aqua",
                  margin: "2rem",
                }}
              ></div>
            </div>
          </div>
          <div className="media-player-div">
            <audio controls>
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>

        <Helmet>
           <ScriptJs></ScriptJs>
        </Helmet>
      </>
    );
  }
}

export function MainPageWithRouter(props) {
  const navigate = useNavigate();

  return <MainPage navigate={navigate}></MainPage>;
}

export default MainPage;
