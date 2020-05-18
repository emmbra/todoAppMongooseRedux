import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
// Provider controls the overall state
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";

import App from "./containers/App";

// managers of state
import reducers from "./reducers";

// enables Redux Dev Tools extension in browser
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// creates the store with 3 parameters:
// 1. all reducers combined into one
// 2. any state that we want pre-loaded on page refresh
// 3. any middleware we want to use with redux
const store = createStore(
  reducers,
  // this preloads the user token so on page refresh they stay signed in
  { auth: { authenticated: localStorage.getItem('token')}},
  composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
