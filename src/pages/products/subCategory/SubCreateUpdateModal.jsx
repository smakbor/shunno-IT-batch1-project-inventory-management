//external lib import
import React, { useEffect } from 'react';
import { Card, Button, Modal, Spinner } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

//internal lib import
import { FormInput, VerticalForm } from '../../../components';
import removeEmptyObj from '../../../helpers/removeEmptyObj';

//api services

import { useSubCategoryCreateMutation, useSubCategoryUpdateMutation } from '../../../redux/services/subCategory';
import slugify from '../../../helpers/slugify';

const SubCategoryCreateUpdateModal = ({
    subCategoryModal,
    setSubCategoryModal,
    subCategoryModalToggle,
    subCategoryEditData,
    subCategoryDefaultValues,
}) => {
    const { t } = useTranslation();
    const [subCategoryCreate, { isLoading, isSuccess }] = useSubCategoryCreateMutation();
    const [subCategoryUpdate, { isLoading: updateLoad, isSuccess: updateSuccess }] = useSubCategoryUpdateMutation();

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required(t('please enter sub category name')).min(3, t('minimum containing 3 letter')),
            isEcom: yup.boolean().required(),
        })
    );



    /*
     * handle form submission
     */

    const onSubmit = (formData) => {
        const data = {};
        data.name = formData.name;
        data.slug = slugify(formData.name);
        data.isEcom = formData.isEcom;
        data.status = formData.status;
        data.categoryID = subCategoryDefaultValues.categoryID;

        if (!subCategoryEditData) {
            subCategoryCreate(removeEmptyObj(data));
        } else {
            const postBody = removeEmptyObj(data);
            postBody.slug = slugify(postBody.name);
            subCategoryUpdate({ id: subCategoryEditData, postBody });
        }
    };

    useEffect(() => {
        if (isSuccess || updateSuccess) {
            setSubCategoryModal(false);
        }
    }, [isSuccess, updateSuccess]);

    return (
        <Card className={classNames('', { 'd-none': !subCategoryModal })}>
            <Card.Body>
                <Modal show={subCategoryModal} onHide={subCategoryModalToggle} backdrop="statica" keyboard={false}>
                    <Modal.Header onHide={subCategoryModalToggle} closeButton>
                        <h4 className="modal-title">
                            {subCategoryEditData ? t('update sub category') : t('create sub category')}
                        </h4>
                    </Modal.Header>

                    <Modal.Body>
                        <VerticalForm
                            onSubmit={onSubmit}
                            resolver={schemaResolver}
                            defaultValues={subCategoryDefaultValues}>
                            <FormInput
                                label={t('sub category name')}
                                type="text"
                                name="name"
                                placeholder={t('please enter sub category name')}
                                containerClass={'mb-3'}
                                col={'col-12'}
                            />
                            <FormInput
                                name="status"
                                type="select"
                                label="status"
                                col={'col-12'}
                                containerClass={'mb-3'}>
                                <option value="ACTIVE">Active</option>
                                <option value="INACTIVE">Inactive</option>
                            </FormInput>

                            <FormInput
                                label={t('has e-commerce')}
                                type="checkbox"
                                name="isEcom"
                                containerClass={'mb-3 text-muted'}
                            />
                            <div className="mb-3 text-end">
                                <Button variant="primary" type="submit">
                                    {subCategoryEditData ? t('update sub category') : t('create sub category')}
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

export default SubCategoryCreateUpdateModal;
