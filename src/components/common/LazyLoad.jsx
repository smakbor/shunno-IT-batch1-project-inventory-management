//External Lib Import
import { Suspense } from 'react';

const LazyLoad = ({ component: Component }) => {
    return (
        <Suspense
            fallback={
                <>
                    {/* <div className="status" id="status-load">
                        <div className="bouncing-loader">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div> */}
                </>
            }>
            <Component />
        </Suspense>
    );
};

{
    /* <div className="preloader" id="preloader">
    <div className="status" id="status-load">
        <div className="bouncing-loader">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</div> */
}

export default LazyLoad;
