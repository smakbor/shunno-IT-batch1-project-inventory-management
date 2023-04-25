//External Lib Import
import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';

//Internal Lib Import
import PrivateRoute from './middleware/ProtectRoute';
import publicRoute from './publicRoute';
import Root from './Root';
import * as layoutConstants from '../constants/layout';

// All layouts/containers
import DefaultLayout from '../layouts/Default';
import VerticalLayout from '../layouts/Vertical';
import DetachedLayout from '../layouts/Detached';
import HorizontalLayout from '../layouts/Horizontal';
import FullLayout from '../layouts/Full';

const AllRoutes = () => {
    const layout = useSelector((state) => state.layout);

    const getLayout = () => {
        let layoutCls = VerticalLayout;

        switch (layout.layoutType) {
            case layoutConstants.LAYOUT_HORIZONTAL:
                layoutCls = HorizontalLayout;
                break;
            case layoutConstants.LAYOUT_DETACHED:
                layoutCls = DetachedLayout;
                break;
            case layoutConstants.LAYOUT_FULL:
                layoutCls = FullLayout;
                break;
            default:
                layoutCls = VerticalLayout;
                break;
        }
        return layoutCls;
    };
    let Layout = getLayout();

    return useRoutes([
        { path: '/', element: <Root /> },
        {
            // public routes
            path: '/',
            element: <DefaultLayout />,
            children: publicRoute,
        },
        {
            // auth protected routes
            path: '/',
            element: <Layout />,
            children: PrivateRoute(),
        },
    ]);
};

export { AllRoutes };
