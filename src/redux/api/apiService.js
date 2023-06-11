//External Lib Import
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//Internal Lib Import
import { userLogin, userLogout } from '../features/authReducer';
import { setLoading } from '../features/settingReducer';

//constant env variable
const SERVER_URL = process.env.REACT_APP_API_SERVER_URL;
const API_PREFIX_PATH = process.env.REACT_APP_API_PREFIX_PATH;

const baseQuery = fetchBaseQuery({
    baseUrl: SERVER_URL + API_PREFIX_PATH,
    prepareHeaders: (headers, { getState }) => {
        const {
            setting: { language },
            auth: { accessToken },
        } = getState();
        headers.set('authorization', accessToken ? `Bearer ${accessToken}` : '');
        headers.set('accept-language', language);
        return headers;
    },
    mode: 'cors',
    // credentials: 'include',
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    api.dispatch(setLoading(true));
    let result = await baseQuery(args, api, extraOptions);
    const { error, data } = result;

    // if (error) {
    //     api.dispatch(setLoading(false));

    //     if (error.status === 401) {
    //         // try to get a new token
    //         const refreshResult = await baseQuery(`/auth/refreshTokens`, api, extraOptions);

    //         if (refreshResult?.data?.status) {
    //             // store the new token
    //             api.dispatch(userLogin(refreshResult?.data?.data?.accessToken));

    //             // retry the initial query
    //             result = await baseQuery(args, api, extraOptions);
    //         } else {
    //             api.dispatch(userLogout());
    //         }
    //     }
    // }

    if (data) {
        api.dispatch(setLoading(false));
    }

    return result;
};

export const apiService = createApi({
    reducerPath: 'api-v2',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
});
