// @flow
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = (): React$Element<any> => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer">
            <div className="container-fluid">
                <Row>
                    <Col md={6}>{currentYear} © Hisab Nikash - shunnoit.com</Col>

                    <Col md={6}>
                        <div className="text-md-end footer-links d-none d-md-block">
                            <Link to={{ pathname: '//shunnoit.com/about.html' }} target="_blank">
                                About
                            </Link>
                            <Link to={{ pathname: '//shunnoit.com/service.html' }} target="_blank">
                                Service
                            </Link>
                            <Link to={{ pathname: '//shunnoit.com/contact.html' }} target="_blank">
                                Contact Us
                            </Link>
                        </div>
                    </Col>
                </Row>
            </div>
        </footer>
    );
};

export default Footer;
