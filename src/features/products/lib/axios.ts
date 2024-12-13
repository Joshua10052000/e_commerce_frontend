import axios from "axios";

import { API_BASEURL } from "@/features/products/constants";

const productsAxios = axios.create({ baseURL: API_BASEURL });

export { productsAxios };
