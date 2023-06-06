//External Lib Import
import { Card, Col, Row } from 'react-bootstrap';

//Internal Lib Import
import ErrorImg from '../../assets/images/error-data.svg';

const ErrorDataLoad = () => {
    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: '50vh',
            }}>
            <img top src={ErrorImg} alt="" style={{ width: '100px' }} />{' '}
        </div>
    );
};

export default ErrorDataLoad;
