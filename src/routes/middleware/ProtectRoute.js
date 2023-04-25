//External Lib Import
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

//Internal Lib Import
import privateRoutes from '../privateRoute';
import { setLogin, setLogout } from '../../redux/features/authReducer';
import { useEffect } from 'react';

//api services
import { useProfileDetailsQuery } from '../../redux/services/profileService';
import SessionHelper from '../../helpers/SessionHelper';

const ProtectRoute = ({ r, children }) => {
    const loginUser = { name: 'sujon', role: 'STAFF', permissions: { PERMISSIONS: true } };

    if (r.roles.indexOf('ALL') === -1 && r.roles.indexOf(loginUser.role) === -1) {
        // role not authorize so to not-access page
        return <Navigate to="/not-access" replace />;
    }

    if (r.routePermission && !loginUser.permissions[r.routePermission]) {
        alert(33);
        return <Navigate to="/not-access" replace />;
    }

    return children;
};

const getProtectRoute = () => {
    const filterRoute = [];
    privateRoutes.map((r) => {
        r.element = <ProtectRoute r={r}> {r.element} </ProtectRoute>;
        filterRoute.push(r);
    });

    return filterRoute;
};

export default getProtectRoute;
