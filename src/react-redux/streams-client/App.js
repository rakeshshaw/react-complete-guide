import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import StreamCreate from "./components/streams/StreamCreate";
import StreamDelete from "./components/streams/StreamDelete";
import StreamEdit from "./components/streams/StreamEdit";
import StreamList from "./components/streams/StreamList";
import StreamShow from "./components/streams/StreamShow";

//55808694388-s8ns7jgm8ohce5laitqvjir6jbn6tg5s.apps.googleusercontent.com

const App = () => {
  return (
    <div>
      
      <BrowserRouter>
      
        <div>
        <Header />
          <Route path="/" exact component={StreamList} />
          <Route path="/streams/new" exact component={StreamCreate} />
          <Route path="/streams/edit" exact component={StreamEdit} />
          <Route path="/streams/delete" exact component={StreamDelete} />
          <Route path="/streams/show" exact component={StreamShow} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
