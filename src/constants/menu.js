import { useTranslation } from 'react-i18next';
import { PermissionEnum } from './enums/permission.enums';

const MENU_ITEMS = () => {
    const { t } = useTranslation();
    return [
        {
            key: 'products',
            label: t('products'),
            isTitle: false,
            icon: 'dripicons-weight',

            children: [
                {
                    key: 'products',
                    label: t('products'),
                    url: '/products',
                    parentKey: 'products',
                },
                {
                    key: 'category',
                    label: t('category'),
                    url: '/products/categories',
                    parentKey: 'products',
                },
                {
                    key: 'unit',
                    label: t('Unit'),
                    url: '/products/units',
                    parentKey: 'products',
                },

                {
                    key: 'manufacturer',
                    label: t('Manufacturer'),
                    url: '/products/manufacturer',
                    parentKey: 'products',
                },
            ],
        },
        { key: 'contacts', label: t('contacts'), isTitle: true },
        {
            key: 'people',
            label: t('People'),
            isTitle: false,
            icon: 'dripicons-user',

            children: [
                {
                    key: 'suppliers',
                    label: t('suppliers'),
                    isTitle: false,
                    icon: 'uil-briefcase',
                    url: '/suppliers',
                    parentKey: 'people',
                },
            ],
        },

        { key: 'contacts', label: t('contacts'), isTitle: true },
        {
            key: 'Expenditure',
            label: t('expenditure'),
            isTitle: false,
            icon: 'dripicons-weight',

            children: [
                {
                    key: 'costSection',
                    label: t('cost section'),
                    url: '/costSections',
                    parentKey: 'Expenditure',
                },
                {
                    key: 'expenditure',
                    label: t('expenditure'),
                    url: '/expenditure',
                    parentKey: 'Expenditure',
                },
            ],
        },
        { key: 'contacts', label: t('contacts'), isTitle: true },
        {
            key: 'Messages',
            label: t('message'),
            isTitle: false,
            icon: 'uil-comment-alt-dots',
            url: '/messages/inbox',
        },
        { key: 'permissions', label: 'permissions', isTitle: true },
        {
            key: 'permissions',
            label: t('permissions'),
            isTitle: false,
            icon: 'uil-shield-exclamation',

            children: [
                {
                    key: 'user-role',
                    label: t('user role'),
                    url: '/user-role',
                    parentKey: 'permissions',
                },
                {
                    key: 'permission',
                    label: t('permissions'),
                    url: '/permissions',
                    parentKey: 'permissions',
                },
            ],
        },

        { key: 'HRM', label: 'HRM', isTitle: true },
        {
            key: 'HRM',
            label: t('HRM'),
            isTitle: false,
            icon: 'dripicons-user',

            children: [
                {
                    key: 'department',
                    label: t('Department'),
                    isTitle: false,
                    icon: 'uil-briefcase',
                    url: '/department',
                    parentKey: 'HRM',
                },
                {
                    key: 'employee',
                    label: t('Employee'),
                    isTitle: false,
                    icon: 'uil-users-alt',
                    url: '/employees',
                    parentKey: 'HRM',
                },
                {
                    key: 'attendance',
                    label: t('attendance'),
                    isTitle: false,
                    icon: 'uil-users-alt',
                    url: '/attendance',
                    parentKey: 'HRM',
                },
                {
                    key: 'payroll',
                    label: t('payroll'),
                    isTitle: false,
                    icon: 'uil-users-alt',
                    url: '/payroll',
                    parentKey: 'HRM',
                },
                {
                    key: 'holiday',
                    label: t('holiday'),
                    isTitle: false,
                    icon: 'uil-users-alt',
                    url: '/holiday',
                    parentKey: 'HRM',
                },
                {
                    key: 'hrmsetting',
                    label: t('HRM Setting'),
                    isTitle: false,
                    icon: 'dripicons-gear',
                    url: '/hrmSetting',
                    parentKey: 'HRM',
                },
                {
                    key: 'accounts',
                    label: t('accounts'),
                    isTitle: false,
                    icon: 'dripicons-gear',
                    parentKey: 'HRM',

                    children: [
                        {
                            key: 'accounts',
                            label: t('accounts'),
                            isTitle: false,
                            icon: 'dripicons-gear',
                            url: '/accounts',
                            parentKey: 'accounts',
                        },
                        {
                            key: 'money transfer',
                            label: t('money transfer'),
                            isTitle: false,
                            icon: 'dripicons-gear',
                            url: '/money-transfer',
                            parentKey: 'accounts',
                        },
                        {
                            key: 'account statement',
                            label: t('account statement'),
                            isTitle: false,
                            icon: 'dripicons-gear',
                            url: '/account-statement',
                            parentKey: 'accounts',
                        },
                    ],
                },
            ],
        },

        { key: 'settings', label: 'settings', isTitle: true },
        {
            key: 'settings',
            label: t('settings'),
            isTitle: false,
            icon: 'dripicons-gear',

            children: [
                {
                    key: 'user',
                    label: t('users'),
                    url: '/staffs',
                    parentKey: 'settings',
                },
                {
                    key: 'ui',
                    label: t('ui'),
                    url: '/settings/ui',
                    parentKey: 'settings',
                },
            ],
        },
    ];
};

export default MENU_ITEMS;
