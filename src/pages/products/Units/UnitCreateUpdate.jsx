//External Lib Import
import React, { useEffect, useMemo, useState } from 'react';
import { Card, Button, Modal, Spinner } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

//Internal Lib Import
import { FormInput, VerticalForm } from '../../../components';
import removeEmptyObj from '../../../helpers/removeEmptyObj';

//api services
import { useSelector } from 'react-redux';
import { Controller, useForm, useWatch } from 'react-hook-form';
import Select from 'react-select';
import { useUnitCreateMutation, useUnitUpdateMutation } from '../../../redux/services/unitService';



// import handleFileUpload from '../../../helpers/handleFileUpload';

const UnitCreateUpdate = ({ modal, setModal, toggle, editData, defaultValues }) => {
    const { t } = useTranslation();
    const store = useSelector((state) => state.setting.activeStore);
    // const [file]
    const [unitCreate, { isLoading, isSuccess }] = useUnitCreateMutation();
    const [unitUpdate, { isLoading: updateLoad, isSuccess: updateSuccess }] = useUnitUpdateMutation();

    /*
     * form validation schema
     */
    // console.log(defaultValues)
    // const schemaResolver = yupResolver(
    //     yup.object().shape({
    //         brand: yup.string().required(t('please enter Brand')).min(3, t('minimum containing 3 letter')),
    //         note: yup.string(),
    //         name: yup.string().required(t('please enter Brand name')).min(3, t('minimum containing 2 letter')),
    //         note: yup.string(),
    //     })
    // );

    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required(t('please enter category name')).min(3, t('minimum containing 3 letter')),
            note: yup.string(),
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

    let watchValueImage = useWatch({
        control,
        name: 'image',
    });

    /*
     * handle form submission
     */

    // editData ? brandUpdate({ id: editData._id, postBody: formData }) :


    const onSubmit = async (formData) => {
        editData ? unitUpdate({ id: editData._id, postBody: formData }) : unitCreate(formData);
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

    const statusOptions = [
        {
            label: t('active'),
            value: 'ACTIVE',
        },
        {
            label: t('inactive'),
            value: 'INACTIVE',
        },
    ];
    return (
        <Card className={classNames('', { 'd-none': !modal })}>
            <Card.Body>
                <Modal show={modal} onHide={toggle} backdrop="statica" keyboard={false}>
                    <Modal.Header onHide={toggle} closeButton>
                        <h4 className="modal-title">{editData ? t('update unit') : t('Create Unit')}</h4>
                    </Modal.Header>

                    <Modal.Body>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="form-control"
                                    placeholder='Please Enter Unit Name'
                                    {...register('name', { required: 'Name is required' })}
                                />
                                {errors.name && <span className="text-danger">{errors.name.message}</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="note" className="form-label">
                                   Alias
                                </label>
                                <input
                                    type="text"
                                    id="note"
                                    className="form-control"
                                    placeholder='Please Enter Unit Alias'
                                    {...register('note', { required: 'Note is not required' })}
                                />
                                {errors.note && <span className="text-danger">{errors.note.message}</span>}
                            </div>
                           
                            {/* <div className="mb-3">
                                <label htmlFor="status" className="form-label">
                                    Status
                                </label>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <Select
                                            className="react-select"
                                            classNamePrefix="react-select"
                                            name="status"
                                            options={statusOptions}
                                            defaultValue={statusOptions.find(
                                                (stat) => stat.value === defaultValues.status
                                            )}
                                            onChange={(val) => onChange(val.value)}
                                        />
                                    )}
                                    rules={{ required: true }}
                                />
                                {errors.status && <span className="text-danger">{errors.status.message}</span>}
                            </div> */}
                            <button type="submit" disabled={isLoading} className="btn btn-primary">
                                {isLoading ? t('loading') : t('submit')}
                            </button>
                        </form>
                    </Modal.Body>
                </Modal>
            </Card.Body>
        </Card>
    );
};

export default UnitCreateUpdate;
