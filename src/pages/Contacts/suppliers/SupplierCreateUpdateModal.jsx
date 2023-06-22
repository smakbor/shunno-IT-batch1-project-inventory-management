//External Lib Import
import React, { useEffect } from 'react';
import { Card, Modal } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

//Internal Lib Import

import removeEmptyObj from '../../../helpers/removeEmptyObj';
import MappedComponent from '../../../pages/mappedComponent/MappedComponent';

//api services

import { useSupplierCreateMutation, useSupplierUpdateMutation } from '../../../redux/services/suppliersService';

const SupplierCreateUpdateModal = ({ modal, setModal, toggle, editData, defaultValues }) => {
    const { t } = useTranslation();
    const storeID = useSelector((state) => state.setting.activeStore?._id);
    const store = useSelector((state) => state.setting.activeStore);
    const [supplierCreate, { isLoading, isSuccess, error }] = useSupplierCreateMutation();
    const [supplierUpdate, { isLoading: updateLoad, isSuccess: updateSuccess }] = useSupplierUpdateMutation();

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            // company: yup.string().required(t('please enter company name')),
            name: yup.string().required(t('please enter customer name')).min(3, t('minimum containing 3 letter')),
            fatherName: yup.string(),
            address: yup.string(),
            mobile: yup
                .string()
                .required(t('enter mobile number'))
                .matches(/^(?:\+?88|0088)?01[3-9]\d{8}$/, t('please enter valid mobile number')),
            email: yup.string().email(),
            nid: yup.string(),
            reference: yup.object().shape({
                name: yup.string(),
                address: yup.string(),
                nid: yup.string(),
                relation: yup.string(),
            }),
        })
    );

    useEffect(() => {
        if (isSuccess || updateSuccess) {
            setModal(false);
        }
    }, [isSuccess, updateSuccess]);

    const inputData = [
        {
            label: t('company name'),
            type: 'text',
            name: 'company',
            placeholder: t('please enter company name'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
        },
        {
            label: t('name'),
            type: 'text',
            name: 'name',
            placeholder: t('please enter name'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: true,
        },
        {
            label: t('mobile'),
            type: 'text',
            name: 'mobile',
            placeholder: t('please enter mobile number'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: true,
        },
        {
            label: t('email'),
            type: 'email',
            name: 'email',
            placeholder: t('please enter email'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
        },
        {
            label: t('NID'),
            type: 'text',
            name: 'nid',
            placeholder: t('please enter nid'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
        },
        {
            label: t('address'),
            type: 'text',
            name: 'address',
            placeholder: t('please enter address'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
        },
        {
            label: t('father name'),
            type: 'text',
            name: 'fatherName',
            placeholder: t('please enter father name'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
        },
        {
            label: t('remarks'),
            type: 'text',
            name: 'remarks',
            placeholder: t('please enter remarks'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
        },
        {
            label: t('thana'),
            type: 'text',
            name: 'thana',
            placeholder: t('please enter thana'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
        },
        {
            label: t('district'),
            type: 'text',
            name: 'district',
            placeholder: t('please enter district'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
        },
        {
            label: t('country'),
            type: 'text',
            name: 'country',
            placeholder: t('please enter country'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
        },
        {
            label: t('previous due'),
            type: 'number',
            name: 'due',
            placeholder: t('please enter previous due'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
        },
        {
            label: t('reference name'),
            type: 'text',
            name: 'reference.name',
            placeholder: t('please enter reference name'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            nested: true,
            required: false,
        },
        {
            label: t('reference mobile'),
            type: 'text',
            name: 'reference.mobile',
            placeholder: t('please enter reference mobile'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            nested: true,
            required: false,
        },
        {
            label: t('reference address'),
            type: 'text',
            name: 'reference.address',
            placeholder: t('please enter reference address'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            nested: true,
            required: false,
        },
        {
            label: t('reference nid'),
            type: 'text',
            name: 'reference.nid',
            placeholder: t('please enter reference nid'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            nested: true,
            required: false,
        },
        {
            label: t('reference relation'),
            type: 'text',
            name: 'reference.relation',
            placeholder: t('please enter reference address'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            nested: true,
            required: false,
        },
    ];

    const onSubmit = (formData) => {
        formData.store = storeID;
        formData.due = Number(formData.due);
        if (!editData) {
            supplierCreate(removeEmptyObj(formData));
            // .then(({ data: { message } }) => AleartMessage.SuccessFul(message));
        } else {
            const updatedData = { ...editData, ...formData };
            supplierUpdate(removeEmptyObj(updatedData));
            // .then(({ data: { message } }) => AleartMessage.SuccessFul(message));
        }
    };

    return (
        <Card className={classNames('', { 'd-none': !modal })}>
            <Card.Body>
                <Modal show={modal} onHide={toggle} backdrop="statica" keyboard={false} size="xl">
                    <Modal.Header onHide={toggle} closeButton>
                        <h4 className="modal-title">{editData ? t('update supplier') : t('add supplier')}</h4>
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
                            updateTitle={t('update supplier')}
                            createTitle={t('add supplier')}
                            error={error?.data}
                        />
                    </Modal.Body>
                </Modal>
            </Card.Body>
        </Card>
    );
};

export default SupplierCreateUpdateModal;
