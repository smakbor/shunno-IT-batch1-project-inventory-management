//External Lib Import
import { createSlice } from '@reduxjs/toolkit';

//Internal Lib Import
import SessionHelper from '../../helpers/SessionHelper';

const authReducer = createSlice({
    name: 'authReducer',
    initialState: {
        accessToken: SessionHelper.getAccessToken(),
        currentUser: undefined,
    },
    reducers: {
        userLogin: (state, action) => {
            SessionHelper.setAccessToken(action.payload.accessToken);
            state.accessToken = SessionHelper.getAccessToken();
            state.currentUser = action.payload.user
        },
        userLogout: (state, _action) => {
            SessionHelper.removeTokens();
            SessionHelper.removeActiveStore()
            state.accessToken = undefined;
            state.currentUser = undefined;
        },
    },
});

export const { userLogin, userLogout } = authReducer.actions;

export default authReducer.reducer;
