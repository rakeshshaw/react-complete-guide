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
// import App from './translate-context/App';
// import App from './users/App';

// Without reducx index.js
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );


// ------------------Redux - related index.js --------------------------
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// import App from './react-redux/books/App';
// import reducers from './react-redux/books/reducers';

// import App from './react-redux/streams-client/App';
// import reducers from './react-redux/streams-client/reducers';

// import App from './react-redux/blogs/App';
// import reducers from './react-redux/blogs/reducers';

import App from './react-redux/counters/App';
import reducers from './react-redux/counters/reducers';

// import App from "./react-redux/songs/App";
// import reducers from "./react-redux/songs/reducers";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
// const store = createStore(reducers, applyMiddleware(thunk));
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
// ------------------------------------------------------------------------
