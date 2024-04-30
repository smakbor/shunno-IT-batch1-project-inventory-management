//External Lib Import
import axios from 'axios';

import config from '../../config';

//constant env variable
const SERVER_URL = config.API_URL;

export default axios.create({
    baseURL: SERVER_URL,
    headers: { 'Content-Type': 'application/json' },
});

export const axiosPrivate = axios.create({
    baseURL: SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const axioShunnoStorage = axios.create({
    baseURL: SERVER_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
        // authorization: `Bearer ${shunnoStorageKey}`,
    },
});
