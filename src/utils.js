import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://industrial-auth-api.fly.dev",
    timeout: 1000,
    headers: {'Access-Control-Allow-Origin': '*'}
});