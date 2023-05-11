//External Lib Import
import { Card, Col, Row } from 'react-bootstrap';

//Internal Lib Import
import LoaderImg from '../../assets/images/load.svg';

const LoadingData = () => {
    return (
        <Row>
            <Col xs={12}>
                <Card>
                    <Card.Body>
                        <div
                            className="d-flex justify-content-center align-items-center"
                            style={{
                                minHeight: '50vh',
                            }}>
                            {/* <img top src={LoaderImg} alt="" style={{ width: '100px' }} />{' '} */}
                            <div className="status" id="status-load">
                                <div className="bouncing-loader">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default LoadingData;
