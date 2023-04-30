//external lib import
import React, { useEffect } from 'react';
import { Card, Button, Modal, Spinner } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

//internal lib import
import { FormInput, VerticalForm } from '../../components';
import removeEmptyObj from '../../helpers/removeEmptyObj';

//api services
import { useRoleCreateMutation, useRoleUpdateMutation } from '../../redux/services/roleService';

const ModalCreateUpdate = ({ modal, setModal, toggle, editData, defaultValues }) => {
    const { t } = useTranslation();
    const [roleCreate, { isLoading, isSuccess }] = useRoleCreateMutation();
    const [roleUpdate, { isLoading: updateLoad, isSuccess: updateSuccess }] = useRoleUpdateMutation();

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required(t('please enter role name')).min(3, t('minimum containing 3 letter')),
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
            roleUpdate({ id: editData.id, postBody });
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
                        <h4 className="modal-title">{editData ? t('update user role') : t('create user role')}</h4>
                    </Modal.Header>

                    <Modal.Body>
                        <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={defaultValues}>
                            <FormInput
                                label={t('role name')}
                                type="text"
                                name="name"
                                placeholder={t('please enter role name')}
                                containerClass={'mb-3'}
                                col={'col-12'}
                            />

                            <FormInput
                                label={t('role status')}
                                type="checkbox"
                                name="status"
                                containerClass={'mb-3 text-muted'}
                                placeholder={t('please enter role status')}
                            />
                            <div className="mb-3 text-end">
                                <Button variant="primary" type="submit">
                                    {editData ? t('update role') : t('update role')}
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
