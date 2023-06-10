//External Lib Import
import React, { useEffect, useState } from 'react';
import { Card, Button, Modal, Spinner, Row, Col } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

//Internal Lib Import
import { FormInput, VerticalForm } from '../../../components';
import removeEmptyObj from '../../../helpers/removeEmptyObj';

//api services

import { useSupplierCreateMutation, useSupplierUpdateMutation } from '../../../redux/services/suppliersService';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

const SupplierCreateUpdateModal = ({ modal, setModal, toggle, editData, defaultValues }) => {
    const { t } = useTranslation();
    const storeID = useSelector((state) => state.setting.activeStore?._id);
    const store = useSelector((state) => state.setting.activeStore);
    const [supplierCreate, { isLoading, isSuccess }] = useSupplierCreateMutation();
    const [supplierUpdate, { isLoading: updateLoad, isSuccess: updateSuccess }] = useSupplierUpdateMutation();

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required(t('please enter customer name')).min(3, t('minimum containing 3 letter')),
            fatherName: yup.string(),
            address: yup.string(),
            mobile: yup.string().required(t('enter mobile number')),
            // .matches(/^(?:\+?88|0088)?01[3-9]\d{8}$/),
            email: yup.string().email(),
            nid: yup.string(),
        })
    );

    const methods = useForm({ mode: 'onChange', defaultValues, resolver: schemaResolver });
    const {
        handleSubmit,
        register,
        control,
        setValue,
        reset,
        formState: { errors },
    } = methods;
    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

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
            required: true,
        },
        {
            label: t(' name'),
            type: 'text',
            name: 'name',
            placeholder: t('please enter suppliler name'),
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
            placeholder: t('please enter supplier email'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: true,
        },
        {
            label: t('NID'),
            type: 'text',
            name: 'nid',
            placeholder: t('please enter supplier nid'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: true,
        },
        {
            label: t('address'),
            type: 'text',
            name: 'address',
            placeholder: t('please enter supplier address'),
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
            label: t('previous due'),
            type: 'number',
            name: 'due',
            placeholder: t('please enter supplier previous due'),
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
            placeholder: t('please enter reference address'),
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
            required: false,
            options: [
                { label: 'please select status', value: '' },
                { label: 'new', value: 'NEW' },
                { label: 'active', value: 'ACTIVE' },
                { label: 'inactive', value: 'INACTIVE' },
                { label: 'banned', value: 'BANNED' },
                { label: 'deleted', value: 'DELETED' },
            ],
            control: control,
            defaultValues: defaultValues,
        },
    ];

    const onSubmit = (formData) => {
        console.log(formData);
        formData.store = storeID;
        formData.due = Number(formData.due);

        if (!editData) {
            supplierCreate(removeEmptyObj(formData));
        } else {
            const updatedData = { ...editData, ...formData };
            supplierUpdate(removeEmptyObj(updatedData));
        }
    };

    const MappedComponent = () =>
        inputData.map((item) => {
            return (
                <Col className={item.col}>
                    <FormInput
                        label={item.label}
                        type={item.type}
                        name={item.name}
                        placeholder={item.placeholder}
                        containerClass={item.containerClass}
                        required={item.required}
                        register={register}
                        errors={errors}
                        option={item.options}
                        control={item.control}
                        setValue={item.setValue}
                        defaultValues={item.defaultValues}></FormInput>
                </Col>
            );
        });

    return (
        <Card className={classNames('', { 'd-none': !modal })}>
            <Card.Body>
                <Modal show={modal} onHide={toggle} backdrop="statica" keyboard={false} size="xl">
                    <Modal.Header onHide={toggle} closeButton>
                        <h4 className="modal-title">{editData ? t('update supplier') : t('add supplier')}</h4>
                    </Modal.Header>

                    <Modal.Body>
                        <form onSubmit={handleSubmit(onSubmit)} className={'formClass'} noValidate>
                            <Row>
                                <MappedComponent />
                                <div className="mt-3 text-end">
                                    <Button variant="primary" type="submit">
                                        {editData ? t('update supplier') : t('create supplier')}
                                        &nbsp;{(isLoading || updateLoad) && <Spinner color={'primary'} size={'sm'} />}
                                    </Button>
                                </div>
                            </Row>
                        </form>
                    </Modal.Body>
                </Modal>
            </Card.Body>
        </Card>
    );
};

export default SupplierCreateUpdateModal;
