// axios instance for the base URL
import axios from "axios";

const instance = axios.create({
  baseURL: "https://mycustomburger.firebaseio.com/",
});

export default instance;
