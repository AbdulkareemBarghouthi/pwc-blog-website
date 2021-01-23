import "../styles/globals.css";
import axios from "axios";
import {getUser} from '../helpers/auth';

axios.interceptors.request.use(function (config) {
  config.url = "http://127.0.0.1:2400"+config.url;
  if(typeof localStorage !== 'undefined'){
    config.headers.authorization = 'bearer ' + JSON.parse(localStorage.getItem("token")).token;
  }
  return config;
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
