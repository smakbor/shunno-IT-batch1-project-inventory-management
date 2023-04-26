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
            key: 'Customers',
            label: t('customers'),
            isTitle: false,
            icon: 'uil-users-alt',
            url: '/customers'

        },
    ];
}

export default MENU_ITEMS;
