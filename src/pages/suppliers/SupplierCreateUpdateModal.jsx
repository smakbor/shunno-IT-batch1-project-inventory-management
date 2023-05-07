//external lib import
import React, { useEffect } from 'react';
import { Card, Button, Modal, Spinner } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import Select from 'react-select';

//internal lib import
import { FormInput, VerticalForm } from '../../components';
import removeEmptyObj from '../../helpers/removeEmptyObj';

//api services

import {
    useSupplierCreateMutation,
    useSupplierUpdateMutation,
} from '../../redux/services/suppliersService';

const SupplierCreateUpdateModal = ({ modal, setModal, toggle, editData, defaultValues }) => {

    const { t } = useTranslation();
    const [supplierCreate, { isLoading, isSuccess }] = useSupplierCreateMutation();
    const [supplierUpdate, { isLoading: updateLoad, isSuccess: updateSuccess }] = useSupplierUpdateMutation();

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required(t('please enter manufacturer name')).min(3, t('minimum containing 3 letter')),

        })
    );

    const onSubmit = (formData) => {
        let data = {}
        data.name = formData?.name;
        data.mobile = formData?.mobile;
        data.email = formData?.email;
        data.fatherName = formData?.fatherName;
        data.company = formData?.company;
        data.address = formData?.address;
        data.remarks = formData?.remarks;
        data.thana = formData?.thana;
        data.district = formData?.district;
        data.nid = formData?.nid;
        data.reference = {}
        data.reference.name = formData?.referenceName;
        data.reference.mobile = formData?.referenceMobile;
        data.reference.address = formData?.referenceAddress;
        data.reference.nid = formData?.referenceNid;
        data.reference.relation = formData?.referenceRelation;
        data.due = formData?.due;
        data.storeID = "602e42e46ebade5b1c7cf45f"
        if (!editData) {
            supplierCreate(removeEmptyObj(data));
        } else {
            const updatedData = { ...editData, ...data }
            const postBody = removeEmptyObj(updatedData);
            supplierUpdate({ id: editData._id, postBody });
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
                <Modal show={modal} onHide={toggle} backdrop="statica" keyboard={false} size='xl'>
                    <Modal.Header onHide={toggle} closeButton>
                        <h4 className="modal-title">
                            {editData ? t('update supplier') : t('add supplier')}
                        </h4>
                    </Modal.Header>

                    <Modal.Body>
                        <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={defaultValues}>
                            <FormInput
                                label={t('company name')}
                                type="text"
                                name="company"
                                placeholder={t('please enter company name')}
                                containerClass={'mb-3'}
                                col={'col-4'}
                            />
                            <FormInput
                                label={t('name')}
                                type="text"
                                name="name"
                                placeholder={t('please enter supplier name')}
                                containerClass={'mb-3'}
                                col={'col-4'}
                            />
                            <FormInput
                                label={t('mobile')}
                                type="tel"
                                name="mobile"
                                placeholder={t('please enter mobile number')}
                                containerClass={'mb-3'}
                                col={'col-4'}
                            />
                            <FormInput
                                label={t('email')}
                                type="email"
                                name="email"
                                placeholder={t('please enter supplier email')}
                                containerClass={'mb-3'}
                                col={'col-4'}
                            />
                            <FormInput
                                label={t('NID')}
                                type="text"
                                name="nid"
                                placeholder={t('please enter supplier nid')}
                                containerClass={'mb-3'}
                                col={'col-4'}
                            />
                            <FormInput
                                label={t('address')}
                                type="text"
                                name="address"
                                placeholder={t('please enter supplier address')}
                                containerClass={'mb-3'}
                                col={'col-4'}
                            />
                            <FormInput
                                label={t('father name')}
                                type="text"
                                name="fatherName"
                                placeholder={t('please enter father name')}
                                containerClass={'mb-3'}
                                col={'col-4'}
                            />
                            <FormInput
                                label={t('remarks')}
                                type="text"
                                name="remarks"
                                placeholder={t('please enter remarks')}
                                containerClass={'mb-3'}
                                col={'col-4'}
                            />
                            <FormInput
                                label={t('thana')}
                                type="text"
                                name="thana"
                                placeholder={t('please enter thana')}
                                containerClass={'mb-3'}
                                col={'col-4'}
                            />
                            <FormInput
                                label={t('district')}
                                type="text"
                                name="district"
                                placeholder={t('please enter district')}
                                containerClass={'mb-3'}
                                col={'col-4'}
                            />
                            <FormInput
                                label={t('previous due')}
                                type="number"
                                name="due"
                                placeholder={t('please enter supplier previous due')}
                                containerClass={'mb-3'}
                                col={'col-4'}
                            />
                            <FormInput
                                label={t('reference name')}
                                type="text"
                                name="referenceName"
                                placeholder={t('please enter reference name')}

                                containerClass={'mb-3'}
                                col={'col-4'}
                            />
                            <FormInput
                                label={t('reference mobile')}
                                type="tel"
                                name="referenceMobile"
                                placeholder={t('please enter supplier mobile')}
                                containerClass={'mb-3'}
                                col={'col-4'}
                            />
                            <FormInput
                                label={t('reference address')}
                                type="text"
                                name="referenceAddress"
                                placeholder={t('please enter reference address')}
                                containerClass={'mb-3'}
                                col={'col-4'}
                            />
                            <FormInput
                                label={t('reference nid')}
                                type="text"
                                name="referenceNid"
                                placeholder={t('please enter reference nid')}
                                containerClass={'mb-3'}
                                col={'col-4'}
                            />
                            <FormInput
                                label={t('reference relation')}
                                type="text"
                                name="referenceRelation"
                                placeholder={t('please enter reference address')}
                                containerClass={'mb-3'}
                                col={'col-4'}
                            />
                            <div className="mb-3 text-end">
                                <Button variant="primary" type="submit">
                                    {editData ? t('update supplier') : t('create supplier')}
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

export default SupplierCreateUpdateModal;
