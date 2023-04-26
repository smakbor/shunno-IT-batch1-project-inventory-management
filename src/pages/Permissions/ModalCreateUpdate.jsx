//External Lib Import
import React, { useEffect } from 'react';
import { Card, Button, Modal, Spinner } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

//api sevices
import { useRoleCreateMutation, useRoleUpdateMutation } from '../../redux/services/roleService';
import { FormInput, VerticalForm } from '../../components';
import removeEmptyObj from '../../helpers/removeEmptyObj';

const ModalCreateUpdate = ({ modal, setModal, toggle, editData, defaultValues }) => {
    const { t } = useTranslation();
    const [roleCreate, { isLoading, isSuccess }] = useRoleCreateMutation();
    const [roleUpdate, { isLoading: updateLoad, isSuccess: updateSucess }] = useRoleUpdateMutation();

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required(t('Please enter Role Name')).min(3, t('Minimum Containing 3 letter')),
            status: yup.boolean().required(),
        })
    );

    /*
     * handle form submission
     */
    const onSubmit = (formData) => {
        if (!editData) {
            roleCreate(removeEmptyObj(formData));
        } else {
            const postBody = removeEmptyObj(formData);
            roleUpdate({ id: editData._id, postBody });
        }
    };

    useEffect(() => {
        if (isSuccess || updateSucess) {
            setModal(false);
        }
    }, [isSuccess, updateSucess]);

    return (
        <Card className={classNames('', { 'd-none': !modal })}>
            <Card.Body>
                <Modal show={modal} onHide={toggle} backdrop="statica" keyboard={false}>
                    <Modal.Header onHide={toggle} closeButton>
                        <h4 className="modal-title">{editData ? t('Update User Role') : t('Create User Role')}</h4>
                    </Modal.Header>

                    <Modal.Body>
                        <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={defaultValues}>
                            <FormInput
                                label={t('Role Name')}
                                type="text"
                                name="name"
                                placeholder={t('Please enter Role Name')}
                                containerClass={'mb-3'}
                                col={'col-12'}
                            />

                            <FormInput
                                label={t('Role Status')}
                                type="checkbox"
                                name="status"
                                containerClass={'mb-3 text-muted'}
                                placeholder={t('Please enter Role Status')}
                            />
                            <div className="mb-3 text-end">
                                <Button variant="primary" type="submit">
                                    {editData ? t('Update Role') : t('Create Role')}
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
