//External Lib Import
import React, { useEffect } from 'react';
import { Card, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

//api services
import { useSupplierCreateMutation, useSupplierUpdateMutation } from '../../redux/services/suppliersService';

const SupplierCreateUpdate = ({ modal, setModal, toggle, editData, defaultValues }) => {
    const { t } = useTranslation();
    const [supplierCreate, { isLoading, isSuccess }] = useSupplierCreateMutation();
    const [supplierUpdate, { isLoading: updateLoad, isSuccess: updateSuccess }] = useSupplierUpdateMutation();

    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required(t('please enter customer name')).min(3, t('minimum containing 3 letter')),
            companyName: yup.string().required(t('please enter company name')),
            accountNumber: yup.string().required(t('provide account number')),
            email: yup.string().required(t('please enter your valid email address')),
            mobile: yup.string().required(t('provide mobile number here')),
            address: yup.string(),
            nid: yup.string().required(t('please enter your NID')),
            prevDue: yup.number(),
        })
    );
    const methods = useForm({ mode: 'onChange', defaultValues, resolver: schemaResolver });
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = methods;
    /*
     * handle form submission
     */

    const onSubmit = async (formData) => {
        editData ? supplierUpdate(formData) : supplierCreate(formData);
    };

    useEffect(() => {
        if (isSuccess || updateSuccess) {
            setModal(false);
        }
    }, [isSuccess, updateSuccess]);

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues]);

    return (
        <Card className={classNames('', { 'd-none': !modal })}>
            <Card.Body>
                <Modal show={modal} onHide={toggle} backdrop="statica" keyboard={false}>
                    <Modal.Header onHide={toggle} closeButton>
                        <h4 className="modal-title">{editData ? t('Update Supplier') : t('Create Supplier')}</h4>
                    </Modal.Header>

                    <Modal.Body>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="companyName">Name of Company:</label>
                                <Controller
                                    name="companyName"
                                    control={control}
                                    render={({ field }) => <input className="form-control" {...field} />}
                                />
                                {errors.companyName && (
                                    <span className="text-danger">{errors.companyName.message}</span>
                                )}
                            </div>
                            <div>
                                <label htmlFor="name">Customer Name:</label>
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field }) => <input className="form-control" {...field} />}
                                />
                                {errors.name && <span className="text-danger">{errors.name.message}</span>}
                            </div>
                            <div>
                                <label htmlFor="email">Email:</label>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => <input className="form-control" {...field} />}
                                />
                                {errors.email && <span className="text-danger">{errors.email.message}</span>}
                            </div>
                            <div>
                                <label htmlFor="mobile">Mobile:</label>
                                <Controller
                                    name="mobile"
                                    control={control}
                                    render={({ field }) => <input className="form-control" {...field} />}
                                />
                                {errors.mobile && <span className="text-danger">{errors.mobile.message}</span>}
                            </div>
                            <div>
                                <label htmlFor="accountNumber">Account Number:</label>
                                <Controller
                                    name="accountNumber"
                                    control={control}
                                    render={({ field }) => <input className="form-control" {...field} />}
                                />
                                {errors.accountNumber && (
                                    <span className="text-danger">{errors.accountNumber.message}</span>
                                )}
                            </div>
                            <div>
                                <label htmlFor="nid">NID:</label>
                                <Controller
                                    name="nid"
                                    control={control}
                                    render={({ field }) => <input className="form-control" {...field} />}
                                />
                                {errors.nid && <span className="text-danger">{errors.nid.message}</span>}
                            </div>
                            <div>
                                <label htmlFor="address">Address:</label>
                                <Controller
                                    name="address"
                                    control={control}
                                    render={({ field }) => <input className="form-control" {...field} />}
                                />
                                {errors.address && <span className="text-danger">{errors.address.message}</span>}
                            </div>
                            <div>
                                <label htmlFor="prevDue">Previous Due:</label>
                                <Controller
                                    name="prevDue"
                                    control={control}
                                    render={({ field }) => <input className="form-control" {...field} />}
                                />
                                {errors.prevDue && <span className="text-danger">{errors.prevDue.message}</span>}
                            </div>
                            <div className="text-center mt-2">
                                <button type="submit" className="btn btn-primary">
                                    Submit Data
                                </button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </Card.Body>
        </Card>
    );
};

export default SupplierCreateUpdate;
