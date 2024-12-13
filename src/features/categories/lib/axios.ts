import axios from "axios";

import { API_BASEURL } from "@/features/categories/constants";

const categoryAxios = axios.create({
  baseURL: API_BASEURL,
  withCredentials: true,
});

export { categoryAxios };
