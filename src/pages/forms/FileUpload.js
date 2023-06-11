// @flow
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

// components
import PageTitle from '../../components/PageTitle';
import FileUploader from '../../components/FileUploader';
import { useTranslation } from 'react-i18next';

const FileUpload = () => {
    const { t } = useTranslation();
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: t("media"), path: '/media' },
                    { label: t("media upload"), path: '/media/upload', active: true },
                ]}
                title={t('media upload')}
            />

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <FileUploader />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default FileUpload;
