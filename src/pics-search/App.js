import React from "react";
import unsplash from "./api/unsplash";
import ImageList from "./components/ImageList/ImageList";
import SearchBar from "./components/SearchBar";

// const App = () => {
//     return (
//         <div className="ui container" style={{marginTop: '10px'}}>
//             <SearchBar />
//         </div>
//      );
// }

class App extends React.Component {
  state = { images: [] };

  //   onSearchSubmit = () => {
  //     console.log("submitted");
  //     axios.get("http://localhost:8081/trb/public/team-details/rashaw11@in.ibm.com/").then(
  //       (response) => {
  //         console.log(response.data);
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );

  //     axios.interceptors.request.use(config => {
  //         // log a message before any HTTP request is sent
  //         console.log('Request was sent');

  //         return config;
  //       });

  //       // sent a GET request
  //       axios.get('http://localhost:8081/trb/public/team-details/rashaw11@in.ibm.com/')
  //         .then(response => {
  //           console.log(response.data);
  //         });

  // };

  onSearchSubmit = async (term) => {
    // axios
    //   .get("https://api.unsplash.com/search/photos", {
    //     params: { query: term },
    //     headers: {
    //       Authorization:
    //         "Client-ID 2b98c1afb0aed3b3d94a1866bdc3ac013d21a0c86d236a0fee32355c331c0296",
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response.data.results);
    //   });

    const response = await unsplash.get("/search/photos", {
      params: { query: term },
    });

    console.log(response.data.results);
    this.setState({ images: response.data.results });
  };

  render() {
    return (
      <div className="ui container" style={{ marginTop: "10px" }}>
        <SearchBar onSubmit={this.onSearchSubmit} />
        <ImageList images={this.state.images} />
      </div>
    );
  }
}

export default App;
