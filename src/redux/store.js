//External Lib Import
import { configureStore } from '@reduxjs/toolkit';

//Internal Lib Import
import { apiService } from './api/apiService';

import authReducer from './features/authReducer';
import layoutReducer from './features/layoutReducer';
import settingReducer from './features/settingReducer';

const store = configureStore({
    reducer: {
        [apiService.reducerPath]: apiService.reducer,
        auth: authReducer,
        layout: layoutReducer,
        setting: settingReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiService.middleware),
});

export default store;
