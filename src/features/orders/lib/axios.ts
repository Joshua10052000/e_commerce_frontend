import axios from "axios";
import { API_BASEURL } from "../constants";

const orderAxios = axios.create({
  baseURL: API_BASEURL,
  withCredentials: true,
});

export { orderAxios };
