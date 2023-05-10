//external lib import
import React, { useEffect } from 'react';
import { Card, Button, Modal, Spinner } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import Select from 'react-select';

//internal lib import
import { FormInput, VerticalForm } from '../../../components';
import removeEmptyObj from '../../../helpers/removeEmptyObj';

//api services
import { useUnitCreateMutation, useUnitUpdateMutation } from '../../../redux/services/unitService';
import { useWarrantyCreateMutation, useWarrantyUpdateMutation } from '../../../redux/services/warrantyService';

const ModalCreateUpdate = ({ modal, setModal, toggle, editData, defaultValues }) => {
    const { t } = useTranslation();
    const [warrantyCreate, { isLoading, isSuccess }] = useWarrantyCreateMutation();
    const [warrantyUpdate, { isLoading: updateLoad, isSuccess: updateSuccess }] = useWarrantyUpdateMutation();

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required(t('please enter unit name')).min(2, t('minimum containing 2 letters')),
            status: yup.string().required(t('please select status')),
        })
    );

    /*
     * handle form submission
     */
    const onSubmit = (formData) => {
        const data = {};
        data.name = formData.name;
        data.status = formData.status;

        if (!editData) {
            warrantyCreate(removeEmptyObj(data));
        } else {
            const updatedData = { ...editData, ...data }
            const postBody = removeEmptyObj(updatedData);
            warrantyUpdate({ id: editData._id, postBody });
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
                        <h4 className="modal-title">{editData ? t('edit warranty') : t('add warranty')}</h4>
                    </Modal.Header>

                    <Modal.Body>
                        <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={defaultValues}>
                            <FormInput
                                label={t('warranty name')}
                                type="text"
                                name="name"
                                placeholder={t('please enter warranty name')}
                                containerClass={'mb-3'}
                                col={'col-12'}
                            />
                            <FormInput
                                name="status"
                                type="select"
                                label={t('status')}
                                defaultValue="ACTIVE"
                                col={'col-12'}
                                containerClass={'mb-3'}>
                                <option value="ACTIVE">Active</option>
                                <option value="INACTIVE">Inactive</option>
                            </FormInput>

                            <div className="mb-3 text-end">
                                <Button variant="primary" type="submit">
                                    {editData ? t('update warranty') : t('add warranty')}
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

export default ModalCreateUpdate;