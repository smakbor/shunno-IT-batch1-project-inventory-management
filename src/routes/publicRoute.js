//external lib import
import { lazy } from 'react';

//internal lib import
import LazyLoad from '../components/common/LazyLoad';

// auth
const Login = lazy(() => import('../pages/account/Login'));
const Logout = lazy(() => import('../pages/account/Logout'));
const Register = lazy(() => import('../pages/account/Register'));
const Confirm = lazy(() => import('../pages/account/Confirm'));
const ForgetPassword = lazy(() => import('../pages/account/ForgetPassword'));
const LockScreen = lazy(() => import('../pages/account/LockScreen'));
const ForbiddenPage = lazy(() => import('../pages/error/ForbiddenPage'));
const ErrorPageNotFound = lazy(() => import('../pages/error/PageNotFound'));

const publicRoute = [
    {
        path: '/login',
        element: <LazyLoad component={Login} />,
    },
    {
        path: '/logout',
        element: <LazyLoad component={Logout} />,
    },
    {
        path: '/register',
        element: <LazyLoad component={Register} />,
    },
    {
        path: '/confirm',
        element: <LazyLoad component={Confirm} />,
    },
    {
        path: '/forget-password',
        element: <LazyLoad component={ForgetPassword} />,
    },
    {
        path: '/lock-screen',
        element: <LazyLoad component={LockScreen} />,
    },
    {
        path: '/not-access',
        element: <LazyLoad component={ForbiddenPage} />,
    },
    {
        path: '*',
        element: <LazyLoad component={ErrorPageNotFound} />,
    },
];

export default publicRoute;
