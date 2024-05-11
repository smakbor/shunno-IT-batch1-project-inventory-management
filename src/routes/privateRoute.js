//External Lib Import
import { lazy } from 'react';

//Internal Lib Import
import LazyLoad from '../components/common/LazyLoad.jsx';
import { PermissionEnum } from '../constants/enums/permission.enums.js';
import Warranty from '../pages/products/warranty/Warranty.jsx';
import UserRolePage from '../pages/Permissions/UserRolePage.jsx';
import Units from '../pages/products/Units/Units.jsx';
import Brand from '../pages/products/Brand/Brand.jsx';
// import Permissions from '../pages/permissions/Permissions.jsx';

// const Media = lazy(() => import('../pages/media/Media.jsx'));
const Salary = lazy(() => import('../pages/employee/Salary.jsx'));
const Ui = lazy(() => import('../pages/settings/Ui.jsx'));
const Trash = lazy(() => import('../pages/message/Trash.jsx'));
const Inbox = lazy(() => import('../pages/message/Inbox.jsx'));
const UserRolePage = lazy(() => import('../pages/Permissions/UserRolePage.jsx'));
const Permissions = lazy(() => import('../pages/Permissions/Permissions.jsx'));
// const UserRolePage = lazy(() => import('../pages/permissions/UserRolePage.jsx'));
// const Permissions = lazy(() => import('../pages/permissions/Permissions.jsx'));
const Categories = lazy(() => import('../pages/products/category/Categories'));
const Customer = lazy(()=> import('../pages/people/Customer.jsx'))
const Supplier = lazy(()=> import('../pages/people/Supplier.jsx'))

const CostSection = lazy(() => import('../pages/expenditure/costSection/CostSection.jsx'));
const Sent = lazy(() => import('../pages/message/Sent.jsx'));
const Details = lazy(() => import('../pages/message/Details.jsx'));
const Expenditure = lazy(() => import('../pages/expenditure/expenditure/Expenditure.jsx'));
const Staffs = lazy(() => import('../pages/settings/Staffs.jsx'));
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
        path: '/products/warranty',
        element: <LazyLoad component={Warranty} />,
        roles: ['ALL', 'PROPRIETOR'],
    },{
        path: '/products/units',
        element: <LazyLoad component={Units} />,
        roles: ['ALL', 'PROPRIETOR'],
    },
    {
        path: '/products/brand',
        element: <LazyLoad component={Brand} />,
        roles: ['ALL', 'PROPRIETOR'],
    },
{
        path: '/products/units',
        element: <LazyLoad component={Units}/>,
        roles: ['ALL', 'PROPRIETOR']
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
    {
        path: '/customer',
        element: <LazyLoad component={Customer} />,
        roles: ['ALL', 'PROPRIETOR'],
    },
    {
        path: '/suppliers',
        element: <LazyLoad component={Supplier} />,
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
