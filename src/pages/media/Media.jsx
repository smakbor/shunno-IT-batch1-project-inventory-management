import React, { useState } from 'react';
import { useMediaDeleteMutation, useMediaListQuery, useMediaMultiDeleteMutation } from '../../redux/services/mediaService';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PageTitle from '../../components/PageTitle';
import LoadingData from '../../components/common/LoadingData';
import ErrorDataLoad from '../../components/common/ErrorDataLoad';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { shunnoStorageBaseURL } from '../../config/config';
import useFileUpload from '../../hooks/useFileUpload';
import AleartMessage from '../../utils/AleartMessage';
import PDF from '../../assets/images/FileThumbnail/PDF.png';
import EXCEL from '../../assets/images/FileThumbnail/EXCEL.png';
import FormInput from '../../components/FormInput';

const Media = () => {
    const { handleFileDelete } = useFileUpload();
    const store = useSelector((state) => state.setting.activeStore);
    const [selectAll, setSelectAll] = useState(false);
    const [enlargedId, setEnlargedId] = useState(null);
    const [selected, setSelected] = useState([]);
    const { data, isLoading, isError } = useMediaListQuery(store?._id);
    const [mediaDelete] = useMediaDeleteMutation();
    const [mediaMultiDelete, { isLoading: multiDeleteLoading }] = useMediaMultiDeleteMutation();
    const { t } = useTranslation();
    const baseImageURL = shunnoStorageBaseURL;
    console.log(data);

    const FileCardComponent = ({ item }) => {
        const toggleEnlarged = (id) => {
            setEnlargedId(enlargedId === id ? null : id);
        };

        let source = shunnoStorageBaseURL + item.path;
        if (item.type === 'application/pdf') {
            source = PDF;
        } else if (item.type === 'application/vnd.ms-excel') {
            source = EXCEL;
        }

        return (
            <Col xs={6} md={2}>
                <Card style={{ width: 'auto', height: 'auto' }} className='m-0 mb-2'>
                    <Form.Group className='m-0 p-0' style={{ position: 'absolute', top: '5px', left: '5px', zIndex: '1' }}>
                        <Form.Check
                            type='checkbox'
                            checked={selected.includes(item._id)}
                            onChange={(e) => {
                                const updatedSelected = [...selected];
                                if (e.target.checked) {
                                    updatedSelected.push(item._id);
                                } else {
                                    const index = updatedSelected.indexOf(item._id);
                                    if (index > -1) {
                                        updatedSelected.splice(index, 1);
                                    }
                                }
                                setSelected(updatedSelected);
                            }}
                        />
                    </Form.Group>
                    <Card.Img
                        data-toggle='tooltip'
                        data-placement='top'
                        title={item.name}
                        className={`${enlargedId === item._id ? 'enlarged' : ''}`}
                        height='120px'
                        variant='top'
                        src={source}
                        onClick={() => toggleEnlarged(item._id)}
                        style={{ objectFit: "contain" }}
                    />
                    <Card.Body className='px-1 py-0'>
                        <h6 style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{item.name}</h6>
                        <h6>{(item.size / 1024).toFixed(2)} KB</h6>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <i className='dripicons-expand text-dark btn' onClick={() => toggleEnlarged(item._id)} />
                            </div>
                            <div>
                                <i className='dripicons-trash text-danger btn' onClick={() => AleartMessage.DeleteFile({ id: item._id, store: store._id }, mediaDelete)} />
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        );
    };

    if (isLoading) {
        return (
            <>
                <PageTitle breadCrumbItems={[{ label: t('media'), path: '/media', active: true }]} title={t('media')} />
                <LoadingData />
            </>
        );
    } else if (isError) {
        return (
            <>
                <PageTitle breadCrumbItems={[{ label: t('media'), path: '/media', active: true }]} title={t('media')} />
                <ErrorDataLoad />
            </>
        );
    } else {
        const toggleSelectAll = () => {
            if (selectAll) {
                setSelected([]);
            } else {
                const allIds = data.map((item) => item._id);
                setSelected(allIds);
            }
            setSelectAll(!selectAll);
        };

        const deleteSelectedItems = () => {
            AleartMessage.DeleteFile({ mediaIds: selected, store: store._id }, mediaMultiDelete);
            setSelected([]);
            setSelectAll(false);
        };

        return (
            <>
                <PageTitle breadCrumbItems={[{ label: t('media'), path: '/media', active: true }]} title={t('media')} />
                <div className='d-flex justify-content-start align-items-center'>
                    {data && data.length > 0 &&
                        <FormInput
                            label={t('select all')}
                            name='selectAll'
                            type='checkbox'
                            containerClass='mb-2'
                            labelClassName='fs-3'
                            checked={selectAll}
                            onChange={toggleSelectAll}
                        />}
                    {selected.length > 0 && (
                        <Button variant='danger' className='mb-2 d-block ms-3' disabled={multiDeleteLoading} onClick={deleteSelectedItems}>

                            <span>{t('delete')} ({selected.length})</span>&nbsp;
                            <i className='dripicons-trash' />
                        </Button>
                    )}
                </div>
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body>
                                <Row className='mb-2 mt-0'>
                                    {
                                        data.length === 0 &&
                                        <>
                                            <p className='text-muted fs-1 text-center'>
                                                No File Uploaded!
                                            </p>
                                        </>
                                    }
                                    {data &&
                                        data.map((item) => <FileCardComponent item={item} key={item._id} />)
                                    }
                                </Row>
                                {/* <div className='text-center' style={{ position: 'fixed', bottom: '10%', left: '50%', transform: 'translateX(-50%)' }}>
                                    {selected.length > 0 && (
                                        <Button variant='danger' className='mb-2' disabled={multiDeleteLoading} onClick={deleteSelectedItems}>
                                            {t('delete')} {selected.length} {t('items')}
                                        </Button>
                                    )}
                                </div> */}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </>
        );
    }
};

export default Media;
