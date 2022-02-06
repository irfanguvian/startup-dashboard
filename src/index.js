import "react-app-polyfill/stable";
import "core-js";
import React from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import axios from "axios";
import APIAdapter from "./lib/api";
import swal from "sweetalert2";

const env = {
  API_URL: process.env.REACT_APP_API_URL,
};

const diHash = {
  axios,
  env,
  localStorage,
  swal,
  useHistory,
};

const apiAdapter = new APIAdapter(diHash);
diHash.apiAdapter = apiAdapter;

apiAdapter.resetDiReferenceBatch(diHash);
apiAdapter.resetVarBatch();
apiAdapter.Authentication();

ReactDOM.render(
  <Provider store={store}>
    <App diHash={diHash} />
  </Provider>,
  document.getElementById("root"),
);

