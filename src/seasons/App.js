import React from "react";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

/*
const App = () => {
  window.navigator.geolocation.getCurrentPosition(
    (position) => console.log(position),
    (err) => console.log(err)
  );
  return (
    <div>
      <SeasonDisplay />
    </div>
  );
};
*/

class App extends React.Component {
  state = { lat: null, errorMessage: "" };
  // constructor(props) {
  //   super(props);
  //   this.state = { lat: null, errorMessage: "" };
  // }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.log(position);
        this.setState({ lat: position.coords.latitude });
      },
      (err) => {
        // console.log(err);
        this.setState({ errorMessage: err.message });
      }
    );
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat)
      return <div>Error: {this.state.errorMessage}</div>;
    if (!this.state.errorMessage && this.state.lat)
      return <SeasonDisplay lat={this.state.lat} />;
    return <Spinner message="Please accept location request..." />;
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default App;
