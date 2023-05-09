//External Lib Import
import { lazy } from 'react';

//Internal Lib Import
import LazyLoad from '../components/common/LazyLoad.jsx';
// import Customers from '../pages/customers/Customers.jsx';
const Warranty = lazy(() => import('../pages/products/Warranty/Warranty.jsx'));
const Suppliers = lazy(() => import('../pages/suppliers/Suppliers.jsx'));
const Customers = lazy(() => import('../pages/customers/Customers.jsx'));

const UnitPage = lazy(() => import('../pages/products/unit/UnitPage.jsx'));
const UserRolePage = lazy(() => import('../pages/Permissions/UserRolePage'));
const PermissionsPage = lazy(() => import('../pages/Permissions/PermissionsPage'));
const CategoryPage = lazy(() => import('../pages/products/category/CategoryPage'));
const Manufacturer = lazy(() => import('../pages/products/manufacturer/Manufacturer'));
const privateRoutes = [
    {
        path: '/dashboard',
        element: <LazyLoad component={UserRolePage} />,
        roles: ['ALL'],
        routePermission: 'ALL',
    },
    {
        path: '/user-role',
        element: <LazyLoad component={UserRolePage} />,
        roles: ['ALL'],
        routePermission: 'ALL',
    },
    {
        path: '/permissions',
        element: <LazyLoad component={PermissionsPage} />,
        roles: ['ALL'],
        routePermission: 'ALL',
    },
    {
        path: '/customers',
        element: <LazyLoad component={Customers} />,
        roles: ['ALL'],
        routePermission: 'ALL',
    },
    {
        path: '/products/categories',
        element: <LazyLoad component={CategoryPage} />,
        roles: ['ALL'],
        routePermission: 'ALL',
    },
    {
        path: '/products/units',
        element: <LazyLoad component={UnitPage} />,
        roles: ['ALL'],
        routePermission: 'ALL',
    },
    {
        path: '/products/manufacturers',
        element: <LazyLoad component={Manufacturer} />,
        roles: ['ALL'],
        routePermission: 'ALL',
    },
    {
        path: '/products/warranties',
        element: <LazyLoad component={Warranty} />,
        roles: ['ALL'],
        routePermission: 'ALL',
    },
    {
        path: '/suppliers',
        element: <LazyLoad component={Suppliers} />,
        roles: ['ALL'],
        routePermission: 'ALL',
    },
    {
        path: '/customers',
        element: <LazyLoad component={Customers} />,
        roles: ['ALL'],
        routePermission: 'ALL',
    },
];

export default privateRoutes;

//['SHUNNOIT_SUPER_ADMIN', 'SHUNNOIT_AGENT_ADMIN']
