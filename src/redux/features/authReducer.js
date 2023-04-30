//external lib import
import { createSlice } from '@reduxjs/toolkit';

//internal lib import
import SessionHelper from '../../helpers/SessionHelper';

const authReducer = createSlice({
    name: 'authReducer',
    initialState: {
        accessToken: SessionHelper.getAccessToken() || undefined,
        refreshToken: SessionHelper.getRefreshToken() || undefined,
    },
    reducers: {
        setLogin: (state, action) => {
            SessionHelper.setAccessToken(action.payload.accessToken);
            SessionHelper.setRefreshToken(action.payload.refreshToken);
            state.accessToken = SessionHelper.getAccessToken() || undefined;
            state.refreshToken = SessionHelper.getRefreshToken() || undefined;
        },
        setLogout: (state, action) => {
            SessionHelper.removeTokens();
            state.accessToken = undefined;
            state.refreshToken = undefined;
        },
    },
});

export const { setLogin, setLogout } = authReducer.actions;

export default authReducer.reducer;
