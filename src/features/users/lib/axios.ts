import axios from "axios";
import { API_BASEURL } from "../constants";

const usersAxios = axios.create({
  baseURL: API_BASEURL,
  withCredentials: true,
});

export { usersAxios };
