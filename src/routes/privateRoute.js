//external lib import
import { lazy } from 'react';

//internal lib import
import LazyLoad from '../components/common/LazyLoad.jsx';
const Trash = lazy(() => import('../pages/message/Trash.jsx'));
const Inbox = lazy(() => import('../pages/message/Inbox.jsx'));
const NewMessage = lazy(() => import('../pages/message/NewMessage.jsx'));
const Warranty = lazy(() => import('../pages/products/warranty/Warranty.jsx'));
const Suppliers = lazy(() => import('../pages/suppliers/Suppliers.jsx'));
const Customers = lazy(() => import('../pages/customers/Customers.jsx'));
const UnitPage = lazy(() => import('../pages/products/unit/UnitPage.jsx'));
const UserRolePage = lazy(() => import('../pages/Permissions/UserRolePage'));
const PermissionsPage = lazy(() => import('../pages/Permissions/PermissionsPage'));
const CategoryPage = lazy(() => import('../pages/products/category/CategoryPage'));
const Manufacturer = lazy(() => import('../pages/products/manufacturer/Manufacturer'));
const CostSection = lazy(() => import('../pages/expenditure/costSection/CostSection.jsx'));
const Sent = lazy(() => import('../pages/message/Sent.jsx'));
const Details = lazy(() => import('../pages/message/Details.jsx'));
const Expenditure = lazy(() => import('../pages/expenditure/expenditure/Expenditure.jsx'));
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
    {
        path: '/products/units',
        element: <LazyLoad component={UnitPage} />,
        roles: ['ALL'],
        routePermission: 'PERMISSIONS',
    },
    {
        path: '/products/warranty',
        element: <LazyLoad component={Warranty} />,
        roles: ['ALL'],
        routePermission: 'PERMISSIONS',
    },
    {
        path: '/products/manufacturers',
        element: <LazyLoad component={Manufacturer} />,
        roles: ['ALL'],
        routePermission: 'PERMISSIONS',
    },
    {
        path: '/products/warranties',
        element: <LazyLoad component={Warranty} />,
        roles: ['ALL'],
        routePermission: 'PERMISSIONS',
    },
    {
        path: '/suppliers',
        element: <LazyLoad component={Suppliers} />,
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
        path: '/costSections',
        element: <LazyLoad component={CostSection} />,
        roles: ['ALL'],
        routePermission: 'PERMISSIONS',
    },
    {
        path: '/messages/details',
        element: <LazyLoad component={Details} />,
        roles: ['ALL'],
        routePermission: 'PERMISSIONS',
    },
    {
        path: '/messages/inbox',
        element: <LazyLoad component={Inbox} />,
        roles: ['ALL'],
        routePermission: 'PERMISSIONS',
    },
    {
        path: '/messages/sent',
        element: <LazyLoad component={Sent} />,
        roles: ['ALL'],
        routePermission: 'PERMISSIONS',
    },
    {
        path: '/messages/trash',
        element: <LazyLoad component={Trash} />,
        roles: ['ALL'],
        routePermission: 'PERMISSIONS',
    },
    {
        path: '/expenditure',
        element: <LazyLoad component={Expenditure} />,
        roles: ['ALL'],
        routePermission: 'PERMISSIONS',
    },

];

export default privateRoutes;

//['SHUNNOIT_SUPER_ADMIN', 'SHUNNOIT_AGENT_ADMIN']
