import { useTranslation } from "react-i18next";

const MENU_ITEMS = () => {
    const { t } = useTranslation()
    return [
        { key: 'Permissions', label: 'Permissions', isTitle: true },
        {
            key: 'Permissions',
            label: 'Permissions',
            isTitle: false,
            icon: 'uil-shield-exclamation',
            children: [
                {
                    key: 'user-role',
                    label: 'User Role',
                    url: '/user-role',
                    parentKey: 'Permissions',
                },
                {
                    key: 'permissions',
                    label: 'Permissions',
                    url: '/permissions',
                    parentKey: 'Permissions',
                },
            ],
        },
        { key: 'Contacts', label: t('contacts'), isTitle: true },
        {
            key: 'Products',
            label: t('products'),
            isTitle: false,
            icon: 'dripicons-weight',
            children: [
                {
                    key: 'products',
                    label: t('products'),
                    url: '/products',
                    parentKey: 'Products',
                },
                {
                    key: 'category',
                    label: t('category'),
                    url: '/category',
                    parentKey: 'Products',
                },
                {
                    key: 'unit',
                    label: t('unit'),
                    url: '/unit',
                    parentKey: 'Products',
                },
                {
                    key: 'manufacturer',
                    label: t('manufacturer'),
                    url: '/manufacturer',
                    parentKey: 'Products',
                },
                {
                    key: 'warranty',
                    label: t('warranty'),
                    url: '/warranty',
                    parentKey: 'Products',
                },
                {
                    key: 'stock',
                    label: t('stock'),
                    url: '/stock',
                    parentKey: 'Products',
                },
            ],
        },
        {
            key: 'Suppliers',
            label: t('suppliers'),
            isTitle: false,
            icon: 'uil-briefcase',
            url: '/suppliers'

        },
        {
            key: 'Customers',
            label: t('customers'),
            isTitle: false,
            icon: 'uil-users-alt',
            url: '/customers'

        },
    ];
}

export default MENU_ITEMS;
