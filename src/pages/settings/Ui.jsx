import React from 'react';
import PageTitle from '../../components/PageTitle';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useUiListQuery } from '../../redux/services/uiService';
import { useSelector } from 'react-redux';
import ErrorDataLoad from '../../components/common/ErrorDataLoad';
import LoadingData from '../../components/common/LoadingData';
import { FormInput, VerticalForm } from '../../components';

const UiElement = ({ data }) => {
    const { t } = useTranslation();
    console.log(data)
    return Object.keys(data).map((key) => <>
        <h3>{key}</h3>
        {
            typeof (data[key]) === 'object' ?
                Object.keys(data[key]).map(prop =>
                    <FormInput
                        name={prop}
                        type="checkbox"
                        label={t(prop)}
                        col={'col-12 col-md-6 col-lg-4'}
                        containerClass={'mb-3'}
                    />
                ) :
                <FormInput
                    name={key}
                    type="checkbox"
                    label={t(key)}
                    col={'col-12 col-md-6 col-lg-4'}
                    containerClass={'mb-3'}
                />
        }
        {/* // <FormInput
        //     name={key}
        //     type="checkbox"
        //     label={t(key)}
        //     col={'col-12 col-md-6 col-lg-4'}
        //     containerClass={'mb-3'}
        // /> */}
    </>
    )
}

const Ui = () => {
    const { t } = useTranslation();
    const storeID = useSelector(state => state.setting.activeStore._id)
    const { data, isLoading, isError } = useUiListQuery(storeID, {
        skip: !storeID
    })
    console.log(data)
    let keys = []
    if (!isLoading && !isError) {
        keys = Object.entries(data);
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

                                    <VerticalForm
                                    //onSubmit={onSubmit} resolver={schemaResolver} defaultValues={defaultValues}
                                    >


                                        <UiElement data={data} />

                                        <div className="mb-3 col-12" col={'col-12'}>
                                            {/* <Button variant='primary' type='submit'>
                                                {t('submit')}
                                            </Button> */}
                                            {/* <Button variant="primary" type="submit">
                                                {editData ? t('update user') : t('create user')}
                                                &nbsp;{(isLoading || updateLoad) && <Spinner color={'primary'} size={'sm'} />}
                                            </Button> */}
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