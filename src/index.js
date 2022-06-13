import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import "semantic-ui-css/semantic.min.css";
// import App from './hello/App';
// import App from './hello-again/App';
// import App from './expense-tracker/App';
// import App from './todos/App';
// import App from './food-order-app/App';
// import App from './blog-comments/App';
// import App from './seasons/App';
// import App from './pics-search/App';
// import App from './widgets/accordion-widget/App'
// import App from './widgets/wikipedia-search-widget/App'
// import App from './widgets/dropdown-widget/App'
// import App from './widgets/translate-widget/App'
// import App from './widgets/App';
// import App from './youtube-app/App';

import App from './react-redux/streams-client/App';

/*
// ------------------Redux - related index.js --------------------------
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import App from './react-redux/blogs/App';
import reducers from './react-redux/blogs/reducers';

// import App from './react-redux/counters/App';
// import reducers from './react-redux/counters/reducers';

// import App from "./react-redux/songs/App";
// import reducers from "./react-redux/songs/reducers";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStore(reducers, applyMiddleware(thunk))}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
// ------------------------------------------------------------------------

*/


// Without reducx index.js

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
