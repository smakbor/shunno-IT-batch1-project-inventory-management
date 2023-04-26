//External Lib Import
import { lazy } from 'react';

//Internal Lib Import
import LazyLoad from '../components/common/LazyLoad.jsx';
const UserRolePage = lazy(() => import('../pages/Permissions/UserRolePage'));
const PermissionsPage = lazy(() => import('../pages/Permissions/PermissionsPage'));

const privateRoutes = [
    {
        path: '/dashboard',
        element: <LazyLoad component={UserRolePage} />,
        roles: ['ALL'],
        routePermission: null,
    },
    {
        path: '/user-role',
        element: <LazyLoad component={UserRolePage} />,
        roles: ['ALL'],
        routePermission: null,
    },
    {
        path: '/permissions',
        element: <LazyLoad component={PermissionsPage} />,
        roles: ['ALL'],
        routePermission: 'PERMISSIONS',
    },
];

export default privateRoutes;

//['SHUNNOIT_SUPER_ADMIN', 'SHUNNOIT_AGENT_ADMIN']
