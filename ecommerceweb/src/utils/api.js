import axios from "axios";
import { BASEURL } from './../BaseURLs';

const api = axios.create({
    baseURL: `${BASEURL}/api/v3.2`,
    withCredentials: true
});

export default api;