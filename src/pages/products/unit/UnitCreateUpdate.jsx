//External Lib Import
import React, { useEffect, useState } from 'react';
import { Card, Button, Modal, Spinner, Row, Col } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import Select from 'react-select';

//Internal Lib Import
import { FormInput, VerticalForm } from '../../../components';
import removeEmptyObj from '../../../helpers/removeEmptyObj';

//api services
import { useUnitCreateMutation, useUnitUpdateMutation } from '../../../redux/services/unitService';
import { useSelector } from 'react-redux';

const ModalCreateUpdate = ({ modal, setModal, toggle, editData, defaultValues }) => {
    const { t } = useTranslation();
    const [unitCreate, { isLoading, isSuccess }] = useUnitCreateMutation();
    const [unitUpdate, { isLoading: updateLoad, isSuccess: updateSuccess }] = useUnitUpdateMutation();
    const storeID = useSelector((state) => state.setting.activeStore?._id);
    const [multipleUnit, setMultipleUnit] = useState(false);
    const [unitData, setUnitData] = useState({});
    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            code: yup.string().required(t('please enter unit name')).min(2, t('minimum containing 2 letters')),
            status: yup.string().required(t('please select status')),
        })
    );

    const unitHandlerChange = (e) => {
        setUnitData({ ...unitData, [e.target.name]: e.target.value });
    };

    /*
     * handle form submission
     */
    const onSubmit = (formData) => {
        const mergedData = { ...formData, ...unitData };
        console.log(mergedData);

        if (!editData) {
            unitCreate(removeEmptyObj(mergedData));
        } else {
            const updatedData = { ...editData, ...formData };
            const postBody = removeEmptyObj(updatedData);
            unitUpdate(postBody);
        }
    };

    useEffect(() => {
        if (isSuccess || updateSuccess) {
            setModal(false);
        }
    }, [isSuccess, updateSuccess]);

    return (
        <Card className={classNames('', { 'd-none': !modal })}>
            <Card.Body>
                <Modal show={modal} onHide={toggle} backdrop="statica" keyboard={false} size="lg">
                    <Modal.Header onHide={toggle} closeButton>
                        <h4 className="modal-title">{editData ? t('edit unit') : t('add unit')}</h4>
                    </Modal.Header>

                    <Modal.Body>
                        <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={defaultValues}>
                            <div>
                                <label>{t('unit name')}</label>
                                <br />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="name"
                                    className="form-control"
                                    onChange={unitHandlerChange}
                                />
                            </div>
                            <FormInput
                                label={t('short name')}
                                type="text"
                                name="code"
                                placeholder={t('please enter short name')}
                                containerClass={'mb-3'}
                                col={'col-12'}
                            />
                            <FormInput
                                name="status"
                                type="react-select"
                                label={t('status')}
                                col={'col-12'}
                                containerClass={'mb-3'}
                                option={[
                                    { label: 'ACTIVE', value: 'ACTIVE' },
                                    { label: 'INACTIVE', value: 'INACTIVE' },
                                ]}
                            />

                            <FormInput
                                name="allowDecimal"
                                type="react-select"
                                label={t('allow decimal')}
                                col={'col-12'}
                                containerClass={'mb-1'}
                                option={[
                                    { label: 'YES', value: 'YES' },
                                    { label: 'NO', value: 'NO' },
                                ]}
                            />

                            <div>
                                <input
                                    type="checkbox"
                                    id="unit"
                                    placeholder="Add as multiple of other unit "
                                    onChange={() => setMultipleUnit((state) => !state)}
                                />
                                <label for="unit" className="m-2">
                                    {' '}
                                    add as multiple of other unit{' '}
                                </label>

                                <Row className="">
                                    {multipleUnit && (
                                        <>
                                            <Col className="col-3 mt-1">
                                                <span>1 {unitData.name} </span>
                                            </Col>
                                            <Col className="col-1 mt-1">=</Col>

                                            <Col className="col-4 ">
                                                <input
                                                    type="number"
                                                    name="timeBaseUnit"
                                                    placeholder="times base unit"
                                                    className="form-control"
                                                    onChange={unitHandlerChange}
                                                />
                                            </Col>
                                            <Col className="col-4">
                                                <select
                                                    name="baseUnitID"
                                                    id="cars"
                                                    form="carform"
                                                    className="form-control"
                                                    onChange={unitHandlerChange}>
                                                    <option value="">select base unit</option>
                                                    <option value="saab">Saab</option>
                                                    <option value="opel">Opel</option>
                                                    <option value="audi">Audi</option>
                                                </select>
                                            </Col>
                                        </>
                                    )}
                                </Row>
                                <div className="mb-3 mt-3 text-end">
                                    <Button variant="primary" type="submit">
                                        {editData ? t('update unit') : t('add unit')}
                                        &nbsp;{(isLoading || updateLoad) && <Spinner color={'primary'} size={'sm'} />}
                                    </Button>
                                </div>
                            </div>
                        </VerticalForm>
                    </Modal.Body>
                </Modal>
            </Card.Body>
        </Card>
    );
};

export default ModalCreateUpdate;
