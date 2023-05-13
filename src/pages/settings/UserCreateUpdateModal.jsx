//External Lib Import
import React, { useEffect } from 'react';
import { Card, Button, Modal, Spinner } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

//Internal Lib Import
import { FormInput, VerticalForm } from '../../components';
import removeEmptyObj from '../../helpers/removeEmptyObj';
import { useRoleListQuery } from '../../redux/services/roleService';

//api services

import { useStaffCreateMutation, useStaffUpdateMutation } from '../../redux/services/staffService';
import { useSelector } from 'react-redux';

const StaffCreateUpdateModal = ({ modal, setModal, toggle, editData, defaultValues }) => {
    const { t } = useTranslation();
    const { activeStore } = useSelector((state) => state.setting);
    const { data: allRoles } = useRoleListQuery(activeStore?._id, {
        skip: !activeStore._id,
    });

    const [staffCreate, { isLoading, isSuccess }] = useStaffCreateMutation();
    const [staffUpdate, { isLoading: updateLoad, isSuccess: updateSuccess }] = useStaffUpdateMutation();

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required(t('please enter manufacturer name')).min(3, t('minimum containing 3 letter')),
        })
    );

    //slugify

    /*
     * handle form submission
     */

    const onSubmit = (formData) => {
        const data = { reference: {} };
        data.name = formData.name;
        data.fatherName = formData.fatherName;
        data.StaffType = formData.StaffType;
        data.address = formData.address;
        data.mobile = formData.mobile;
        data.email = formData.email;
        data.due = formData.due;
        data.ledgerNumber = formData.ledgerNumber;
        data.nid = formData.nid;
        data.reference.name = formData.refName;
        data.reference.mobile = formData.refMobile;
        data.reference.address = formData.refAddress;

        if (!editData) {
            staffCreate(removeEmptyObj(data));
        } else {
            const postBody = removeEmptyObj(data);
            console.log(postBody);
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
                        <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={defaultValues}>
                            <FormInput
                                name="roleID"
                                type="select"
                                label={t('assign user role')}
                                col={'col-12 col-md-6 col-lg-4'}
                                containerClass={'mb-3'}
                                required={true}>
                                <option value="">{t('assign user role')}</option>
                                {allRoles &&
                                    allRoles.map((role) => (
                                        <option key={role.key} value={role._id}>
                                            {role.name}
                                        </option>
                                    ))}
                            </FormInput>
                            <FormInput
                                label={t('name')}
                                type="text"
                                name="name"
                                placeholder={t('please enter name')}
                                containerClass={'mb-3'}
                                col={'col-12 col-md-6 col-lg-4'}
                                required={true}
                            />
                            <FormInput
                                label={t('mobile')}
                                type="text"
                                name="mobile"
                                placeholder={t('please enter mobile')}
                                containerClass={'mb-3'}
                                col={'col-12 col-md-6 col-lg-4'}
                                required={true}
                            />
                            <FormInput
                                label={t('father name')}
                                type="text"
                                name="fatherName"
                                placeholder={t('please enter father name')}
                                containerClass={'mb-3'}
                                col={'col-12 col-md-6 col-lg-4'}
                            />
                            <FormInput
                                label={t('email')}
                                type="text"
                                name="email"
                                placeholder={t('please enter email')}
                                containerClass={'mb-3'}
                                col={'col-12 col-md-6 col-lg-4'}
                            />
                            <FormInput
                                label={t('nid')}
                                type="text"
                                name="nid"
                                placeholder={t('please enter nid')}
                                containerClass={'mb-3'}
                                col={'col-12 col-md-6 col-lg-4'}
                            />
                            <FormInput
                                label={t('address')}
                                type="text"
                                name="address"
                                placeholder={t('please enter address')}
                                containerClass={'mb-3'}
                                col={'col-12 col-md-6 col-lg-4'}
                            />
                            <FormInput
                                label={t('thana')}
                                type="text"
                                name="thana"
                                placeholder={t('please enter thana')}
                                containerClass={'mb-3'}
                                col={'col-12 col-md-6 col-lg-4'}
                            />
                            <FormInput
                                label={t('district')}
                                type="text"
                                name="district"
                                placeholder={t('please enter district')}
                                containerClass={'mb-3'}
                                col={'col-12 col-md-6 col-lg-4'}
                            />
                            <FormInput
                                label={t('salary')}
                                type="text"
                                name="salary"
                                placeholder={t('please enter salary')}
                                containerClass={'mb-3'}
                                col={'col-12 col-md-6 col-lg-4'}
                            />
                            <FormInput
                                label={t('due')}
                                type="text"
                                name="due"
                                placeholder={t('please enter due')}
                                containerClass={'mb-3'}
                                col={'col-12 col-md-6 col-lg-4'}
                            />
                            <FormInput
                                label={t('remarks')}
                                type="text"
                                name="remarks"
                                placeholder={t('please enter remarks')}
                                containerClass={'mb-3'}
                                col={'col-12 col-md-6 col-lg-4'}
                            />
                            <FormInput
                                label={t('reference name')}
                                type="text"
                                name="reference.name"
                                placeholder={t('please enter reference name')}
                                containerClass={'mb-3'}
                                col={'col-12 col-md-6 col-lg-4'}
                            />
                            <FormInput
                                label={t('reference mobile')}
                                type="text"
                                name="reference.mobile"
                                placeholder={t('please enter reference mobile')}
                                containerClass={'mb-3'}
                                col={'col-12 col-md-6 col-lg-4'}
                            />
                            <FormInput
                                label={t('reference address')}
                                type="text"
                                name="reference.address"
                                placeholder={t('please enter reference address')}
                                containerClass={'mb-3'}
                                col={'col-12 col-md-6 col-lg-4'}
                            />
                            <FormInput
                                label={t('reference nid')}
                                type="text"
                                name="reference.nid"
                                placeholder={t('please enter reference nid')}
                                containerClass={'mb-3'}
                                col={'col-12 col-md-6 col-lg-4'}
                            />
                            <FormInput
                                label={t('reference relation')}
                                type="text"
                                name="reference.relation"
                                placeholder={t('please enter reference relation')}
                                containerClass={'mb-3'}
                                col={'col-12 col-md-6 col-lg-4'}
                            />
                            <div col={'col-12 col-md-6 col-lg-4'}></div>
                            <div className="mb-3">
                                <Button variant="primary" type="submit">
                                    {editData ? t('update user') : t('create user')}
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

export default StaffCreateUpdateModal;
