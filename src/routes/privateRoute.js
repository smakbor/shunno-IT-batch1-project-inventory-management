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
        roles: ['STAFF'],
        routePermission: null,
    },
    {
        path: '/user-role',
        element: <LazyLoad component={UserRolePage} />,
        roles: ['STAFF'],
        routePermission: null,
    },
    {
        path: '/permissions',
        element: <LazyLoad component={PermissionsPage} />,
        roles: ['SHUNNOIT_SUPER_ADMIN', 'SHUNNOIT_AGENT_ADMIN'],
        routePermission: 'PERMISSIONS',
    },
];

export default privateRoutes;
