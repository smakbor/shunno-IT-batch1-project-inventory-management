//external lib import
import { lazy } from 'react';

//internal lib import
import LazyLoad from '../components/common/LazyLoad.jsx';
<<<<<<< HEAD
import Customers from '../pages/Contacts/Customers/Customers.jsx';
import Manufacturer from '../pages/products/manufacturer/Manufacturer.jsx';
=======
const Customers = lazy(() => import('../pages/Contacts/Customers/Customers.jsx'));
const UnitPage = lazy(() => import('../pages/products/unit/UnitPage.jsx'));
>>>>>>> 249bd6d54819f0519724a4a2cf33f62e7df3e17e
const UserRolePage = lazy(() => import('../pages/Permissions/UserRolePage'));
const PermissionsPage = lazy(() => import('../pages/Permissions/PermissionsPage'));
const CategoryPage = lazy(() => import('../pages/products/category/CategoryPage'));
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
    {
        path: '/customers',
        element: <LazyLoad component={Customers} />,
        roles: ['ALL'],
        routePermission: 'PERMISSIONS',
    },
    {
        path: '/products/categories',
        element: <LazyLoad component={CategoryPage} />,
        roles: ['ALL'],
        routePermission: 'PERMISSIONS',
    },
<<<<<<< HEAD
    // {
    //     path: '/products/manufacturers',
    //     element: <LazyLoad component={Manufacturer} />,
    //     roles: ['ALL'],
    //     routePermission: 'PERMISSIONS',
    // },
=======
    {
        path: '/products/units',
        element: <LazyLoad component={UnitPage} />,
        roles: ['ALL'],
        routePermission: 'PERMISSIONS',
    },

>>>>>>> 249bd6d54819f0519724a4a2cf33f62e7df3e17e
];

export default privateRoutes;

//['SHUNNOIT_SUPER_ADMIN', 'SHUNNOIT_AGENT_ADMIN']
