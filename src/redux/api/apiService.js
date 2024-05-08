//External Lib Import
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//Internal Lib Import
import { userLogin, userLogout } from '../features/authReducer';
import { setLoading } from '../features/settingReducer';
import config from '../../config';

//constant env variable

const baseQuery = fetchBaseQuery({
    baseUrl: `http://10.0.0.52:5000/api`,
    mode: 'cors', // Enable CORS here
    prepareHeaders(headers, { getState }) {
        console.log(getState());
        const token = getState().auth.accessToken;
        if (token) headers.set('Authorization', 'Bearer ' + token);
        return headers;
    },
});

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//     api.dispatch(setLoading(true));
//     let result = await baseQuery(args, api, extraOptions);
//     const { error, data } = result;

//     // if (error) {
//     //     api.dispatch(setLoading(false));

//     //     if (error.status === 401) {
//     //         // try to get a new token
//     //         const refreshResult = await baseQuery(`/auth/refreshTokens`, api, extraOptions);

//     //         if (refreshResult?.data?.status) {
//     //             // store the new token
//     //             api.dispatch(userLogin(refreshResult?.data?.data?.accessToken));

//     //             // retry the initial query
//     //             result = await baseQuery(args, api, extraOptions);
//     //         } else {
//     //             api.dispatch(userLogout());
//     //         }
//     //     }
//     // }

//     if (data) {
//         api.dispatch(setLoading(false));
//     }

//     return result;
// };

export const apiService = createApi({
    reducerPath: 'api-v2',
    baseQuery: baseQuery,
    endpoints: () => ({}),
});
