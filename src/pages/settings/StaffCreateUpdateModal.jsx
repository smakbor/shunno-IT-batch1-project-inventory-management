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
import removeEmptyObj from '../../helpers/removeEmptyObj';
import { useRoleListQuery } from '../../redux/services/roleService';
import MappedComponent from '../contacts/mappedComponent/MappedComponent';

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
    const [roles, setRoles] = useState([]);

    /*
     * form validation schema
     */
    // const schemaResolver = yupResolver(
    //     yup.object().shape({
    //         name: yup.string().required(t('please enter name')).max(40, t('maximum containing 40 letter')),
    //     })
    // );
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
            email: yup.string().email(),
            nid: yup.string(),
            address: yup.string(),
            thana: yup.string(),
            district: yup.string(),
            salary: yup.string(),
            due: yup.string(),
            remarks: yup.string(),
            joiningDate: yup.string(),
            birthDate: yup.string(),
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
    const methods = useForm({ mode: 'onChange' });
    const { control } = methods;

    let watchValueJoining = useWatch({
        control,
        name: 'joiningDate',
    });

    let watchValueBirth = useWatch({
        control,
        name: 'birthDate',
    });

    /*
     * handle form submission
     */

    const onSubmit = (formData) => {
        const isoJoiningDate = new Date(formData.joiningDate);
        const isoBirthDate = new Date(formData.birthDate);
        formData.store = activeStore?._id;
        formData.salary = Number(formData.salary);
        formData.joiningDate = isoJoiningDate.toDateString();
        formData.birthDate = isoBirthDate.toDateString();
        formData.due = Number(formData.due);
        delete formData.confirmPassword;
        if (!editData) {
            staffCreate(removeEmptyObj(formData));
        } else {
            const updatedData = { ...editData, ...formData };
            const postBody = removeEmptyObj(updatedData);
            staffUpdate(postBody);
            console.log(postBody);
        }
    };

    useEffect(() => {
        if (isSuccess || updateSuccess) {
            setModal(false);
        }
    }, [isSuccess, updateSuccess]);

    useEffect(() => {
        const roles = allRoles?.map((role) => {
            return { label: role.name, value: role._id };
        });
        setRoles(roles);
    }, [allRoles]);

    const inputData = [
        {
            label: t('role id'),
            type: 'react-select',
            name: 'role',
            placeholder: t('select user role'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
            options: roles,
            isVisible: true,
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
                { label: 'NEW', value: 'NEW' },
                { label: 'ACTIVE', value: 'ACTIVE' },
                { label: 'INACTIVE', value: 'INACTIVE' },
                { label: 'BANNED', value: 'BANNED' },
                { label: 'DELETED', value: 'DELETED' },
            ],
            isVisible: true,
        },
        // {
        //     label: t('select user salary type'),
        //     type: 'react-select',
        //     name: 'salaryType',
        //     containerClass: 'mb-3',
        //     col: 'col-12 col-md-6 col-lg-4',
        //     required: false,
        //     options: [
        //         { label: 'please select salary type', value: '' },
        //         { label: 'DUE', value: 'DUE' },
        //         { label: 'ADVANCED', value: 'ADVANCED' },
        //     ],
        // },
        {
            label: t('select user salary period'),
            type: 'react-select',
            name: 'salaryPeriod',
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
            options: [
                { label: 'please select salary type', value: '' },
                { label: 'DAILY', value: 'DAILY' },
                { label: 'WEEKLY', value: 'WEEKLY' },
                { label: 'MONTHLY', value: 'MONTHLY' },
            ],
            isVisible: true,
        },

        {
            label: t('name'),
            type: 'text',
            name: 'name',
            placeholder: t('please enter name'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: true,
            isVisible: true,
        },
        {
            label: t('mobile'),
            type: 'text',
            name: 'mobile',
            placeholder: t('please enter mobile'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: true,
            isVisible: true,
        },
        {
            label: t('password'),
            type: 'password',
            name: 'password',
            placeholder: t('please enter password'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: true,
            isVisible: false,
        },
        {
            label: t('confirm password'),
            type: 'password',
            name: 'confirmPassword',
            placeholder: t('please enter confirm password'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: true,
            isVisible: false,
        },
        {
            label: t('address'),
            type: 'text',
            name: 'address',
            placeholder: t('please enter address'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
            isVisible: true,
        },
        {
            label: t('joining date'),
            type: 'datePicker',
            name: 'joiningDate',
            placeholder: t('please enter date of joining'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
            watchValue: watchValueJoining,
            isVisible: true,
        },
        {
            label: t('date of birth'),
            type: 'datePicker',
            name: 'birthDate',
            placeholder: t('please enter date of birth'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
            watchValue: watchValueBirth,
            isVisible: true,
        },
        {
            label: t('email'),
            type: 'email',
            name: 'email',
            placeholder: t('please enter email'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
            isVisible: true,
        },
        {
            label: t('father name'),
            type: 'text',
            name: 'fatherName',
            placeholder: t('please enter father name'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
            isVisible: true,
        },
        {
            label: t('thana'),
            type: 'text',
            name: 'thana',
            placeholder: t('please enter thana'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
            isVisible: true,
        },
        {
            label: t('district'),
            type: 'text',
            name: 'district',
            placeholder: t('please enter district'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
            isVisible: true,
        },
        {
            label: t('nid'),
            type: 'text',
            name: 'nid',
            placeholder: t('please enter nid'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
            isVisible: true,
        },
        {
            label: t('previous due'),
            type: 'number',
            name: 'due',
            placeholder: t('please enter previous due'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
            isVisible: true,
        },
        {
            label: t('salary'),
            type: 'number',
            name: 'salary',
            placeholder: t('please enter salary'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
            isVisible: true,
        },
        {
            label: t('remarks'),
            type: 'text',
            name: 'remarks',
            placeholder: t('please enter remarks'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
            isVisible: true,
        },
        {
            label: t('reference name'),
            type: 'text',
            name: 'reference.name',
            placeholder: t('please enter reference name'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
            isVisible: true,
        },
        {
            label: t('reference mobile'),
            type: 'text',
            name: 'reference.mobile',
            placeholder: t('please enter supplier mobile'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
            isVisible: true,
        },
        {
            label: t('reference address'),
            type: 'text',
            name: 'reference.address',
            placeholder: t('please enter reference address'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
            isVisible: true,
        },
        {
            label: t('reference nid'),
            type: 'text',
            name: 'reference.nid',
            placeholder: t('please enter reference nid'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
            isVisible: true,
        },

        {
            label: t('reference relation'),
            type: 'text',
            name: 'reference.relation',
            placeholder: t('please enter reference relation'),
            containerClass: 'mb-3',
            col: 'col-12 col-md-6 col-lg-4',
            required: false,
            isVisible: true,
        },
    ];

    return (
        <Card className={classNames('', { 'd-none': !modal })}>
            <Card.Body>
                <Modal show={modal} onHide={toggle} backdrop="statica" keyboard={false} size="xl">
                    <Modal.Header onHide={toggle} closeButton>
                        <h4 className="modal-title">{editData ? t('update staff') : t('create staff')}</h4>
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
                            updateTitle={t('update staff')}
                            createTitle={t('create staff')}
                        />
                    </Modal.Body>
                </Modal>
            </Card.Body>
        </Card>
    );
};

export default StaffCreateUpdateModal;
