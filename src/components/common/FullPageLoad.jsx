const FullPageLoad = () => {
    return (
        <>
            <div className="loading__overlay">
                <div className="indeterminate"></div>
            </div>
            <div className="main_loader">
                <div className="status" id="status-load">
                    <div className="bouncing-loader">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FullPageLoad;
