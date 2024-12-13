import axios from "axios";
import { API_BASEURL } from "../constants";

const checkoutAxios = axios.create({
  baseURL: API_BASEURL,
  withCredentials: true,
});

export { checkoutAxios };
