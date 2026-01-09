import axios from "axios";
import { BaseUrls } from "../baseUrls";
export const axiosInstance = axios.create({
  baseURL: BaseUrls,
  withCredentials: true,
});
