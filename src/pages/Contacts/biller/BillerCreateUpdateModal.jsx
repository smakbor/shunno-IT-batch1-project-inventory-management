//External Lib Import
import React, { useEffect, useState } from 'react';
import { Card, Button, Modal, Spinner, Col, Row } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

//Internal Lib Import

import removeEmptyObj from '../../../helpers/removeEmptyObj';
import MappedComponent from '../../../pages/mappedComponent/MappedComponent';
//api services

import { useBillerCreateMutation, useBillerUpdateMutation } from '../../../redux/services/billerService';

const BillerCreateUpdateModal = ({ modal, setModal, toggle, editData, defaultValues }) => {
    const { t } = useTranslation();
    //store id
    const store = useSelector((state) => state.setting.activeStore?._id);
    const [billerCreate, { isLoading, isSuccess, error }] = useBillerCreateMutation();
    const [billerUpdate, { isLoading: updateLoad, isSuccess: updateSuccess }] = useBillerUpdateMutation();
    const [err, setErr] = useState('');

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required(t('please enter name')).min(3, t('minimum containing 3 letter')),
            mobile: yup
                .string()
                .required(t('please enter mobile number'))
                .matches(/^(?:\+?88|0088)?01[3-9]\d{8}$/, t('enter valid number')),

            status: yup.string().required(t('please select status')),
            email: yup.string().email('please valid email'),
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

    // handle input field

    const inputData = [
        {
            label: t(' name'),
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
            label: t('father name '),
            type: 'text',
            name: 'fatherName',
            placeholder: t('please enter father name'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
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
            label: t('previous due'),
            type: 'number',
            name: 'due',
            placeholder: t('please enter previous due'),
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
            label: t('city'),
            type: 'text',
            name: 'city',
            placeholder: t('please enter city'),
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
            label: t('description'),
            type: 'text',
            name: 'description',
            placeholder: t('please enter description'),
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
    ];

    /*
     * handle form submission
     */

    const onSubmit = (formData) => {
        console.log(formData);
        formData.store = store;
        formData.due = Number(formData.due);
        if (!editData) {
            billerCreate(removeEmptyObj(formData));
        } else {
            const updatedData = { ...editData, ...formData };
            billerUpdate(removeEmptyObj(updatedData));
        }
    };

    return (
        <Card className={classNames('', { 'd-none': !modal })}>
            <Card.Body>
                <Modal show={modal} onHide={toggle} backdrop="statica" keyboard={false} size="xl">
                    <Modal.Header onHide={toggle} closeButton>
                        <h4 className="modal-title">{editData ? t('update biller') : t('add biller')}</h4>
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
                            updateTitle={t('update biller')}
                            createTitle={t('add biller')}
                        />
                    </Modal.Body>
                </Modal>
            </Card.Body>
        </Card>
    );
};

export default BillerCreateUpdateModal;
