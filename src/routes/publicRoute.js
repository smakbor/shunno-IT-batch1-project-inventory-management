//External Lib Import
import { lazy } from 'react';

//Internal Lib Import
import LazyLoad from '../components/common/LazyLoad';
import Home from '../pages/test/Home';

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
        path: '/account/login',
        element: <LazyLoad component={Login} />,
    },
    {
        path: '/account/logout',
        element: <LazyLoad component={Logout} />,
    },
    {
        path: '/account/register',
        element: <LazyLoad component={Register} />,
    },
    {
        path: '/account/confirm',
        element: <LazyLoad component={Confirm} />,
    },
    {
        path: '/home',
        element: <LazyLoad component={<Home />} />,
    },
    {
        path: '/account/forget-password',
        element: <LazyLoad component={ForgetPassword} />,
    },
    {
        path: '/account/lock-screen',
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
