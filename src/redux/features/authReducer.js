//External Lib Import
import { createSlice } from '@reduxjs/toolkit';

//Internal Lib Import
import SessionHelper from '../../helpers/SessionHelper';

const authReducer = createSlice({
    name: 'authReducer',
    initialState: {
        accessToken: SessionHelper.getAccessToken(),
    },
    reducers: {
        userLogin: (state, action) => {
            SessionHelper.setAccessToken(action.payload);
            state.accessToken = SessionHelper.getAccessToken();
        },
        userLogout: (state, _action) => {
            SessionHelper.removeTokens();
            state.accessToken = undefined;
        },
    },
});

export const { userLogin, userLogout } = authReducer.actions;

export default authReducer.reducer;
