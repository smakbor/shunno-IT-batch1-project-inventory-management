//External Lib Import
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

//Internal Lib Import
import privateRoutes from '../privateRoute';
import { useProfileDetailsQuery } from '../../redux/services/profileService';

//api services
const ProtectRoute = ({ r, children }) => {
    const { accessToken } = useSelector((state) => state.auth);
    const { data: loginCurrentUser } = useProfileDetailsQuery(undefined, {
        skip: !accessToken,
    });

    if (accessToken || loginCurrentUser) {
        if (r.roles.indexOf('ALL') === -1 && r.roles.indexOf(loginCurrentUser.role) === -1) {
            // role not authorize so go to login page
            return <Navigate to="/account/login" replace />;
        }

        if (r.routePermission !== 'ALL' && !loginCurrentUser.permissions[r.routePermission]) {
            // access not authorize so go to not-access page
            return <Navigate to="/not-access" replace />;
        }

        return children;
    } else {
        // user authorize so go to login page
        return <Navigate to="/account/login" replace />;
    }
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
