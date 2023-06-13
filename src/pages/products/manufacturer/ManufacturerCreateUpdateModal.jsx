//External Lib Import
import React, { useEffect } from 'react';
import { Card, Button, Modal, Spinner } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

//Internal Lib Import
import removeEmptyObj from '../../../helpers/removeEmptyObj';
import MappedComponent from '../../contacts/mappedComponent/MappedComponent';
//api services

import {
    useManufacturerCreateMutation,
    useManufacturerUpdateMutation,
} from '../../../redux/services/manufacturerService';
import { useSelector } from 'react-redux';

const ManufacturerCreateUpdateModal = ({ modal, setModal, toggle, setEditData, editData, defaultValues }) => {
    const { t } = useTranslation();
    const store = useSelector((state) => state.setting.activeStore?._id);
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

    const inputData = [
        {
            label: t('manufacturer name'),
            type: 'text',
            name: 'name',
            placeholder: t('please enter manufacturer name'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-12 col-lg-12',
            required: true,
        },
        {
            label: t('status'),
            type: 'react-select',
            name: 'status',
            placeholder: t('please enter status'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-12 col-lg-12',
            required: false,
            options: [
                { label: 'please select status', value: '' },
                { label: 'active', value: 'ACTIVE' },
                { label: 'inactive', value: 'INACTIVE' },
            ],
        },
    ];

    const onSubmit = (formData) => {
        formData.store = store;
        if (!editData) {
            manufacturerCreate(removeEmptyObj(formData));
        } else {
            const updatedData = { ...editData, ...formData };
            const postBody = removeEmptyObj(updatedData);
            manufacturerUpdate(postBody);
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
                        <MappedComponent
                            inputField={inputData}
                            onSubmit={onSubmit}
                            defaultValues={defaultValues}
                            schemaResolver={schemaResolver}
                            isLoading={isLoading}
                            updateLoad={updateLoad}
                            editData={editData}
                            updateTitle={t('update manufacturer')}
                            createTitle={t('create manufacturer')}
                        />
                    </Modal.Body>
                </Modal>
            </Card.Body>
        </Card>
    );
};

export default ManufacturerCreateUpdateModal;
