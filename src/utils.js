import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://3000-dmacinto-appdev2finalpr-0rq5isd9k08.ws-us90.gitpod.io/",
    timeout: 1000,
    headers: {'Access-Control-Allow-Origin': '*'}
});