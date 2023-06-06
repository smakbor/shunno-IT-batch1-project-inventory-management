//External Lib Import
import React, { useEffect } from 'react';
import { Card, Button, Modal, Spinner } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

//Internal Lib Import
import { FormInput, VerticalForm } from '../../../components';
import removeEmptyObj from '../../../helpers/removeEmptyObj';

//api services

import { useCustomerCreateMutation, useCustomerUpdateMutation } from '../../../redux/services/customerService';
import { useSelector } from 'react-redux';

const CustomerCreateUpdateModal = ({ modal, setModal, toggle, editData, defaultValues }) => {
    const { t } = useTranslation();
    const storeID = useSelector(state => state.setting.activeStore._id)
    const [customerCreate, { isLoading, isSuccess }] = useCustomerCreateMutation();
    const [customerUpdate, { isLoading: updateLoad, isSuccess: updateSuccess }] = useCustomerUpdateMutation();

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required(t('please enter customer name')).min(3, t('minimum containing 3 letter')),
            fatherName: yup.string(),
            address: yup.string(),
            mobile: yup.string().required(t('enter mobile number')).matches(/^(?:\+?88|0088)?01[3-9]\d{8}$/
                , t('enter valid number')),
            email: yup.string().email(t('enter valid email')),
            ledgerNumber: yup.string(),
            nid: yup.string()
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
        data.customerType = formData.customerType;
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
            customerCreate({ storeID, postBody: removeEmptyObj(data) });
        } else {
            const postBody = removeEmptyObj(data);
            customerUpdate({ id: editData._id, postBody });
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
                        <h4 className="modal-title">{editData ? t('update customer') : t('create customer')}</h4>
                    </Modal.Header>

                    <Modal.Body>
                        <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={defaultValues}>
                            <FormInput
                                name="customerType"
                                type="select"
                                label="select customer type"
                                col={'col-12 col-md-6 col-lg-4'}
                                required={true}
                                containerClass={'mb-3'}>
                                <option value="">Select Customer Type</option>
                                <option value="RETAIL">Retail</option>
                                <option value="WHOLESALE">Wholesale</option>
                            </FormInput>
                            <FormInput
                                label={t('customer name')}
                                type="text"
                                name="name"
                                placeholder={t('please enter customer name')}
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
                                label={t('mobile')}
                                type="number"
                                name="mobile"
                                placeholder={t('please enter mobile')}
                                containerClass={'mb-3'}
                                required={true}
                                col={'col-12 col-md-6 col-lg-4'}
                            />
                            <FormInput
                                label={t('email')}
                                type="email"
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
                                label={t('due')}
                                type="number"
                                name="due"
                                placeholder={t('please enter due')}
                                containerClass={'mb-3'}
                                col={'col-12 col-md-6 col-lg-4'}
                            />
                            <FormInput
                                label={t('ledger number')}
                                type="text"
                                name="ledgerNumber"
                                placeholder={t('please enter ledger number')}
                                containerClass={'mb-3'}
                                col={'col-12 col-md-6 col-lg-4'}
                            />
                            <FormInput
                                label={t('reference name')}
                                type="text"
                                name="refName"
                                placeholder={t('please enter reference name')}
                                containerClass={'mb-3'}
                                col={'col-12 col-md-6 col-lg-4'}
                            />
                            <FormInput
                                label={t('reference mobile')}
                                type="text"
                                name="refMobile"
                                placeholder={t('please enter reference mobile')}
                                containerClass={'mb-3'}
                                col={'col-12 col-md-6 col-lg-4'}
                            />
                            <FormInput
                                label={t('reference address')}
                                type="text"
                                name="refAddress"
                                placeholder={t('please enter reference address')}
                                containerClass={'mb-3'}
                                col={'col-12 col-md-6 col-lg-4'}
                            />

                            <div className="mb-3 text-end">
                                <Button variant="primary" type="submit">
                                    {editData ? t('update manufacturer') : t('create manufacturer')}
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

export default CustomerCreateUpdateModal;
