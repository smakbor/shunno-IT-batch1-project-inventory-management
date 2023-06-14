import React from 'react';
import { useMediaDeleteMutation, useMediaListQuery } from '../../redux/services/mediaService';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PageTitle from '../../components/PageTitle';
import LoadingData from '../../components/common/LoadingData';
import ErrorDataLoad from '../../components/common/ErrorDataLoad';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { shunnoStorageBaseURL } from '../../config/config';
import useFileUpload from '../../hooks/useFileUpload';

const Media = () => {
    const { handleFileDelete } = useFileUpload()
    const store = useSelector(state => state.setting.activeStore)
    const { data, isLoading, isError } = useMediaListQuery(store._id)
    const [mediaDelete] = useMediaDeleteMutation()
    const { t } = useTranslation();
    const baseImageURL = shunnoStorageBaseURL;
    console.log(data)

    const FileCardComponent = ({ item }) => (
        <Col xs={6} md={2}>
            <Card style={{ width: 'auto', height: "auto" }}>
                <Card.Img height="120px" variant="top" src={shunnoStorageBaseURL + item.path} />
                <Card.Body className='p-0'>

                    <i className='dripicons-trash text-danger btn' onClick={() => mediaDelete({ id: item._id, store: store._id })} />
                </Card.Body>
            </Card>
        </Col>
    )
    if (isLoading) {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[{ label: t('media'), path: '/media', active: true }]}
                    title={t('media')}
                />
                <LoadingData />
            </>
        );
    } else if (isError) {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[{ label: t('media'), path: '/media', active: true }]}
                    title={t('media')}
                />
                <ErrorDataLoad />
            </>
        );
    } else {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[{ label: t('media'), path: '/media', active: true }]}
                    title={t('media')}
                />

                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body>
                                <Row className="mb-2">
                                    {
                                        data && data.map(
                                            item => <FileCardComponent item={item} key={item._id} />
                                        )
                                    }
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </>
        );
    }
};

export default Media;