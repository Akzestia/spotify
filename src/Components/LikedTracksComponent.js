import React from "react";
import { TrackinLibWithRouter } from "./TrackInLibComponent";
import { forEach } from "lodash";
import { TrackCardWithRouter } from "./TrackCardComponent";


class LikedTracksList extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount(){
      console.log(this.props.ListMAP)
    }
  
    render() {
  
      if (this.props.ListMAP.length > 0) {
       return this.props.ListMAP.map((e) => {
            return (
              <TrackinLibWithRouter
                setSongId={this.props.setSongId}
                key={e.id + e.count_cc}
                name={e.name}
                albumuri={e.albumuri}
                id={e.id}
                img={e.image}
                artist={e.artists}
                token={this.props.token}
              ></TrackinLibWithRouter>
            );
          });
       
      } else {
        return <div></div>;
      }
    }
  }
  
  export default LikedTracksList;
  