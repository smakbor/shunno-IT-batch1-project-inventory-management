import React, { useState } from 'react';
import { useMediaDeleteMutation, useMediaListQuery } from '../../redux/services/mediaService';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PageTitle from '../../components/PageTitle';
import LoadingData from '../../components/common/LoadingData';
import ErrorDataLoad from '../../components/common/ErrorDataLoad';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { shunnoStorageBaseURL } from '../../config/config';
import useFileUpload from '../../hooks/useFileUpload';
import AleartMessage from '../../utils/AleartMessage';

const Media = () => {
    const { handleFileDelete } = useFileUpload()
    const store = useSelector(state => state.setting.activeStore)
    const [enlargedId, setEnlargedId] = useState(null)
    const [selected, setSelected] = useState([])
    const { data, isLoading, isError } = useMediaListQuery(store?._id)
    const [mediaDelete] = useMediaDeleteMutation()
    const { t } = useTranslation();
    const baseImageURL = shunnoStorageBaseURL;
    console.log(data)
    const FileCardComponent = ({ item }) => {
        const toggleEnlarged = (id) => {
            setEnlargedId(enlargedId === id ? null : id);
        }
        console.log(selected)
        return (
            <Col xs={6} md={2}>
                <Card style={{ width: 'auto', height: "auto" }} className='m-0'>
                    <Form.Group className="m-0 p-0" style={{ position: 'absolute', top: "5px", left: "5px", zIndex: "1" }}>
                        <Form.Check type="checkbox" checked={selected.includes(item._id)} onChange={(e) => e.target.checked ? setSelected([...selected, item._id]) : setSelected(selected.filter(s => s !== item._id))} />
                    </Form.Group>
                    <Card.Img
                        data-toggle="tooltip"
                        data-placement="top"
                        title={item.name}
                        className={`${enlargedId === item._id ? "enlarged" : ""}`}
                        height="120px" variant="top"
                        src={shunnoStorageBaseURL + item.path}
                        onClick={() => toggleEnlarged(item._id)} />
                    <Card.Body className='px-1 py-0'>
                        <h6 style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{item.name}</h6>
                        <h6>{(item.size / 1024).toFixed(2)} KB</h6>
                        <div className='d-flex justify-content-between'>
                            <div><i className='dripicons-expand text-dark btn' onClick={() => toggleEnlarged(item._id)} /></div>
                            <div><i className='dripicons-trash text-danger btn' onClick={() => AleartMessage.DeleteFile({ id: item._id, store: store._id }, mediaDelete)} /></div>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        )
    }
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

                                <Row className="mb-2 mt-0">
                                    {
                                        data && data.map(
                                            item => <FileCardComponent item={item} key={item._id} />
                                        )
                                    }
                                </Row>
                                <div className='text-center' style={{ position: 'fixed', bottom: "10%", left: "50%", transform: 'translateX(-50%)' }}>
                                    {
                                        selected && selected.length > 0 &&
                                        <Button variant='danger' className='mb-2' onClick={() => window.alert("deleted")}>Delete {selected.length} items?</Button>
                                    }
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </>
        );
    }
};

export default Media;