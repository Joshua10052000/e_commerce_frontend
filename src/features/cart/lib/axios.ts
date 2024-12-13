import axios from "axios";

import { API_BASEURL } from "@/features/cart/constants";

const cartAxios = axios.create({ baseURL: API_BASEURL, withCredentials: true });

export { cartAxios };
