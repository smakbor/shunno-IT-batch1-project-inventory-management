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
            roleID: yup.string().required(t('please select role')),
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

    return (
        <Card className={classNames('', { 'd-none': !modal })}>
            <Card.Body>
                <Modal show={modal} onHide={toggle} backdrop="statica" keyboard={false} size="lg">
                    <Modal.Header onHide={toggle} closeButton>
                        <h4 className="modal-title">{editData ? t('update user') : t('create user')}</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSubmit(onSubmit)} className={'formClass'} noValidate>
                            <Row>
                                <Col className={'col-12 col-md-6 col-lg-4'}>
                                    <FormInput
                                        name="roleID"
                                        type="select"
                                        label={t('select user role')}
                                        containerClass={'mb-3'}
                                        required={true}
                                        register={register}
                                        errors={errors}>
                                        <option value="">{t('select user role')}</option>
                                        {allRoles &&
                                            allRoles.map((role) => (
                                                <option key={role._id} value={role._id}>
                                                    {role.name}
                                                </option>
                                            ))}
                                    </FormInput>
                                </Col>
                                {editData && (
                                    <Col className={'col-12 col-md-6 col-lg-4'}>
                                        <FormInput
                                            name="status"
                                            type="select"
                                            label={t('select user status')}
                                            containerClass={'mb-3'}
                                            required={true}
                                            register={register}
                                            errors={errors}>
                                            <option value="">{t('select user role')}</option>
                                            <option value="ACTIVE">{t('ACTIVE')}</option>
                                            <option value="BLOCKED">{t('BLOCKED')}</option>
                                            <option value="BANNED">{t('BANNED')}</option>
                                        </FormInput>
                                    </Col>
                                )}
                                <Col className={'col-12 col-md-6 col-lg-4'}>
                                    <FormInput
                                        label={t('name')}
                                        type="text"
                                        name="name"
                                        placeholder={t('please enter name')}
                                        containerClass={'mb-3'}
                                        required={true}
                                        register={register}
                                        errors={errors}
                                    />
                                </Col>
                                <Col className={'col-12 col-md-6 col-lg-4'}>
                                    <FormInput
                                        label={t('mobile')}
                                        type="text"
                                        name="mobile"
                                        placeholder={t('please enter mobile')}
                                        containerClass={'mb-3'}
                                        required={true}
                                        register={register}
                                        errors={errors}
                                    />
                                </Col>
                                {!editData && (
                                    <Col className={'col-12 col-md-6 col-lg-4'}>
                                        <FormInput
                                            label={t('password')}
                                            type="password"
                                            name="password"
                                            placeholder={t('please enter password')}
                                            containerClass={'mb-3'}
                                            required={true}
                                            register={register}
                                            errors={errors}
                                        />
                                    </Col>
                                )}
                                {!editData && (
                                    <Col className={'col-12 col-md-6 col-lg-4'}>
                                        <FormInput
                                            label={t('confirm password')}
                                            type="password"
                                            name="confirmPassword"
                                            placeholder={t('please enter confirm password')}
                                            containerClass={'mb-3'}
                                            required={true}
                                            register={register}
                                            errors={errors}
                                        />
                                    </Col>
                                )}
                                <Col className={'col-12 col-md-6 col-lg-4'}>
                                    <FormInput
                                        label={t('address')}
                                        type="text"
                                        name="address"
                                        placeholder={t('please enter address')}
                                        containerClass={'mb-3'}
                                        register={register}
                                        errors={errors}
                                    />
                                </Col>
                                <Col className={'col-12 col-md-6 col-lg-4'}>
                                    <FormInput
                                        label={t('date of joining')}
                                        type="datePicker"
                                        name="dateOfJoining"
                                        placeholder={t('please enter date of joining')}
                                        containerClass={'mb-3'}
                                        register={register}
                                        errors={errors}
                                        watchValue={watchValueJoining}
                                        setValue={setValue}
                                    />
                                </Col>
                                <Col className={'col-12 col-md-6 col-lg-4'}>
                                    <FormInput
                                        label={t('date of birth')}
                                        type="datePicker"
                                        name="dateOfBirth"
                                        placeholder={t('please enter date of birth')}
                                        containerClass={'mb-3'}
                                        register={register}
                                        errors={errors}
                                        watchValue={watchValueBirth}
                                        setValue={setValue}
                                    />
                                </Col>
                                <Col className={'col-12 col-md-6 col-lg-4'}>
                                    <FormInput
                                        label={t('email')}
                                        type="email"
                                        name="email"
                                        placeholder={t('please enter email')}
                                        containerClass={'mb-3'}
                                        register={register}
                                        errors={errors}
                                    />
                                </Col>
                                <Col className={'col-12 col-md-6 col-lg-4'}>
                                    <FormInput
                                        label={t('father name')}
                                        type="text"
                                        name="fatherName"
                                        placeholder={t('please enter father name')}
                                        containerClass={'mb-3'}
                                        register={register}
                                        errors={errors}
                                    />
                                </Col>
                                <Col className={'col-12 col-md-6 col-lg-4'}>
                                    <FormInput
                                        label={t('nid')}
                                        type="text"
                                        name="nid"
                                        placeholder={t('please enter nid')}
                                        containerClass={'mb-3'}
                                        register={register}
                                        errors={errors}
                                    />
                                </Col>
                                <Col className={'col-12 col-md-6 col-lg-4'}>
                                    <FormInput
                                        label={t('thana')}
                                        type="text"
                                        name="thana"
                                        placeholder={t('please enter thana')}
                                        containerClass={'mb-3'}
                                        register={register}
                                        errors={errors}
                                    />
                                </Col>
                                <Col className={'col-12 col-md-6 col-lg-4'}>
                                    <FormInput
                                        label={t('district')}
                                        type="text"
                                        name="district"
                                        placeholder={t('please enter district')}
                                        containerClass={'mb-3'}
                                        register={register}
                                        errors={errors}
                                    />
                                </Col>
                                <Col className={'col-12 col-md-6 col-lg-4'}>
                                    <FormInput
                                        label={t('salary')}
                                        type="text"
                                        name="salary"
                                        placeholder={t('please enter salary')}
                                        containerClass={'mb-3'}
                                        register={register}
                                        errors={errors}
                                    />
                                </Col>
                                <Col className={'col-12 col-md-6 col-lg-4'}>
                                    <FormInput
                                        label={t('due')}
                                        type="text"
                                        name="due"
                                        placeholder={t('please enter due')}
                                        containerClass={'mb-3'}
                                        register={register}
                                        errors={errors}
                                    />
                                </Col>
                                <Col className={'col-12 col-md-6 col-lg-4'}>
                                    <FormInput
                                        label={t('remarks')}
                                        type="text"
                                        name="remarks"
                                        placeholder={t('please enter remarks')}
                                        containerClass={'mb-3'}
                                        register={register}
                                        errors={errors}
                                    />
                                </Col>
                                <Col className={'col-12 col-md-6 col-lg-4'}>
                                    <FormInput
                                        label={t('reference name')}
                                        type="text"
                                        name="reference.name"
                                        placeholder={t('please enter reference name')}
                                        containerClass={'mb-3'}
                                        nested={true}
                                        register={register}
                                        errors={errors}
                                    />
                                </Col>
                                <Col className={'col-12 col-md-6 col-lg-4'}>
                                    <FormInput
                                        label={t('reference mobile')}
                                        type="text"
                                        name="reference.mobile"
                                        placeholder={t('please enter reference mobile')}
                                        containerClass={'mb-3'}
                                        nested={true}
                                        register={register}
                                        errors={errors}
                                    />
                                </Col>
                                <Col className={'col-12 col-md-6 col-lg-4'}>
                                    <FormInput
                                        label={t('reference address')}
                                        type="text"
                                        name="reference.address"
                                        placeholder={t('please enter reference address')}
                                        containerClass={'mb-3'}
                                        nested={true}
                                        register={register}
                                        errors={errors}
                                    />
                                </Col>
                                <Col className={'col-12 col-md-6 col-lg-4'}>
                                    <FormInput
                                        label={t('reference nid')}
                                        type="text"
                                        name="reference.nid"
                                        placeholder={t('please enter reference nid')}
                                        containerClass={'mb-3'}
                                        nested={true}
                                        register={register}
                                        errors={errors}
                                    />
                                </Col>
                                <Col className={'col-12 col-md-6 col-lg-4'}>
                                    <FormInput
                                        label={t('reference relation')}
                                        type="text"
                                        name="reference.relation"
                                        placeholder={t('please enter reference relation')}
                                        containerClass={'mb-3'}
                                        nested={true}
                                        register={register}
                                        errors={errors}
                                    />
                                </Col>
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
