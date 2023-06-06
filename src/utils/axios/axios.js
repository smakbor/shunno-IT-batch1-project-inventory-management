//External Lib Import
import axios from 'axios';

//constant env variable
const SERVER_URL = process.env.REACT_APP_API_SERVER_URL;
const API_PREFIX_PATH = process.env.REACT_APP_API_PREFIX_PATH;

export default axios.create({
    baseURL: SERVER_URL + API_PREFIX_PATH,
    headers: { 'Content-Type': 'application/json' },
});

export const axiosPrivate = axios.create({
    baseURL: SERVER_URL + API_PREFIX_PATH,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
});
