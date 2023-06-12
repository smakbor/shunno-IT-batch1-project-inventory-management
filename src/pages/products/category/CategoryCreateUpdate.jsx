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
import { useCategoryCreateMutation, useCategoryUpdateMutation } from '../../../redux/services/categoryService';
import { useSelector } from 'react-redux';
import useFileUpload from '../../../hooks/useFileUpload';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { axioShunnoStorage } from '../../../utils/axios/axios';
import Select from 'react-select';
import { shunnoStorageBaseUrl } from '../../../config/config';
// import handleFileUpload from '../../../helpers/handleFileUpload';

const CategoryCreateUpdate = ({ modal, setModal, toggle, editData, defaultValues }) => {
    const { t } = useTranslation();
    const store = useSelector(state => state.setting.activeStore);
    // const [file]
    const [categoryCreate, { isLoading, isSuccess }] = useCategoryCreateMutation();
    const [categoryUpdate, { isLoading: updateLoad, isSuccess: updateSuccess }] = useCategoryUpdateMutation();
    const [imageURL, setImageURL] = useState("");
    const { handleFileUpload, data: fileData, isError: fileError, isLoading: fileLoading } = useFileUpload();
    /*
     * form validation schema
     */
    // console.log(defaultValues)
    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required(t('please enter category name')).min(3, t('minimum containing 3 letter')),
            status: yup.string().required(t('please select status')),
            isEcom: yup.boolean().required(),
            image: yup
                .mixed()
                .test('fileSize', t('image size must be 100KB or less'), (value) => {
                    if (value?.length > 0) {
                        const fileSizeInBytes = value[0]?.size;
                        const fileSizeInKB = fileSizeInBytes / 1024;

                        return fileSizeInKB <= 100;
                    }
                    else {
                        return true;
                    }
                }),
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

    const onSubmit = async (formData) => {
        formData.store = store._id;

        if (formData?.image?.length > 0) {
            await handleFileUpload(formData.image[0])

            if (Object.entries(fileData).length > 0) {
                const { publicID, path } = fileData;
                formData.image = { publicId: publicID, url: path }
            }


        }
        else {
            delete formData.image;
        }
        editData ? categoryUpdate({ id: editData._id, postBody: formData }) : categoryCreate(formData)

    };

    useEffect(() => {
        if (isSuccess || updateSuccess) {
            setModal(false);
        }
    }, [isSuccess, updateSuccess]);

    useEffect(() => {
        if (watchValueImage?.length > 0) {
            const file = watchValueImage[0];
            const reader = new FileReader();
            reader.onload = () => {
                setImageURL(reader.result);
            };
            reader.readAsDataURL(file);
        };
    }, [watchValueImage])

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues)
        }
    }, [defaultValues])

    const statusOptions = [
        {
            label: t("active"),
            value: "ACTIVE"

        },
        {
            label: t("inactive"),
            value: "INACTIVE"
        }
    ]
    return (
        <Card className={classNames('', { 'd-none': !modal })}>
            <Card.Body>
                <Modal show={modal} onHide={toggle} backdrop="statica" keyboard={false}>
                    <Modal.Header onHide={toggle} closeButton>
                        <h4 className="modal-title">{editData ? t('update category') : t('create category')}</h4>
                    </Modal.Header>

                    <Modal.Body>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {imageURL &&
                                <div className='mb-3'>
                                    <img style={{ height: "100px" }} src={imageURL} alt="" />
                                </div>
                            }
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Image</label>
                                <input
                                    type="file" id="image" className="form-control" {...register('image')} accept="image/*" />
                                {errors.image && <span className="text-danger">{errors.image.message}</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" id="name" className="form-control" {...register('name', { required: 'Name is required' })} />
                                {errors.name && <span className="text-danger">{errors.name.message}</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="status" className="form-label">Status</label>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <Select
                                            className="react-select"
                                            classNamePrefix="react-select"
                                            name='status'
                                            options={statusOptions}
                                            defaultValue={statusOptions.find(stat => stat.value === defaultValues.status)}
                                            onChange={(val) => onChange(val.value)}
                                        />
                                    )}
                                    rules={{ required: true }}
                                />
                                {errors.status && <span className="text-danger">{errors.status.message}</span>}
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" id="isEcom" className="form-check-input" {...register('isEcom')} />
                                <label htmlFor="isEcom" className="form-check-label">Has E-commerce</label>
                            </div>
                            <button type="submit" disabled={isLoading || fileLoading} className="btn btn-primary">{
                                (isLoading || fileLoading) ? t("loading") : t("submit")
                            }</button>
                        </form>
                    </Modal.Body>
                </Modal>
            </Card.Body>
        </Card>
    );
};

export default CategoryCreateUpdate;
