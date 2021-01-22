import "../styles/globals.css";
import axios from "axios";

axios.interceptors.request.use(function (config) {
  config.url = "http://127.0.0.1:2400"+config.url;
  return config;
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
