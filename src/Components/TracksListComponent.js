import React from "react";
import { TrackCardWithRouter } from "./TrackCardComponent";
import { forEach } from "lodash";

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    if (this.props.ListMAP.length > 0) {
     return this.props.ListMAP.map((e) => {
          return (
            <TrackCardWithRouter
              setSongId={this.props.setSongId}
              key={e.id + e.count_cc}
              name={e.name}
              albumuri={e.albumuri}
              id={e.id}
              img={e.image}
              artist={e.artists}
              token={this.props.token}
            ></TrackCardWithRouter>
          );
        });
     
    } else {
      return <div></div>;
    }
  }
}

export default List;
