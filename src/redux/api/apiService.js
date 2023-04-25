//External Lib Import
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const SERVER_URL = process.env.REACT_APP_API_SERVER_URL || 'http://localhost:8080';
const API_PREFIX_PATH = process.env.REACT_APP_API_PREFIX_PATH || 'api/v1';

const baseQuery = fetchBaseQuery({
    baseUrl: SERVER_URL + API_PREFIX_PATH,
    prepareHeaders: (headers, { getState }) => {
        const {
            setting: { language },
            auth: { accessToken, refreshToken },
        } = getState();
        headers.set('authorization', accessToken ? `Bearer ${accessToken}` : '');
        headers.set('accept-language', language);
        return headers;
    },
});

export const apiService = createApi({
    reducerPath: API_PREFIX_PATH,
    baseQuery: async (args, api, extraOptions) => {
        let result = await baseQuery(args, api, extraOptions);

        if (result?.error?.status === 401) {
        }
        return result;
    },
    tagTypes: [],
    endpoints: (builder) => ({}),
});
