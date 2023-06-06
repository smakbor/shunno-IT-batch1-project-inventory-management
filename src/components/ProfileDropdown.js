//External Lib Import
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

//Internal Lib Import
import { useProfileDetailsQuery } from '../redux/services/profileService';

// images
import profilePic from '../assets/images/users/avatar-1.jpg';
import { useLogoutMutation } from '../redux/services/authService';

const ProfileDropdown = (props, _propsState) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { accessToken } = useSelector((state) => state.auth);
    const { data: loginCurrentUser } = useProfileDetailsQuery(undefined, {
        skip: !accessToken,
    });
    const [logout, { data }] = useLogoutMutation();

    /*
     * toggle profile-dropdown
     */
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
            <Dropdown.Toggle
                variant="link"
                id="dropdown-profile"
                as={Link}
                to="#"
                onClick={toggleDropdown}
                className="nav-link dropdown-toggle nav-user arrow-none me-0">
                <span className="account-user-avatar">
                    <img src={loginCurrentUser?.photo || profilePic} className="rounded-circle" alt="user" />
                </span>
                <span>
                    <span className="account-user-name">{loginCurrentUser?.name}</span>
                    <span className="account-position">{loginCurrentUser?.role}</span>
                </span>
            </Dropdown.Toggle>
            <Dropdown.Menu align={'end'} className="dropdown-menu-animated topbar-dropdown-menu profile-dropdown">
                <div onClick={toggleDropdown}>
                    <div className="dropdown-header noti-title">
                        <h6 className="text-overflow m-0">Welcome !</h6>
                    </div>
                    {props.menuItems.map((item, i) =>
                        item.icon === 'mdi mdi-logout' ? (
                            <a
                                style={{ cursor: 'pointer' }}
                                onClick={() => logout()}
                                className="link dropdown-item notify-item"
                                key={i + '-profile-menu'}>
                                <i className={classNames(item.icon, 'me-1')}></i>
                                <span>{item.label}</span>
                            </a>
                        ) : (
                            <Link to={item.redirectTo} className="dropdown-item notify-item" key={i + '-profile-menu'}>
                                <i className={classNames(item.icon, 'me-1')}></i>
                                <span>{item.label}</span>
                            </Link>
                        )
                    )}
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ProfileDropdown;
