//external lib import
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ToastMessage from '../../helpers/ToastMessage';
import { setLogout } from '../features/authReducer';
import { setLoading } from '../features/settingReducer';

const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/v1' });

const basefetchBaseQuery = createApi({
    tagTypes: ['profile'],
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/v1',
        prepareHeaders: (headers, { getState }) => {
            const {
                settingReducer: { language },
                authReducer: { tokens },
            } = getState();
            headers.set('authorization', tokens?.accessToken ? `Bearer ${tokens?.accessToken}` : '');
            headers.set('accept-language', language);
            return headers;
        },
    }),
    endpoints: (builder) => ({}),
});

export const rtkQueryErrorLogger = (api) => (next) => (action) => {
    api.dispatch(setLoading(true));

    if (isRejectedWithValue(action)) {
        api.dispatch(setLoading(false));
        if (action.payload.status === 401) {
            ToastMessage.errorMessage(action?.payload?.data?.message);
            api.dispatch(setLogout());
        } else if (action.payload.status === 404) {
            ToastMessage.errorMessage(action?.payload?.data?.message);
        } else if (action.payload.status === 400) {
            ToastMessage.errorMessage(action?.payload?.data?.message);
        } else {
            ToastMessage.errorMessage('Sorry, Something went wrong');
        }
    }
    return next(action);
};

export default basefetchBaseQuery;
