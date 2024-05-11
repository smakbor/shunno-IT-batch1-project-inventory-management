//External Lib Import
import { useSelector } from 'react-redux';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

//Internal Lib Import
import { VerticalForm, FormInput } from '../../components';
import AccountLayout from './AccountLayout';
import { useLoginMutation } from '../../redux/services/authService';

/* bottom link of account pages */
const BottomLink = () => {
    const { t } = useTranslation();
    return (
        <Row className="mt-3">
            <Col className="text-center">
                <p className="text-muted">
                    {t("don't have an account?")}{' '}
                    <Link to={'/account/register'} className="text-muted ms-1">
                        <b>{t('sign up')}</b>
                    </Link>
                </p>
            </Col>
        </Row>
    );
};

const Login = () => {
    const { accessToken } = useSelector((state) => state.auth);
    const { t } = useTranslation();

    const [login, { isLoading, isError, error }] = useLoginMutation();
    console.log(login)

    /*
    form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            mobile: yup.string().required(t('please enter mobile')),
            password: yup.string().required(t('please enter password')),
        })
    );

    /*
    handle form submission
    */
    const onSubmit = (formData) => login(formData);

    if (accessToken) {
        return <Navigate to={'/dashboard'} replace />;
    }

    return (
        <AccountLayout bottomLinks={<BottomLink />} className="col-md-8 col-lg-6 col-xl-5 col-xxl-4 col-md-8">
            <div className="text-center w-75 m-auto">
                <h4 className="text-dark-50 text-center mt-0 fw-bold">{t('Sign In')}</h4>
                <p className="text-muted mb-4">{t('enter your mobile number and password to access admin panel.')}</p>
            </div>

            {isError && (
                <Alert variant="danger" className="my-2">
                    {error?.data?.message}
                </Alert>
            )}

            <VerticalForm
                onSubmit={onSubmit}
                resolver={schemaResolver}
                defaultValues={{ mobile: '01518453965', password: '12345678' }}>
                <FormInput
                    label={t('Mobile')}
                    type="text"
                    name="mobile"
                    placeholder={t('Please enter Mobile')}
                    containerClass={'mb-3'}
                    col="col-12"
                />
                <FormInput
                    label={t('Password')}
                    type="password"
                    name="password"
                    placeholder={t('Enter your password')}
                    containerClass={'mb-3'}
                    col="col-12">
                    <Link to="/account/forget-password" className="text-muted float-end">
                        <small>{t('Forgot your password?')}</small>
                    </Link>
                </FormInput>

                <div className="mb-3 mb-0 text-center">
                    <Button variant="primary" type="submit" disabled={isLoading}>
                        {t('Log In')}
                    </Button>
                </div>
            </VerticalForm>
        </AccountLayout>
    );
};

export default Login;
