import "../styles/globals.css";
import axios from "axios";
import { useRouter } from 'next/router';
import { useEffect } from "react";

axios.interceptors.request.use(function (config) {
  config.url = `https://blog-api-pwc.herokuapp.com${config.url}`;
  if(typeof localStorage !== 'undefined' && localStorage.getItem("token")){
    config.headers.authorization = 'bearer ' + localStorage.getItem("token");
  }
  return config;
});

function MyApp({ Component, pageProps }) {

  return <Component {...pageProps} />;
}

export default MyApp;
