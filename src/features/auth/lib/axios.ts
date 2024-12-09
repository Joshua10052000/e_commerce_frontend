import axios from "axios";

import { API_BASEURL } from "@/features/auth/constants";

const authAxios = axios.create({ baseURL: API_BASEURL, withCredentials: true });

export { authAxios };
