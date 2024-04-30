//External Lib Import
import React, { useEffect } from 'react';
import { Card, Button, Modal, Spinner } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import Select from 'react-select';

//Internal Lib Import
import { FormInput, VerticalForm } from '../../../components';
import removeEmptyObj from '../../../helpers/removeEmptyObj';
import MappedComponent from '../../mappedComponent/MappedComponent';

//api services
import { useWarrantyCreateMutation, useWarrantyUpdateMutation } from '../../../redux/services/warrantyService';
import { useSelector } from 'react-redux';

const ModalCreateUpdate = ({ modal, setModal, toggle, editData, defaultValues }) => {
    const { t } = useTranslation();
    const store = useSelector((state) => state.setting.activeStore?._id);
    const [warrantyCreate, { isLoading, isSuccess }] = useWarrantyCreateMutation();
    const [warrantyUpdate, { isLoading: updateLoad, isSuccess: updateSuccess }] = useWarrantyUpdateMutation();

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required(t('please enter name')).min(2, t('minimum containing 2 letters')),
            status: yup.string().required(t('please select status')),
        })
    );

    const inputData = [
        {
            label: t('warranty name'),
            type: 'text',
            name: 'name',
            placeholder: t('please enter name'),
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

    /*
     * handle form submission
     */
    const onSubmit = (formData) => {
        formData.store = store;
        if (!editData) {
            warrantyCreate(removeEmptyObj(formData));
        } else {
            const updatedData = { ...editData, ...formData };
            const postBody = removeEmptyObj(updatedData);
            warrantyUpdate(postBody);
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
                        <h4 className="modal-title">{editData ? t('update warranty') : t('add warranty')}</h4>
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
                            updateTitle={t('update warrnaty')}
                            createTitle={t('add warranty')}
                        />
                    </Modal.Body>
                </Modal>
            </Card.Body>
        </Card>
    );
};

export default ModalCreateUpdate;
