import axios from "axios";
import { API_BASEURL } from "@/features/reviews/constants";

const reviewsAxios = axios.create({
  baseURL: API_BASEURL,
  withCredentials: true,
});

export { reviewsAxios };
