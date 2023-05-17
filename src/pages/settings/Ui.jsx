import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Button, Card, Col, Row, Tab, Tabs, Accordion } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useUiListQuery, useUiUpdateMutation } from '../../redux/services/uiService';
import { useSelector } from 'react-redux';
import ErrorDataLoad from '../../components/common/ErrorDataLoad';
import LoadingData from '../../components/common/LoadingData';
import { FormInput, VerticalForm } from '../../components';
import { useForm } from 'react-hook-form';
import removeEmptyObj from '../../helpers/removeEmptyObj';
const Ui = () => {
    const [defaultValues, setDefaultValues] = useState({
        "customer": {
            "fatherName": false,
            "address": false,
            "thana": false,
            "district": false,
            "email": false,
            "nid": false,
            "reference": false,
            "ledgerNumber": false,
            "customerType": false
        },
        "supplier": {
            "fatherName": false,
            "customerType": false,
            "address": false,
            "thana": false,
            "district": false,
            "email": false,
            "nid": false,
            "reference": false,
            "ledgerNumber": false
        },
        "staff": {
            "fatherName": false,
            "customerType": false,
            "address": false,
            "thana": false,
            "district": false,
            "email": false,
            "nid": false,
            "reference": false
        },
        "product": {
            "productModel": false,
            "productDetails": false,
            "productCode": false,
            "installment": false,
            "warranty": false,
            "barCode": false,
            "productExpireDate": false,
            "manufacturer": false
        },
        "storeUserName": false,
        "expenditure": false,
        "bankTransaction": false
    })
    const { t } = useTranslation();
    const storeID = useSelector(state => state.setting.activeStore?._id)
    const { data, isLoading, isError, isSuccess } = useUiListQuery(storeID, {
        skip: !storeID
    })
    const [uiUpdate, { isLoading: isUpdating, isSuccess: updateSuccess }] = useUiUpdateMutation()
    const {
        handleSubmit,
        register,
        control,
        setValue,
        reset,
        formState: { errors },
    } = useForm();
    const onSubmit = formData => {
        const postBody = removeEmptyObj(formData)
        uiUpdate({ id: data?._id, postBody })
    }

    useEffect(() => {
        if (isSuccess) {
            reset(data)
        }
    }, [isSuccess])

    if (isLoading)
        return (
            <>
                <PageTitle breadCrumbItems={[{ label: t('ui settings'), path: '/settings/ui', active: true }]} title={t('ui settings')} />
                <Card>
                    <Card.Body>
                        <LoadingData />
                    </Card.Body>
                </Card>
            </>
        )
    if (isError)
        return (
            <>
                <PageTitle breadCrumbItems={[{ label: t('ui settings'), path: '/settings/ui', active: true }]} title={t('ui settings')} />
                <Card>
                    <Card.Body>
                        <ErrorDataLoad />
                    </Card.Body>
                </Card>
            </>
        )
    else

        return (
            <>
                <PageTitle breadCrumbItems={[{ label: t('ui settings'), path: '/settings/ui', active: true }]} title={t('ui settings')} />
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body>
                                <Row className="mb-2">
                                    <VerticalForm
                                        onSubmit={handleSubmit(onSubmit)}
                                        // resolver={schemaResolver} 
                                        defaultValues={defaultValues}
                                    >
                                        <Accordion defaultActiveKey='0' alwaysOpen>
                                            {
                                                Object.keys(data).map((key, index) => {
                                                    if (key !== '_id') {
                                                        return (
                                                            <Accordion.Item key={index} eventKey={index}>
                                                                <Accordion.Header >
                                                                    {t(key)}
                                                                </Accordion.Header>
                                                                <Accordion.Body>
                                                                    {
                                                                        typeof (data[key]) === 'object' ?
                                                                            Object.keys(data[key]).map((prop, i) =>
                                                                                <FormInput
                                                                                    key={i}
                                                                                    name={`${key}.${prop}`}
                                                                                    register={register}
                                                                                    errors={errors}
                                                                                    type="checkbox"
                                                                                    label={t(prop)}
                                                                                    col={'col-6 col-md-6 col-lg-4'}
                                                                                    containerClass={'m-3'}
                                                                                />
                                                                            ) :
                                                                            <FormInput
                                                                                name={key}
                                                                                register={register}
                                                                                errors={errors}
                                                                                type="checkbox"
                                                                                label={t(key)}
                                                                                col={'col-12 col-md-6 col-lg-4'}
                                                                                containerClass={'m-3'}
                                                                            />
                                                                    }
                                                                </Accordion.Body>
                                                            </Accordion.Item>
                                                        )
                                                    }
                                                }
                                                )
                                            }
                                        </Accordion>

                                        <div className="my-3 text-center" col={'col-12'}>
                                            <Button variant='primary' type='submit'>
                                                {t('submit')}
                                            </Button>
                                        </div>
                                    </VerticalForm>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </>
        );
};

export default Ui;