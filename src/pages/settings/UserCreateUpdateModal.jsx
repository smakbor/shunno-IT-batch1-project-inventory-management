//External Lib Import
import React, { useEffect, useState } from 'react';
import { Card, Button, Modal, Spinner, Row, Col } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';

//Internal Lib Import
import { FormInput } from '../../components';
import removeEmptyObj from '../../helpers/removeEmptyObj';
import { useRoleListQuery } from '../../redux/services/roleService';

//api services
import { useStaffCreateMutation, useStaffUpdateMutation } from '../../redux/services/staffService';

const StaffCreateUpdateModal = ({ modal, setModal, toggle, editData, defaultValues }) => {
    const { t } = useTranslation();
    const { activeStore } = useSelector((state) => state.setting);
    const { data: allRoles } = useRoleListQuery(activeStore?._id, {
        skip: !activeStore?._id,
    });

    const [staffCreate, { isLoading, isSuccess }] = useStaffCreateMutation();
    const [staffUpdate, { isLoading: updateLoad, isSuccess: updateSuccess }] = useStaffUpdateMutation();

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required(t('please enter name')).max(40, t('maximum containing 40 letter')),
            // roleID: yup.string().required(t('please select role')),
            mobile: yup
                .string()
                .required(t('please enter mobile'))
                .matches(/(^(\+88|0088|88)?(01){1}[3456789]{1}(\d){8})$/, t('write 11 digit mobile number')),
            status: yup.string().required(t('please select status')),
            ...(!editData && {
                password: yup
                    .string()
                    .required(t('please enter password'))
                    .min(8, t('password must be at least 8 characters'))
                    .matches(
                        /^(?=.*[0-9])(?=.*[a-zA-Z])(?=\S+$).{6,20}$/,
                        'password must contain at least 1 letter and 1 number'
                    ),
            }),
            ...(!editData && {
                confirmPassword: yup.string().oneOf([yup.ref('password'), null], t('passwords must match')),
            }),
            fatherName: yup.string(),
            email: yup.string().email(t('not a proper email')),
            nid: yup.string(),
            address: yup.string(),
            thana: yup.string(),
            district: yup.string(),
            salary: yup.string(),
            due: yup.string(),
            remarks: yup.string(),
            dateOfJoining: yup.string(),
            dateOfBirth: yup.string(),
            reference: yup
                .object({
                    name: yup.string(),
                    mobile: yup
                        .string()
                        .matches(/(^$|^(\+88|0088|88)?(01){1}[3456789]{1}(\d){8})$/, t('write 11 digit mobile number'))
                        .nullable()
                        .notRequired(),
                    address: yup.string(),
                    nid: yup.string(),
                    relation: yup.string(),
                })
                .required(),
        })
    );

    /*
     * form methods
     */
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

    let watchValueJoining = useWatch({
        control,
        name: 'dateOfJoining',
    });

    let watchValueBirth = useWatch({
        control,
        name: 'dateOfBirth',
    });

    /*
     * handle form submission
     */
    const onSubmit = (formData) => {
        formData.storeID = activeStore?._id;
        delete formData.confirmPassword;
        if (!editData) {
            staffCreate(removeEmptyObj(formData));
        } else {
            const postBody = removeEmptyObj(formData);
            staffUpdate({ id: editData._id, postBody });
        }
    };

    useEffect(() => {
        if (isSuccess || updateSuccess) {
            setModal(false);
        }
    }, [isSuccess, updateSuccess]);

    const inputData = [
        {
            label: t('role id'),
            type: 'select',
            name: 'roleID',
            placeholder: t('select user role'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
            options: allRoles,
        },
        {
            label: t('select user status'),
            type: 'react-select',
            name: 'status',
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: true,
            options: [
                { label: 'please select status', value: '' },
                { label: 'ACTIVE', value: 'ACTICE' },
                { label: 'BLOCKED', value: 'BLOCKED' },
                { label: 'BANNED', value: 'BANNED' },
            ],
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
            placeholder: t('please enter mobile'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: true,
        },
        {
            label: t('password'),
            type: 'password',
            name: 'password',
            placeholder: t('please enter password'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: true,
        },
        {
            label: t('confirm password'),
            type: 'password',
            name: 'confirmPassword',
            placeholder: t('please enter confirm password'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: true,
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
            label: t('date of joining'),
            type: 'datePicker',
            name: 'dateOfJoining',
            placeholder: t('please enter date of joining'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
            watchValue: watchValueJoining,
            setValue: setValue,
        },
        {
            label: t('date of birth'),
            type: 'datePicker',
            name: 'dateOfBirth',
            placeholder: t('please enter date of birth'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
            watchValue: watchValueBirth,
            setValue: setValue,
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
            label: t('father name'),
            type: 'text',
            name: 'fatherName',
            placeholder: t('please enter father name'),
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
            label: t('nid'),
            type: 'text',
            name: 'nid',
            placeholder: t('please enter nid'),
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
            label: t('salary'),
            type: 'number',
            name: 'salary',
            placeholder: t('please enter salary'),
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

    const MappedComponent = () =>
        inputData.map((item) => {
            console.log(item.options);
            if (item.name === 'status' && editData) {
                return (
                    <Col className={item.col}>
                        <FormInput
                            label={item.label}
                            type={item.type}
                            name={item.name}
                            containerClass={item.containerClass}
                            placeholder={item.placeholder}
                            required={item.required}
                            register={register}
                            errors={errors}>
                            {item.type == 'select'
                                ? item.options?.map((opt) => <option value={opt.value}>{opt.label}</option>)
                                : ''}
                        </FormInput>
                    </Col>
                );
            } else if (editData && item.type == 'password') {
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
                            errors={errors}>
                            {item.type == 'select'
                                ? item.options?.map((opt) => <option value={opt.value}>{opt.label}</option>)
                                : ''}
                        </FormInput>
                    </Col>
                );
            } else {
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
                            option={item?.options}
                            watchValue={item.watchValue}
                            setValue={item.setValue}>
                            {/* {item.type == 'select'
                                ? item.options?.map((opt) => <option value={opt.value}>{opt.label}</option>)
                                : ''} */}
                        </FormInput>
                    </Col>
                );
            }
        });

    return (
        <Card className={classNames('', { 'd-none': !modal })}>
            <Card.Body>
                <Modal show={modal} onHide={toggle} backdrop="statica" keyboard={false} size="xl">
                    <Modal.Header onHide={toggle} closeButton>
                        <h4 className="modal-title">{editData ? t('update user') : t('create user')}</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSubmit(onSubmit)} className={'formClass'} noValidate>
                            <Row>
                                <MappedComponent />
                                <div className="mb-3 text-end">
                                    <Button variant="primary" type="submit">
                                        {editData ? t('update user') : t('create user')}
                                        &nbsp;
                                        {(isLoading || updateLoad) && <Spinner color={'primary'} size={'sm'} />}
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

export default StaffCreateUpdateModal;
