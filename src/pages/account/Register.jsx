// External Lib Import
import { Navigate, Link } from 'react-router-dom';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';

// Internal Lib Import
import { VerticalForm, FormInput } from '../../components';
import AccountLayout from './AccountLayout';
import { useRegisterMutation } from '../../redux/services/authService';
import { districts, upazillas } from '../../helpers/bangladeshGeo';
import { useState } from 'react';

/* bottom link */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <Row className="mt-3">
            <Col className="text-center">
                <p className="text-muted">
                    {t('Already have account?')}
                    <Link to={'/account/login'} className="text-muted ms-1">
                        <b>{t('Log In')}</b>
                    </Link>
                </p>
            </Col>
        </Row>
    );
};

const Register = () => {
    const { accessToken } = useSelector((state) => state.auth);
    const [district, setDistrict] = useState('');
    const { language } = useSelector((state) => state.setting);
    const { t } = useTranslation();
    const [register, { isLoading, isSuccess, isError, error }] = useRegisterMutation();

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            storeName: yup
                .string()
                .required(t('Please enter Organization Name'))
                .min(3, t('Minimum Containing 3 letter')),
            name: yup.string().required(t('Please enter Owner Name')).min(3, t('Minimum Containing 3 letter')),
            mobile: yup
                .string()
                .required(t('Please enter Mobile'))
                .matches(/(^(\+88|0088|88)?(01){1}[3456789]{1}(\d){8})$/, t('Write 11 Digit Mobile Number')),
            email: yup.string().required(t('Please enter Email')).email(t('Incorrect Email')),
            address: yup.string().required(t('Please enter Address')).min(3, t('Minimum Containing 3 letter')),
            district: yup.string().required(t('Please select District')),
            thana: yup.string().required(t('Please select Thana')),
            referenceName: yup.string().notRequired().min(3, t('Minimum Containing 3 letter')),
            referenceMobile: yup
                .string()
                .notRequired()
                .matches(/(^(\+88|0088|88)?(01){1}[3456789]{1}(\d){8})$/, t('Write 11 Digit Mobile Number')),
        })
    );

    /*
     * handle form submission
     */
    const onSubmit = (formData) => {
        const { referenceName, referenceMobile, ...others } = formData;
        register({
            ...others,
            reference: {
                name: referenceName,
                mobile: referenceMobile,
            },
        });
    };

    if (isSuccess) {
        return <Navigate to="/account/login" replace />;
    }

    if (accessToken) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <AccountLayout bottomLinks={<BottomLink />} className="col-md-10">
            <div className="text-center w-75 m-auto">
                <h4 className="text-dark-50 text-center mt-0 fw-bold">{t('Free Sign Up')}</h4>
                <p className="text-muted mb-4">
                    {t("Don't have an account? Create your account, it takes less than a minute.")}
                </p>
            </div>

            {isError && (
                <Alert variant="danger" className="my-2">
                    {error?.data?.message}
                </Alert>
            )}

            <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{}}>
                <FormInput
                    label={t('Organization Name')}
                    type="text"
                    name="storeName"
                    placeholder={t('Please enter Organization Name')}
                    containerClass={'mb-3'}
                    col={'col-md-6 col-xs-12'}
                />
                <FormInput
                    label={t('Owner Name')}
                    type="text"
                    name="name"
                    placeholder={t('Please enter Owner Name')}
                    containerClass={'mb-3'}
                    col={'col-md-6 col-xs-12'}
                />
                <FormInput
                    label={t('Mobile')}
                    type="text"
                    name="mobile"
                    placeholder={t('Please enter Mobile')}
                    containerClass={'mb-3'}
                    col={'col-md-6 col-xs-12'}
                />
                <FormInput
                    label={t('Email')}
                    type="text"
                    name="email"
                    placeholder={t('Please enter Email')}
                    containerClass={'mb-3'}
                    col={'col-md-6 col-xs-12'}
                />

                <FormInput
                    label={t('Reference Name')}
                    type="text"
                    name="referenceName"
                    placeholder={t('Please enter Reference Name')}
                    containerClass={'mb-3'}
                    col={'col-md-6 col-xs-12'}
                />
                <FormInput
                    label={t('Reference Mobile')}
                    type="text"
                    name="referenceMobile"
                    placeholder={t('Please enter Reference Mobile')}
                    containerClass={'mb-3'}
                    col={'col-md-6 col-xs-12'}
                />
                <FormInput
                    label={t('District')}
                    type="select"
                    name="district"
                    containerClass={'mb-3'}
                    col={'col-md-6 col-xs-12'}
                    onChange={(e) => setDistrict(e.target.value)}>
                    <option value="">{t('Please select District')}</option>
                    {districts.map((district) => (
                        <option value={district?.name} key={district?.id}>
                            {language === 'bn' ? district?.bn_name : district?.name}
                        </option>
                    ))}
                </FormInput>
                <FormInput
                    label={t('Thana')}
                    type="select"
                    name="thana"
                    containerClass={'mb-3'}
                    col={'col-md-6 col-xs-12'}>
                    <option value="">{t('Please select Thana')}</option>
                    {upazillas
                        .filter((filterDistrict) => filterDistrict.district_id === district)
                        .map((district) => (
                            <option value={district?.name} key={district?.id}>
                                {language === 'bn' ? district?.bn_name : district?.name}
                            </option>
                        ))}
                </FormInput>
                <FormInput
                    label={t('Address')}
                    type="textarea"
                    name="address"
                    placeholder={t('Please enter Address')}
                    containerClass={'mb-3'}
                    col={'col-12'}
                />

                <div className="mb-3 mb-0">
                    <Button variant="primary" type="submit" disabled={isLoading} className="w-100">
                        {t('Sign Up')}
                    </Button>
                </div>
            </VerticalForm>
        </AccountLayout>
    );
};

export default Register;
