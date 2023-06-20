//External Lib Import
import { lazy } from 'react';

//Internal Lib Import
import LazyLoad from '../components/common/LazyLoad.jsx';
const Media = lazy(() => import('../pages/media/Media.jsx'));
const Salary = lazy(() => import('../pages/employee/Salary.jsx'));
const Ui = lazy(() => import('../pages/settings/Ui.jsx'));
const Trash = lazy(() => import('../pages/message/Trash.jsx'));
const Inbox = lazy(() => import('../pages/message/Inbox.jsx'));
const Warranty = lazy(() => import('../pages/products/warranty/Warranty.jsx'));
const Suppliers = lazy(() => import('../pages/contacts/suppliers/Suppliers.jsx'));
const Customers = lazy(() => import('../pages/contacts/customers/Customers.jsx'));
const Units = lazy(() => import('../pages/products/unit/Units.jsx'));
const UserRolePage = lazy(() => import('../pages/permissions/UserRolePage.jsx'));
const Permissions = lazy(() => import('../pages/permissions/Permissions.jsx'));
const Categories = lazy(() => import('../pages/products/category/Categories'));
const Manufacturer = lazy(() => import('../pages/products/manufacturer/Manufacturer'));
const CostSection = lazy(() => import('../pages/expenditure/costSection/CostSection.jsx'));
const Sent = lazy(() => import('../pages/message/Sent.jsx'));
const Details = lazy(() => import('../pages/message/Details.jsx'));
const Expenditure = lazy(() => import('../pages/expenditure/expenditure/Expenditure.jsx'));
const Staffs = lazy(() => import('../pages/settings/Staffs.jsx'));
const MediaUpload = lazy(() => import('../pages/media/MediaUpload.jsx'));
const Department = lazy(() => import('../pages/hrm/department/Department.jsx'));

const privateRoutes = [
    {
        path: '/dashboard',
        element: <LazyLoad component={UserRolePage} />,
        roles: ['ALL', 'PROPRIETOR'],
        routePermission: 'ALL',
    },
    {
        path: '/products/categories',
        element: <LazyLoad component={Categories} />,
        roles: ['ALL', 'PROPRIETOR'],
        routePermission: 'ALL',
    },
    {
        path: '/products/units',
        element: <LazyLoad component={Units} />,
        roles: ['ALL', 'PROPRIETOR'],
        routePermission: 'ALL',
    },
    {
        path: '/products/warranty',
        element: <LazyLoad component={Warranty} />,
        roles: ['ALL', 'PROPRIETOR'],
        routePermission: 'ALL',
    },
    {
        path: '/products/manufacturers',
        element: <LazyLoad component={Manufacturer} />,
        roles: ['ALL', 'PROPRIETOR'],
        routePermission: 'ALL',
    },
    {
        path: '/products/warranties',
        element: <LazyLoad component={Warranty} />,
        roles: ['ALL', 'PROPRIETOR'],
        routePermission: 'ALL',
    },
    {
        path: '/suppliers',
        element: <LazyLoad component={Suppliers} />,
        roles: ['ALL', 'PROPRIETOR'],
        routePermission: 'ALL',
    },
    {
        path: '/customers',
        element: <LazyLoad component={Customers} />,
        roles: ['ALL', 'PROPRIETOR'],
        routePermission: 'ALL',
    },
    {
        path: '/costSections',
        element: <LazyLoad component={CostSection} />,
        roles: ['ALL', 'PROPRIETOR'],
        routePermission: 'ALL',
    },
    {
        path: '/messages/details',
        element: <LazyLoad component={Details} />,
        roles: ['ALL', 'PROPRIETOR'],
        routePermission: 'ALL',
    },
    {
        path: '/messages/inbox',
        element: <LazyLoad component={Inbox} />,
        roles: ['ALL', 'PROPRIETOR'],
        routePermission: 'ALL',
    },
    {
        path: '/messages/sent',
        element: <LazyLoad component={Sent} />,
        roles: ['ALL', 'PROPRIETOR'],
        routePermission: 'ALL',
    },
    {
        path: '/messages/trash',
        element: <LazyLoad component={Trash} />,
        roles: ['ALL', 'PROPRIETOR'],
        routePermission: 'ALL',
    },
    {
        path: '/expenditure',
        element: <LazyLoad component={Expenditure} />,
        roles: ['ALL', 'PROPRIETOR'],
        routePermission: 'ALL',
    },
    {
        path: '/user-role',
        element: <LazyLoad component={UserRolePage} />,
        roles: ['ALL', 'PROPRIETOR'],
        routePermission: 'ALL',
    },
    {
        path: '/permissions',
        element: <LazyLoad component={Permissions} />,
        roles: ['ALL', 'PROPRIETOR'],
        routePermission: 'ALL',
    },
    {
        path: '/staffs',
        element: <LazyLoad component={Staffs} />,
        roles: ['ALL', 'PROPRIETOR'],
        routePermission: 'ALL',
    },
    //HRM path
    {
        path: '/department',
        element: <LazyLoad component={Department} />,
        roles: ['ALL', 'PROPRIETOR'],
        routePermission: 'ALL',
    },
    {
        path: '/settings/ui',
        element: <LazyLoad component={Ui} />,
        roles: ['ALL', 'PROPRIETOR'],
        routePermission: 'ALL',
    },
    {
        path: '/salary/:employeeID',
        element: <LazyLoad component={Salary} />,
        roles: ['ALL', 'PROPRIETOR'],
        routePermission: 'ALL',
    },
    {
        path: '/media',
        element: <LazyLoad component={Media} />,
        roles: ['ALL', 'PROPRIETOR'],
        routePermission: 'ALL',
    },
    {
        path: '/media/upload',
        element: <LazyLoad component={MediaUpload} />,
        roles: ['ALL', 'PROPRIETOR'],
        routePermission: 'ALL',
    },
];

export default privateRoutes;

//['SHUNNOIT_SUPER_ADMIN', 'SHUNNOIT_AGENT_ADMIN']
