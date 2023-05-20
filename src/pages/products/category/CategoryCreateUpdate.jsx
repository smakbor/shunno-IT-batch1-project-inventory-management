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
import { useCategoryCreateMutation, useCategoryUpdateMutation } from '../../../redux/services/categoryService';
import { useSelector } from 'react-redux';
import slugify from '../../../helpers/slugify';

const CategoryCreateUpdate = ({ modal, setModal, toggle, editData, defaultValues }) => {
    const { t } = useTranslation();
    const storeID = useSelector(state => state.setting.activeStore?._id)
    const [categoryCreate, { isLoading, isSuccess }] = useCategoryCreateMutation();
    const [categoryUpdate, { isLoading: updateLoad, isSuccess: updateSuccess }] = useCategoryUpdateMutation();

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required(t('please enter category name')).min(3, t('minimum containing 3 letter')),
            status: yup.string().required(t('please select status')),
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

        if (!editData) {
            categoryCreate({ storeID, postBody: removeEmptyObj(data) });
        } else {
            const updatedData = { ...editData, ...data };
            const postBody = removeEmptyObj(updatedData);
            postBody.slug = slugify(postBody.name);
            categoryUpdate({ id: editData._id, postBody });
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
                <Modal show={modal} onHide={toggle} backdrop="statica" keyboard={false}>
                    <Modal.Header onHide={toggle} closeButton>
                        <h4 className="modal-title">{editData ? t('update category') : t('create category')}</h4>
                    </Modal.Header>

                    <Modal.Body>
                        <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={defaultValues}>
                            <FormInput
                                label={t('category name')}
                                type="text"
                                name="name"
                                placeholder={t('please enter category name')}
                                containerClass={'mb-3'}
                                col={'col-12'}
                            />
                            <FormInput
                                name="status"
                                type="select"
                                label={t('status')}
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
                                    {editData ? t('update category') : t('create category')}
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

export default CategoryCreateUpdate;
