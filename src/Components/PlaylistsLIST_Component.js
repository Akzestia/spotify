import PlayList, { PlaylistWithRouter }from "./PlaylistComponent";
import React from "react";



class PlayList_List extends React.Component {
  constructor(props) {
    super(props);
  }


  /*
    PlayList: {
        description;
        id;
        images[x].url;
        name;
        uri;
        tracks.href
    }
  */
 componentDidMount(){
    console.log('token = ' + this.props.token)
 }


  render() {
    if (this.props.ListMAP.length > 0) {
      return this.props.ListMAP.map((e) => {
        if((e.images.length > 0)){
            return (
                <PlaylistWithRouter
                    key={e.id + e.count_cc}
                  description={e.description}
                  authToken={this.props.token}
                  id={e.id}
                  url={e.images[0].url}
                  name={e.name}
                  uri={e.uri}
                  href={e.tracks.href}
                ></PlaylistWithRouter>
              );
        }
        else{
            return (
                <PlaylistWithRouter
                  description={e.description}
                  authToken={this.props.token}
                  id={e.id}
                  url={''}
                  name={e.name}
                  uri={e.uri}
                  href={e.tracks.href}
                ></PlaylistWithRouter>
              );
        }
       
      });
    } else {
      return <div></div>;
    }
  }
}

export default PlayList_List;
