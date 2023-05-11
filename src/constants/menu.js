import { useTranslation } from 'react-i18next';

const MENU_ITEMS = () => {
    const { t } = useTranslation();
    return [
        { key: 'contacts', label: t('contacts'), isTitle: true },
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
                    label: t('unit'),
                    url: 'products/units',
                    parentKey: 'products',
                },
                {
                    key: 'manufacturer',
                    label: t('manufacturer'),
                    url: '/products/manufacturers',
                    parentKey: 'products',
                },
                {
                    key: 'warranty',
                    label: t('warranty'),
                    url: '/products/warranties',
                    parentKey: 'products',
                },
                {
                    key: 'stock',
                    label: t('stock'),
                    url: '/stock',
                    parentKey: 'products',
                },
            ],
        },
        {
            key: 'suppliers',
            label: t('suppliers'),
            isTitle: false,
            icon: 'uil-briefcase',
            url: '/suppliers',
        },
        {
            key: 'customers',
            label: t('customers'),
            isTitle: false,
            icon: 'uil-users-alt',
            url: '/customers',
        },
        { key: 'permissions', label: 'permissions', isTitle: true },
        {
            key: 'permissions',
            label: 'permissions',
            isTitle: false,
            icon: 'uil-shield-exclamation',
            children: [
                {
                    key: 'user-role',
                    label: 'User Role',
                    url: '/user-role',
                    parentKey: 'permissions',
                },
                {
                    key: 'permissions',
                    label: 'permissions',
                    url: '/permissions',
                    parentKey: 'permissions',
                },
            ],
        },
        { key: 'settings', label: 'settings', isTitle: true },
        {
            key: 'settings',
            label: 'settings',
            isTitle: false,
            icon: 'dripicons-gear',
            children: [
                {
                    key: 'user',
                    label: 'users',
                    url: '/users',
                    parentKey: 'settings',
                },
            ],
        },
    ];
};

export default MENU_ITEMS;
