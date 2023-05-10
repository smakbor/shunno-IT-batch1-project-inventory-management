import React, { useState } from 'react';
import Select from 'react-select'
import { useGetStoresQuery } from '../redux/services/storeService'
import FormInput from './FormInput';
import { Dropdown } from 'react-bootstrap';

const StoreDropdown = () => {
    const { data, isSuccess } = useGetStoresQuery()
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const stores = data?.data;
    if (!localStorage.getItem('activeStore')) {
        localStorage.setItem('activeStore', JSON.stringify(stores[0]))
    }
    const activeStore = JSON.parse(localStorage.getItem('activeStore'))
    const toggleDropdown = ({ dropdownOpen: boolean }) => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleStoreChange = id => {
        const selectedStore = stores.find(item => item._id === id)
        localStorage.setItem('activeStore', JSON.stringify(selectedStore))
    }
    console.log(activeStore)
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