const MENU_ITEMS = [
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
];

export default MENU_ITEMS;
