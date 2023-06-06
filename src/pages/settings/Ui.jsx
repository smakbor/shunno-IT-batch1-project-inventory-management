import React from 'react';
import PageTitle from '../../components/PageTitle';
import { Button, Card, Col, Row, Tab, Tabs } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useUiListQuery } from '../../redux/services/uiService';
import { useSelector } from 'react-redux';
import ErrorDataLoad from '../../components/common/ErrorDataLoad';
import LoadingData from '../../components/common/LoadingData';
import { FormInput, VerticalForm } from '../../components';
import { useForm } from 'react-hook-form';

const UiElement = ({ data }) => {
    const { t } = useTranslation();
    return <Tabs>{
        Object.keys(data).map((key) => {


            if (key !== '_id') {
                return <Tab eventKey={key} title={t(key)} >
                    <div className=' d-flex justify-content-start flex-wrap'>
                        {
                            typeof (data[key]) === 'object' ?
                                Object.keys(data[key]).map(prop =>
                                    <FormInput
                                        name={prop}
                                        type="checkbox"
                                        label={t(prop)}
                                        col={'col-12 col-md-6 col-lg-4'}
                                        containerClass={'m-3'}
                                    />
                                ) :
                                <FormInput
                                    name={key}
                                    type="checkbox"
                                    label={t(key)}
                                    col={'col-12 col-md-6 col-lg-4'}
                                    containerClass={'m-3'}
                                />
                        }
                    </div>

                </Tab>
            }

        }
        )
    }
    </Tabs>
}

const Ui = () => {
    const { t } = useTranslation();
    const storeID = useSelector(state => state.setting.activeStore._id)
    const { data, isLoading, isError } = useUiListQuery(storeID, {
        skip: !storeID
    })
    const {
        handleSubmit,
        register,
        control,
        setValue,
        reset,
        formState: { errors },
    } = useForm();
    const onSubmit = formData => {
        console.log(formData)
    }
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

                                    <form
                                        onSubmit={handleSubmit(onSubmit)}
                                    // resolver={schemaResolver} defaultValues={defaultValues}
                                    >
                                        <Tabs>{
                                            Object.keys(data).map((key) => {


                                                if (key !== '_id') {
                                                    return <Tab eventKey={key} title={t(key)} >
                                                        <div className=' d-flex justify-content-start flex-wrap'>
                                                            {
                                                                typeof (data[key]) === 'object' ?
                                                                    Object.keys(data[key]).map(prop =>
                                                                        <FormInput
                                                                            name={prop}
                                                                            register={register}
                                                                            errors={errors}
                                                                            type="checkbox"
                                                                            label={t(prop)}
                                                                            col={'col-12 col-md-6 col-lg-4'}
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
                                                        </div>

                                                    </Tab>
                                                }

                                            }
                                            )
                                        }
                                        </Tabs>

                                        <div className="mb-1 text-center" col={'col-12'}>
                                            <Button variant='primary' type='submit'>
                                                {t('submit')}
                                            </Button>
                                            {/* <Button variant="primary" type="submit">
                                                {editData ? t('update user') : t('create user')}
                                                &nbsp;{(isLoading || updateLoad) && <Spinner color={'primary'} size={'sm'} />}
                                            </Button> */}
                                        </div>
                                    </form>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </>
        );
};

export default Ui;