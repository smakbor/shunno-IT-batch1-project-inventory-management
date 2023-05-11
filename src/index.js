//External Lib Import
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

//Internal Lib Import
import App from './App';
import ApiLoader from './components/common/ApiLoader';
import CustomLoader from './components/common/CustomLoader';
import './locales/i18n';
import store from './redux/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Provider store={store}>
            {/* <React.StrictMode> */}
            <App />
            <CustomLoader />
            <ApiLoader />
            {/* </React.StrictMode> */}
        </Provider>
        <ToastContainer />
    </>
);
