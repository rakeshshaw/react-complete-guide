import { Route, Router, Switch } from "react-router-dom";
// import { BrowserRouter } from "react-router-dom";
import Header from "./components/layout/Header";
import StreamCreate from "./components/streams/StreamCreate";
import StreamDelete from "./components/streams/StreamDelete";
import StreamEdit from "./components/streams/StreamEdit";
import StreamList from "./components/streams/StreamList";
import StreamShow from "./components/streams/StreamShow";
import history from "./history";

//55808694388-s8ns7jgm8ohce5laitqvjir6jbn6tg5s.apps.googleusercontent.com

const App = () => {
  return (
    <div>
      {/* <BrowserRouter> */}
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={StreamList} />
            <Route path="/streams/new" exact component={StreamCreate} />
            <Route path="/streams/edit/:id" exact component={StreamEdit} />
            <Route path="/streams/delete/:id" exact component={StreamDelete} />
            <Route path="/streams/show/:id" exact component={StreamShow} />
          </Switch>
        </div>
        {/* </BrowserRouter> */}
      </Router>
    </div>
  );
};

export default App;
