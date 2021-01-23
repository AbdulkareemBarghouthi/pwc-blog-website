import "../styles/globals.css";
import axios from "axios";
import {getUser} from '../helpers/auth';

axios.interceptors.request.use(function (config) {
  config.url = `http://127.0.0.1:2400${config.url}`;
  if(typeof localStorage !== 'undefined' && localStorage.getItem("token")){
    config.headers.authorization = 'bearer ' + localStorage.getItem("token");
  }
  return config;
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
