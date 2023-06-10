//External Lbi Import
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';

//External Lbi Import
import { useProfileDetailsQuery } from '../redux/services/profileService';
import { useStoreListQuery } from '../redux/services/storeService';

const StoreDropdown = () => {
    const [activeStore, setActiveStore] = useState({});
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const { data: profile } = useProfileDetailsQuery() || {};
    const { data: stores, isSuccess } = useStoreListQuery(undefined, {
        skip: !profile?.store,
    });
    useEffect(() => {
        if (stores && stores.length > 0) {
            if (!localStorage.getItem('activeStore')) {
                localStorage.setItem('activeStore', JSON.stringify(stores[0]));
            }
        }
        if (localStorage.getItem('activeStore')) {
            setActiveStore(JSON.parse(localStorage.getItem('activeStore')));
        }
    }, [stores]);

    const toggleDropdown = ({ dropdownOpen: boolean }) => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleStoreChange = (id) => {
        const selectedStore = stores.find((item) => item._id === id);
        localStorage.setItem('activeStore', JSON.stringify(selectedStore));
        setActiveStore(JSON.parse(localStorage.getItem('activeStore')));
        window.location.reload();
    };

    return (
        <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
            <Dropdown.Toggle
                variant="link"
                id="dropdown-stores"
                onClick={toggleDropdown}
                className="nav-link dropdown-toggle arrow-none">
                <span className="align-middle d-none d-sm-inline-block">{activeStore?.storeName}</span>
                <i className="mdi mdi-chevron-down d-none d-sm-inline-block align-middle"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu align={'end'} className="dropdown-menu-animated topbar-dropdown-menu">
                <div onClick={toggleDropdown}>
                    {stores?.map((store) => {
                        return (
                            <span
                                className="dropdown-item notify-item"
                                key={store?._id}
                                onClick={() => handleStoreChange(store?._id)}
                                style={{ cursor: 'pointer' }}>
                                <span className="align-middle">{store?.storeName}</span>
                            </span>
                        );
                    })}
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default StoreDropdown;
