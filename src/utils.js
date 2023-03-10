import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://appdev2-final-project-api.fly.dev/",
    timeout: 1000,
    headers: {'Access-Control-Allow-Origin': '*'}
});