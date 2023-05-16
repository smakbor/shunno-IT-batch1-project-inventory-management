// @flow
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

// apps icon
import bayannoIcon from './icons/52-pay.png';
import utilitybillIcon from './icons/utility.jpeg';
import netfeeIcon from './icons/neetfee.png';

// get the apps
const Apps = [
    {
        name: 'Bayannopay',
        icon: bayannoIcon,
        redirectTo: 'https://bayannopay.com',
    },
    {
        name: 'Utility Bill',
        icon: utilitybillIcon,
        redirectTo: 'https://utilitybillbd.com/',
    },
    {
        name: 'Netfee',
        icon: netfeeIcon,
        redirectTo: 'https://netfeebd.com',
    },
];

type AppsDropdownProps = {};

const AppsDropdown = (props: AppsDropdownProps): React$Element<any> => {
    const apps = Apps || [];
    const chunk_size = 3;
    const appsChunks = Array(Math.ceil(apps.length / chunk_size))
        .fill()
        .map((_, index) => index * chunk_size)
        .map((begin) => apps.slice(begin, begin + chunk_size));
    const [dropdownOpen, setDropdownOpen] = useState(false);

    /*
     * toggle apps-dropdown
     */
    const toggleDropdown = ({ dropdownOpen: boolean }) => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
            <Dropdown.Toggle
                variant="link"
                id="dropdown-apps"
                as={Link}
                to="#"
                onClick={toggleDropdown}
                className="nav-link dropdown-toggle arrow-none">
                <i className="dripicons-view-apps noti-icon"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu align={'end'} className="dropdown-menu-animated dropdown-lg p-0">
                <div onClick={toggleDropdown} className="p-2">
                    {appsChunks.map((chunk, idx) => (
                        <div className="row g-0" key={idx}>
                            {chunk.map((item, i) => (
                                <div className="col" key={i}>
                                    <Link className="dropdown-icon-item" to={item.redirectTo}>
                                        <img src={item.icon} alt="" />
                                        <span>{item.name}</span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default AppsDropdown;
