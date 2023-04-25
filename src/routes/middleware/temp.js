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
    const dispatch = useDispatch();
    const { accessToken } = useSelector((state) => state.auth);
    const { data, isError, error } = useProfileDetailsQuery();

    useEffect(() => {
        if (SessionHelper.getAccessToken()) {
            dispatch(
                setLogin({
                    accessToken: SessionHelper.getAccessToken(),
                    refreshToken: SessionHelper.getRefreshToken(),
                })
            );
        }
    }, [SessionHelper.getAccessToken()]);

    if (accessToken) {
        if (isError) {
            //server not ready error
            if (error.status === 'FETCH_ERROR') dispatch(setLogout());
        } else if (data) {
            //user roles
            if (r.roles) {
                if (r.roles.indexOf(data?.role) === -1) {
                    // role not authorised so  to not-access page
                    return <Navigate to="/not-access" replace />;
                }
            }

            //user route permission
            if (r.routePermission) {
                if (data?.role !== 'proprietor') {
                    if (!data?.permissions[r.routePermission]) {
                        // role not authorised so  to not-access page
                        return <Navigate to="/not-access" replace />;
                    }
                }
            }

            return children;
        }
    } else {
        // role not authorization so redirect to login page
        return <Navigate to="/login" replace />;
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
