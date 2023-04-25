import React from 'react';
import { useSelector } from 'react-redux';

const CustomLoader = () => {
    const { customLoader } = useSelector((state) => state.setting);

    return (
        <div className={customLoader ? 'd-block' : 'd-none'}>
            <div className="block-load">
                <h1>load.........................</h1>
            </div>
        </div>
    );
};

export default CustomLoader;
