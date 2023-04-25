//External Lib Import
import { createSlice } from '@reduxjs/toolkit';

//Internal Lib Import
import SessionHelper from '../../helpers/SessionHelper';

const settingReducer = createSlice({
    name: 'settingReducer',
    initialState: {
        language: SessionHelper.getLanguage(),
        isLoading: false,
        customLoader: false,
    },
    reducers: {
        changeLanguage(state, action) {
            SessionHelper.setLanguage(action.payload);
            state.language = SessionHelper.getLanguage();
        },
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
        setCustomLoader(state, action) {
            state.customLoader = action.payload;
        },
    },
});

export const { changeLanguage, setLoading, setCustomLoader } = settingReducer.actions;

export default settingReducer.reducer;
