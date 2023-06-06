//External Lib Import
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

//Internal Lib Import
import privateRoutes from '../privateRoute';
import { useProfileDetailsQuery } from '../../redux/services/profileService';
import { userLogout } from '../../redux/features/authReducer';
import FullPageLoad from '../../components/common/FullPageLoad';

//api services
const ProtectRoute = ({ r, children }) => {
    const dispatch = useDispatch();
    const { accessToken } = useSelector((state) => state.auth);
    const { data: loginCurrentUser, isLoading } = useProfileDetailsQuery(undefined, {
        skip: !accessToken,
    });

    if (isLoading) {
        return <FullPageLoad />;
    }

    if (accessToken && loginCurrentUser) {
        if (r.roles.indexOf('ALL') === -1 && r.roles.indexOf(loginCurrentUser.role) === -1) {
            // role not authorize so go to login page
            return <Navigate to="/not-access" replace />;
        } else if (r.routePermission !== 'ALL' && !loginCurrentUser.permissions[r.routePermission]) {
            // access not authorize so go to not-access page
            return <Navigate to="/not-access" replace />;
        } else {
            return children;
        }
    } else {
        dispatch(userLogout());
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
