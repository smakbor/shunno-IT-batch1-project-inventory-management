//External Lib Import
import React, { useEffect } from 'react';
import { Card, Button, Modal, Spinner, Col, Row } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

//Internal Lib Import

import removeEmptyObj from '../../../helpers/removeEmptyObj';
import MappedComponent from '../mappedComponent/MappedComponent';
//api services

import { useCustomerCreateMutation, useCustomerUpdateMutation } from '../../../redux/services/customerService';

const CustomerCreateUpdateModal = ({ modal, setModal, toggle, editData, defaultValues }) => {
    const { t } = useTranslation();
    //store id
    const store = useSelector((state) => state.setting.activeStore?._id);
    const [customerCreate, { isLoading, isSuccess }] = useCustomerCreateMutation();
    const [customerUpdate, { isLoading: updateLoad, isSuccess: updateSuccess }] = useCustomerUpdateMutation();

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required(t('please enter customer name')).min(3, t('minimum containing 3 letter')),
            customerType: yup.string().required(t('please select customer type')),
            mobile: yup
                .string()
                .required(t('enter mobile number'))
                .matches(/^(?:\+?88|0088)?01[3-9]\d{8}$/, t('enter valid number')),

            ledgerNumber: yup.string(),
            status: yup.string().required(t('please select status')),
            email: yup.string().email('please valid email'),
        })
    );

    useEffect(() => {
        if (isSuccess || updateSuccess) {
            setModal(false);
        }
    }, [isSuccess, updateSuccess]);

    // handle input field

    const inputData = [
        {
            label: t('customer type'),
            type: 'react-select',
            name: 'customerType',
            placeholder: t('please enter customer type'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: true,
            options: [
                { label: 'please select customer type', value: '' },
                { label: 'retail', value: 'RETAIL' },
                { label: 'wholesale', value: 'WHOLESALE' },
            ],
        },
        {
            label: t('status'),
            type: 'react-select',
            name: 'status',
            placeholder: t('please enter status'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: true,
            options: [
                { label: 'please select status', value: '' },
                { label: 'new', value: 'NEW' },
                { label: 'active', value: 'ACTIVE' },
                { label: 'inactive', value: 'INACTIVE' },
                { label: 'banned', value: 'BANNED' },
                { label: 'delete', value: 'DELETED' },
            ],
        },
        {
            label: t(' name'),
            type: 'text',
            name: 'name',
            placeholder: t('please enter customer name'),
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
            label: t('father name '),
            type: 'text',
            name: 'fatherName',
            placeholder: t('please enter customer father name'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
        },
        {
            label: t('email'),
            type: 'email',
            name: 'email',
            placeholder: t('please enter customer email'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
        },
        {
            label: t('NID'),
            type: 'text',
            name: 'nid',
            placeholder: t('please enter customer nid'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
        },
        {
            label: t('address'),
            type: 'text',
            name: 'address',
            placeholder: t('please enter customer address'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
        },

        {
            label: t('previous due'),
            type: 'number',
            name: 'due',
            placeholder: t('please enter customer previous due'),
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
            label: t('reference name'),
            type: 'text',
            name: 'reference.name',
            placeholder: t('please enter reference name'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
        },
        {
            label: t('reference mobile'),
            type: 'text',
            name: 'reference.mobile',
            placeholder: t('please enter supplier mobile'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
        },
        {
            label: t('reference address'),
            type: 'text',
            name: 'reference.address',
            placeholder: t('please enter reference address'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
        },
        {
            label: t('reference nid'),
            type: 'text',
            name: 'reference.nid',
            placeholder: t('please enter reference nid'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
        },

        {
            label: t('reference relation'),
            type: 'text',
            name: 'reference.relation',
            placeholder: t('please enter reference relation'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
        },
    ];

    /*
     * handle form submission
     */

    const onSubmit = (formData) => {
        formData.store = store;
        formData.due = Number(formData.due);
        if (!editData) {
            customerCreate(removeEmptyObj(formData));
        } else {
            const updatedData = { ...editData, ...formData };
            customerUpdate(removeEmptyObj(updatedData));
        }
    };

    return (
        <Card className={classNames('', { 'd-none': !modal })}>
            <Card.Body>
                <Modal show={modal} onHide={toggle} backdrop="statica" keyboard={false} size="xl">
                    <Modal.Header onHide={toggle} closeButton>
                        <h4 className="modal-title">{editData ? t('update customer') : t('create customer')}</h4>
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
                            updateTitle={t('update customer')}
                            createTitle={t('create customer')}
                        />
                    </Modal.Body>
                </Modal>
            </Card.Body>
        </Card>
    );
};

export default CustomerCreateUpdateModal;
