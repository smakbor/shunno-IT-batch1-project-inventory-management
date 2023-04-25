//External Lib Import
import { Card, Col, Row } from 'react-bootstrap';

//Internal Lib Import
import ErrorImg from '../../assets/images/error-data.svg';

const ErrorDataLoad = () => {
    return (
        <Row>
            <Col xs={12}>
                <Card>
                    <Card.Body>
                        <div
                            className="d-flex justify-content-center align-items-center"
                            style={{
                                minHeight: '300px',
                            }}>
                            <img top src={ErrorImg} alt="" style={{ width: '100px' }} />{' '}
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default ErrorDataLoad;
