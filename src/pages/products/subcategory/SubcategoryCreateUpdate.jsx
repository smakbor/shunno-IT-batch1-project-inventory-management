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

import { useSubcategoryCreateMutation, useSubcategoryUpdateMutation } from '../../../redux/services/subcategoryService';
import { useSelector } from 'react-redux';
import { Controller, useForm, useWatch } from 'react-hook-form';
import Select from 'react-select';
import { useCategoryListQuery } from '../../../redux/services/categoryService';

const SubcategoryCreateUpdate = ({ modal, setModal, toggle, editData, defaultValues }) => {
    const { t } = useTranslation();

    // const [file]
    const [subcategoryCreate, { isLoading, isSuccess }] = useSubcategoryCreateMutation();
    const [subcategoryUpdate, { isLoading: updateLoad, isSuccess: updateSuccess }] = useSubcategoryUpdateMutation();
    const { data: category, isLoading: categoryLoading, isError: categoryError } = useCategoryListQuery();

    const options = category?.map((item) => {
        return { label: item.name, value: item._id };
    });

    /*
     * form validation schema
     */
    // console.log(defaultValues)
    const schemaResolver = yupResolver(
        yup.object().shape({
            category: yup.string().required(t('Select Category')),
            name: yup.string().required(t('please enter subcategory name')).min(3, t('minimum containing 3 letter')),
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
        watch,
        formState: { errors },
    } = methods;
    console.log(errors);
    /*
     * handle form submission
     */

    const onSubmit = (formData) => {
        console.log(formData);
        editData ? subcategoryUpdate({ id: editData?._id, formData }) : subcategoryCreate(formData);
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
                        <h4 className="modal-title">{editData ? t('Update Subcategory') : t('Create Subcategory')}</h4>
                    </Modal.Header>

                    <Modal.Body>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Select Category Name
                                </label>
                                <Controller
                                    control={control}
                                    name="category"
                                    render={({ field, value, fieldState: { errors }, ref }) => (
                                        <Select
                                            inputRef={ref}
                                            classNamePrefix="addl-class"
                                            options={options}
                                            value={options.find((c) => c.value === value)}
                                            onChange={(val) => field.onChange(val.value)}
                                        />
                                    )}
                                />
                                {errors?.category && <span className="text-danger">{errors?.category?.message}</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <Controller
                                    control={control}
                                    name="name"
                                    render={({ field, fieldState: { errors }, ref }) => (
                                        <input
                                            inputRef={ref}
                                            className="form-control"
                                            value={field.value}
                                            onChange={(e) => field.onChange(e.target.value)}
                                        />
                                    )}
                                />
                                {errors.name && <span className="text-danger">{errors.name.message}</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="note" className="form-label">
                                    Note
                                </label>
                                <Controller
                                    control={control}
                                    name="note"
                                    render={({ field, fieldState: { errors }, ref }) => (
                                        <input
                                            inputRef={ref}
                                            className="form-control"
                                            value={field.value}
                                            onChange={(e) => field.onChange(e.target.value)}
                                        />
                                    )}
                                />
                                {errors.note && <span className="text-danger">{errors.note.message}</span>}
                            </div>
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

export default SubcategoryCreateUpdate;
