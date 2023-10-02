import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import "../CSS/MainPage.css";
import axios from "axios";
import List from "../Components/TracksListComponent";
import "../Scripts/mainpage_script";
import "../CSS/WebPlayback.css"
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
            trackImg: '',
            trackTitle: '',
            trackArtists: '',
        }


    }

    componentDidMount = async () => {
        const options = {
            method: "GET",
            url: `https://api.spotify.com/v1/tracks/${this.state.trackId}`,
            headers: {
                Authorization: "Bearer " + this.state.authToken,
            }
        }

        await axios(options).then(async (response) => {
            this.setState({ trackImg: response.data.album.images[0].url });
            this.setState({ trackUri: response.data.uri });
            this.setState({ trackTitle: response.data.name });

            var str = "";

            for (
                var xx = 0;
                xx < response.data.artists.length;
                xx++
            ) {
                if (xx != response.data.artists.length - 1) {
                    str += response.data.artists[xx].name + ", ";
                } else {
                    str += response.data.artists[xx].name;
                }
            }
            this.setState({ trackArtists: str });

        }).catch((error) => {
            console.log(error);
        })



    }


    componentDidUpdate = async (nextProps) => {
        if (this.props != nextProps) {
            const options = {
                method: "GET",
                url: `https://api.spotify.com/v1/tracks/${this.state.trackId}`,
                headers: {
                    Authorization: "Bearer " + this.state.authToken,
                }
            }
    
            await axios(options).then(async (response) => {
                this.setState({ trackImg: response.data.album.images[0].url });
                this.setState({ trackUri: response.data.uri });
                this.setState({ trackTitle: response.data.name });
    
                var str = "";
    
                for (
                    var xx = 0;
                    xx < response.data.artists.length;
                    xx++
                ) {
                    if (xx != response.data.artists.length - 1) {
                        str += response.data.artists[xx].name + ", ";
                    } else {
                        str += response.data.artists[xx].name;
                    }
                }
                this.setState({ trackArtists: str });
    
            }).catch((error) => {
                console.log(error);
            })
        }
    }


    render() {
        return (
            <>
                <div className="track-show-div-wrapper x-border">
                    <div className=".track-show-div-ver">

                    </div>
                    <div className=".track-show-div-ver">
                        <span>Song</span>
                        <p className="title-label-x">{this.state.trackTitle}</p>
                        <p className="artist-label-x">{this.state.trackTitle}</p>

                    </div>
                    <div className=".track-show-div-hor">
                        <div className="btn-wrapper-div">
                            <div id={this.state.id} className="play-btn" onClick={this.handlechanhes}>
                                <i
                                    class={"ri-play-fill"}
                                ></i>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
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