//External Lib Import
import axios from 'axios';

//constant env variable
const SERVER_URL = process.env.REACT_APP_API_SERVER_URL;
const API_PREFIX_PATH = process.env.REACT_APP_API_PREFIX_PATH;
const SHUNNO_STORAGE_SERVER_URL = process.env.REACT_APP_SHUNNO_STORAGE_SERVER_URL;
const SHUNNO_STORAGE_PREFIX_PATH = process.env.REACT_APP_SHUNNO_STORAGE_PREFIX_PATH;

export default axios.create({
    baseURL: SERVER_URL + API_PREFIX_PATH,
    headers: { 'Content-Type': 'application/json' },
});

export const axiosPrivate = axios.create({
    baseURL: SERVER_URL + API_PREFIX_PATH,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
});

export const axioShunnoStorage = axios.create({
    baseURL: SHUNNO_STORAGE_SERVER_URL + SHUNNO_STORAGE_PREFIX_PATH,
    headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${process.env.REACT_APP_SHUNNO_STORAGE_API_KEY}`
    }
})
