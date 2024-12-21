import axios from "axios";
import { API_BASEURL } from "../constants";

const wishlistAxios = axios.create({
  baseURL: API_BASEURL,
  withCredentials: true,
});

export { wishlistAxios };
