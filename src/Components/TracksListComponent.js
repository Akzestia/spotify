import React from "react";
import { TrackCardWithRouter } from "./TrackCardComponent";

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    };

  }

  componentDidUpdate(nextProps) {
    if (nextProps != this.props) {
      this.setState({ list: nextProps.ListMAP });
    }
  }

  componentDidMount () {

  }


  render() {
    if (this.state.list.length > 0) {
      return this.state.list.map((e) => {
        return (
          <TrackCardWithRouter
            setSongId={this.props.setSongId}
            key={e.id}
            name={e.name}
            id={e.id}
            img={e.image}
            desc={
              'I will add the OP "LIES GOES ON" by May\'n and ED "faky merry game" by Smile Princess of Liar Liar ライアー・ライアー as soon as they are available on Spotify!'
            }
          ></TrackCardWithRouter>
        );
      });
    } else {
      return <div></div>;
    }
  }
}

export default List;
