import React from 'react';
import { useSelector } from 'react-redux';

const ApiLoader = () => {
    const { isLoading } = useSelector((state) => state.setting);

    return (
        <div className={isLoading ? 'd-block' : 'd-none'}>
            <div className="loading__overlay">
                <div className="indeterminate"></div>
            </div>
        </div>
    );
};

export default ApiLoader;
