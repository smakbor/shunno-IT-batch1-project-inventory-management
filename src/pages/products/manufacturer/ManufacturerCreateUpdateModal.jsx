//External Lib Import
import React, { useEffect } from 'react';
import { Card, Button, Modal, Spinner } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

//Internal Lib Import
import { FormInput, VerticalForm } from '../../../components';
import removeEmptyObj from '../../../helpers/removeEmptyObj';

//api services

import {
    useManufacturerCreateMutation,
    useManufacturerUpdateMutation,
} from '../../../redux/services/manufacturerService';
import { useSelector } from 'react-redux';

const ManufacturerCreateUpdateModal = ({ modal, setModal, toggle, setEditData, editData, defaultValues }) => {
    const { t } = useTranslation();
    const storeID = useSelector(state => state.setting.activeStore._id)
    const [manufacturerCreate, { isLoading, isSuccess }] = useManufacturerCreateMutation();
    const [manufacturerUpdate, { isLoading: updateLoad, isSuccess: updateSuccess }] = useManufacturerUpdateMutation();

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required(t('please enter manufacturer name')).min(2, t('minimum containing 2 letter')),
        })
    );

    const onSubmit = (formData) => {
        const data = {};
        data.name = formData.name;
        data.status = formData.status;
        if (!editData) {
            manufacturerCreate({ storeID, postBody: removeEmptyObj(data) });
        } else {
            const updatedData = { ...editData, ...data }
            const postBody = removeEmptyObj(updatedData);
            manufacturerUpdate({ id: editData._id, postBody });
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
                <Modal show={modal} onHide={toggle} backdrop="statica" keyboard={false}>
                    <Modal.Header onHide={toggle} closeButton>
                        <h4 className="modal-title">
                            {editData ? t('update manufacturer') : t('create manufacturer')}
                        </h4>
                    </Modal.Header>

                    <Modal.Body>
                        <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={defaultValues}>
                            <FormInput
                                label={t('manufacturer name')}
                                type="text"
                                name="name"
                                placeholder={t('please enter manufacturer name')}
                                containerClass={'mb-3'}
                                col={'col-12'}
                            />
                            {
                                <FormInput
                                    name="status"
                                    type="select"
                                    label={t('status')}
                                    defaultValue="ACTIVE"
                                    col={'col-12'}
                                    containerClass={'mb-3'}>
                                    <option value="ACTIVE">Active</option>
                                    <option value="INACTIVE">Inactive</option>
                                </FormInput>
                            }

                            <div className="mb-3 text-end">
                                <Button variant="primary" type="submit">
                                    {editData ? t('update manufacturer') : t('create manufacturer')}
                                    &nbsp;{(isLoading || updateLoad) && <Spinner color={'primary'} size={'sm'} />}
                                </Button>
                            </div>
                        </VerticalForm>
                    </Modal.Body>
                </Modal>
            </Card.Body>
        </Card>
    );
};

export default ManufacturerCreateUpdateModal;
