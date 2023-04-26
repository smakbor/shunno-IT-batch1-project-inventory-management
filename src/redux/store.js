//external lib import
import { configureStore } from '@reduxjs/toolkit';

//internal lib import
import { apiService } from './api/apiService';

import authReducer from './features/authReducer';
import layoutReducer from './features/layoutReducer';
import settingReducer from './features/settingReducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
        layout: layoutReducer,
        setting: settingReducer,
        [apiService.reducerPath]: apiService.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiService.middleware),
});

export default store;
