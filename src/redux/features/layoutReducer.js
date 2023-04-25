//External Lib Import
import { createSlice } from '@reduxjs/toolkit';

//Internal Lib Import
import * as layoutConstants from '../../constants/layout';
import SessionHelper from '../../helpers/SessionHelper';

const defaultLayout = {
    layoutType: layoutConstants.LAYOUT_VERTICAL,
    layoutColor: layoutConstants.LAYOUT_COLOR_LIGHT,
    layoutWidth: layoutConstants.LAYOUT_WIDTH_FLUID,
    leftSideBarTheme: layoutConstants.LEFT_SIDEBAR_THEME_DARK,
    leftSideBarType: layoutConstants.LEFT_SIDEBAR_TYPE_FIXED,
    showRightSidebar: true,
};

window.addEventListener('load', () => SessionHelper.initLayout(defaultLayout));

const layoutReducer = createSlice({
    name: 'layoutReducer',
    initialState: SessionHelper.getLayout() || defaultLayout,
    reducers: {
        changeLayout: (state, action) => {
            state.layoutType = action.payload;
            SessionHelper.setLayout({ ...state, layoutType: action.payload });
        },
        changeLayoutColor: (state, action) => {
            state.layoutColor = action.payload;
            SessionHelper.setLayout({ ...state, layoutColor: action.payload });
        },
        changeLayoutWidth: (state, action) => {
            state.layoutWidth = action.payload;
            SessionHelper.setLayout({ ...state, layoutWidth: action.payload });
        },
        changeSidebarTheme: (state, action) => {
            state.leftSideBarTheme = action.payload;
            SessionHelper.setLayout({ ...state, leftSideBarTheme: action.payload });
        },
        changeSidebarType: (state, action) => {
            state.leftSideBarType = action.payload;
            SessionHelper.setLayout({ ...state, leftSideBarType: action.payload });
        },
        showRightSidebar: (state, action) => {
            state.showRightSidebar = true;
            document.querySelector('body').classList.add('end-bar-enabled');
            SessionHelper.setLayout({ ...state, showRightSidebar: action.payload });
        },
        hideRightSidebar: (state, action) => {
            state.showRightSidebar = false;
            document.querySelector('body').classList.remove('end-bar-enabled');
            SessionHelper.setLayout({ ...state, showRightSidebar: action.payload });
        },
    },
});

export const {
    changeLayout,
    changeLayoutColor,
    changeLayoutWidth,
    changeSidebarTheme,
    changeSidebarType,
    showRightSidebar,
    hideRightSidebar,
} = layoutReducer.actions;
export default layoutReducer.reducer;
