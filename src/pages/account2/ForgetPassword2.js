// @flow
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// components
import { VerticalForm, FormInput } from '../../components';

import AccountLayout from './AccountLayout';
import { useFotgetPasswordMutation } from '../../redux/services/authService';

const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer footer-alt">
            <p className="text-muted">
                {t('Back to')}{' '}
                <Link to={'/account/login2'} className="text-muted ms-1">
                    <b>{t('Log In')}</b>
                </Link>
            </p>
        </footer>
    );
};

const ForgetPassword2 = (): React$Element<React$FragmentType> => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [fotgetPassword, { isLoading, data, isSuccess, isError }] = useFotgetPasswordMutation();

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            username: yup.string().required(t('Please enter Username')),
        })
    );

    /*
     * handle form submission
     */
    const onSubmit = (formData) => {};

    return (
        <>
            <AccountLayout bottomLinks={<BottomLink />}>
                <h4 className="mt-0">{t('Reset Password')}</h4>
                <p className="text-muted mb-4">
                    {t("Enter your email address and we'll send you an email with instructions to reset your password")}
                </p>

                {isSuccess && <Alert variant="success">{data.message}</Alert>}

                {isError && (
                    <Alert variant="danger" className="my-2">
                        {isError.message}
                    </Alert>
                )}

                {!true && (
                    <VerticalForm onSubmit={onSubmit} resolver={schemaResolver}>
                        <FormInput
                            label={t('Username')}
                            type="text"
                            name="username"
                            placeholder={t('Enter your Username')}
                            containerClass={'mb-3'}
                        />

                        <div className="mb-0 text-center d-grid">
                            <Button variant="primary" type="submit" disabled={isLoading}>
                                <i className="mdi mdi-lock-reset"></i> {t('Reset Password')}
                            </Button>
                        </div>
                    </VerticalForm>
                )}
            </AccountLayout>
        </>
    );
};

export default ForgetPassword2;
