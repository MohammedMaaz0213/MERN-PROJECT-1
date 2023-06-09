import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { legacy_createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App";

import reducers from "./reducers";
import "./index.css";
const store = legacy_createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="123076393967-kos2bmppq1u6ja9k50bnr3hhhnkasqcq.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
    ;
  </Provider>,
  document.getElementById("root")
);
