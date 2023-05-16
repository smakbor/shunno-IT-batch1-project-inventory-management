//External Lib Import
import React, { useEffect } from 'react';
import { Card, Button, Modal, Spinner } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

//Internal Lib Import
import { FormInput, VerticalForm } from '../../components';

//api services
import { useStaffResetPasswordMutation } from '../../redux/services/staffService';

const ResetPassModal = ({ modalResetPass, setModalResetPass, toggleResetPass, resetPassData }) => {
    const { t } = useTranslation();
    const [staffResetPassword, { isSuccess, isLoading }] = useStaffResetPasswordMutation();

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            password: yup
                .string()
                .required(t('please enter password'))
                .min(8, t('password must be at least 8 characters'))
                .matches(
                    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=\S+$).{6,20}$/,
                    'password must contain at least 1 letter and 1 number'
                ),
            confirmPassword: yup.string().oneOf([yup.ref('password'), null], t('passwords must match')),
        })
    );

    /*
     * handle form submission
     */

    const onSubmit = ({ password }) => {
        staffResetPassword(password);
    };

    useEffect(() => {
        if (isSuccess) {
            setModalResetPass(false);
        }
    }, [isSuccess]);

    return (
        <Card className={classNames('', { 'd-none': !modalResetPass })}>
            <Card.Body>
                <Modal show={modalResetPass} onHide={toggleResetPass} backdrop="statica" keyboard={false}>
                    <Modal.Header onHide={toggleResetPass} closeButton>
                        <h4 className="modal-title">{t('reset password')}</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{}}>
                            <FormInput
                                label={t('password')}
                                type="password"
                                name="password"
                                placeholder={t('please enter password')}
                                containerClass={'mb-3'}
                                required={true}
                                col="col-12"
                            />

                            <FormInput
                                label={t('confirm password')}
                                type="password"
                                name="confirmPassword"
                                placeholder={t('please enter confirm password')}
                                containerClass={'mb-3'}
                                required={true}
                                col="col-12"
                            />

                            <div className="mb-3 text-end">
                                <Button variant="primary" type="submit">
                                    {t('reset password')}
                                    &nbsp;{isLoading && <Spinner color={'primary'} size={'sm'} />}
                                </Button>
                            </div>
                        </VerticalForm>
                    </Modal.Body>
                </Modal>
            </Card.Body>
        </Card>
    );
};

export default ResetPassModal;
