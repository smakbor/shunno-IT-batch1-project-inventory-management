//External Lib Import
import { lazy } from 'react';

//Internal Lib Import
import LazyLoad from '../components/common/LazyLoad.jsx';
import { PermissionEnum } from '../constants/enums/permission.enums.js';

// const Media = lazy(() => import('../pages/media/Media.jsx'));
const Salary = lazy(() => import('../pages/employee/Salary.jsx'));
const Ui = lazy(() => import('../pages/settings/Ui.jsx'));
const Trash = lazy(() => import('../pages/message/Trash.jsx'));
const Inbox = lazy(() => import('../pages/message/Inbox.jsx'));
const Warranty = lazy(() => import('../pages/products/warranty/Warranty.jsx'));

const Suppliers = lazy(() => import('../pages/Contacts/suppliers/Suppliers.jsx'));
const Customers = lazy(() => import('../pages/Contacts/customers/Customers.jsx'));
const Billers = lazy(() => import('../pages/Contacts/biller/Biller.jsx'));
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
// const MediaUpload = lazy(() => import('../pages/media/MediaUpload.jsx'));
const Department = lazy(() => import('../pages/hrm/department/Department.jsx'));
const Account = lazy(() => import('../pages/hrm/department/account/accounting/Account.jsx'));
const MoneyTransfer = lazy(() => import('../pages/hrm/department/account/moneyTransfer/MoneyTransfer.jsx'));
const AccountStatement = lazy(() => import('../pages/hrm/department/account/accountStatement/AccountStatement.jsx'));

const privateRoutes = [
    {
        path: '/dashboard',
        element: <LazyLoad component={UserRolePage} />,
        roles: ['ALL', 'PROPRIETOR'],
    },
    {
        path: '/products/categories',
        element: <LazyLoad component={Categories} />,
        roles: ['ALL', 'PROPRIETOR'],
    },
    {
        path: '/products/units',
        element: <LazyLoad component={Units} />,
        roles: ['ALL', 'PROPRIETOR'],
    },
    {
        path: '/products/warranty',
        element: <LazyLoad component={Warranty} />,
        roles: ['ALL', 'PROPRIETOR'],
    },
    {
        path: '/products/manufacturers',
        element: <LazyLoad component={Manufacturer} />,
        roles: ['ALL', 'PROPRIETOR'],
    },
    {
        path: '/products/warranties',
        element: <LazyLoad component={Warranty} />,
        roles: ['ALL', 'PROPRIETOR'],
    },
    {
        path: '/suppliers',
        element: <LazyLoad component={Suppliers} />,
        roles: ['ALL', 'PROPRIETOR'],
    },
    {
        path: '/customers',
        element: <LazyLoad component={Customers} />,
        roles: ['ALL', 'PROPRIETOR'],
    },
    {
        path: '/billers',
        element: <LazyLoad component={Billers} />,
        roles: ['ALL', 'PROPRIETOR'],
    },
    {
        path: '/costSections',
        element: <LazyLoad component={CostSection} />,
        roles: ['ALL', 'PROPRIETOR'],
    },
    {
        path: '/messages/details',
        element: <LazyLoad component={Details} />,
        roles: ['ALL', 'PROPRIETOR'],
    },
    {
        path: '/messages/inbox',
        element: <LazyLoad component={Inbox} />,
        roles: ['ALL', 'PROPRIETOR'],
    },
    {
        path: '/messages/sent',
        element: <LazyLoad component={Sent} />,
        roles: ['ALL', 'PROPRIETOR'],
    },
    {
        path: '/messages/trash',
        element: <LazyLoad component={Trash} />,
        roles: ['ALL', 'PROPRIETOR'],
    },
    {
        path: '/expenditure',
        element: <LazyLoad component={Expenditure} />,
        roles: ['ALL', 'PROPRIETOR'],
    },
    {
        path: '/user-role',
        element: <LazyLoad component={UserRolePage} />,
        roles: ['ALL', 'PROPRIETOR'],
    },
    {
        path: '/permissions',
        element: <LazyLoad component={Permissions} />,
        roles: ['ALL', 'PROPRIETOR'],
    },
    {
        path: '/staffs',
        element: <LazyLoad component={Staffs} />,
        roles: ['ALL', 'PROPRIETOR'],
    },
    //HRM path
    {
        path: '/department',
        element: <LazyLoad component={Department} />,
        roles: ['ALL', 'PROPRIETOR'],
    },
    //Accounting path start
    {
        path: '/accounts',
        element: <LazyLoad component={Account} />,
        roles: ['ALL', 'PROPRIETOR'],
    },
    {
        path: '/money-transfer',
        element: <LazyLoad component={MoneyTransfer} />,
        roles: ['ALL', 'PROPRIETOR'],
    },
    {
        path: '/account-statement',
        element: <LazyLoad component={AccountStatement} />,
        roles: ['ALL', 'PROPRIETOR'],
    },
    //Accounting path end
    {
        path: '/settings/ui',
        element: <LazyLoad component={Ui} />,
        roles: ['ALL', 'PROPRIETOR'],
    },
    {
        path: '/salary/:employeeID',
        element: <LazyLoad component={Salary} />,
        roles: ['ALL', 'PROPRIETOR'],
    },
    // {
    //     path: '/media',
    //     element: <LazyLoad component={Media} />,
    //     roles: ['ALL', 'PROPRIETOR'],
    // },
    // {
    //     path: '/media/upload',
    //     element: <LazyLoad component={MediaUpload} />,
    //     roles: ['ALL', 'PROPRIETOR'],
    // },
];

export default privateRoutes;

//['SHUNNOIT_SUPER_ADMIN', 'SHUNNOIT_AGENT_ADMIN']
