//External Lib Import
import { Row, Col, Card, Tab, Tabs, Nav } from 'react-bootstrap';

//Internal Lib Import
import PageTitle from '../../components/PageTitle';
import LoadingData from '../../components/common/LoadingData';
import ErrorDataLoad from '../../components/common/ErrorDataLoad';
import { useTranslation } from 'react-i18next';

//External Lib Import
import PermissionsTable from './PermissionsTable';

//api services
import { useRoleDropDownQuery } from '../../redux/services/roleService';
import { useProfileDetailsQuery } from '../../redux/services/profileService';

const PermissionsPage = () => {
    const { t } = useTranslation();
    const { data: profile, isLoading: profileLoad, isError: profileError } = useProfileDetailsQuery() || {};
    const { data, isLoading, isError } = useRoleDropDownQuery(profile?.storeID, {
        skip: !profile?.storeID,
    });

    if (isLoading || profileLoad) {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[{ label: t('permission'), path: '/user-role', active: true }]}
                    title={t('permission')}
                />
                <LoadingData />
            </>
        );
    } else if (isError || profileError) {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[{ label: t('permission'), path: '/user-role', active: true }]}
                    title={t('permission')}
                />
                <ErrorDataLoad />
            </>
        );
    } else {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[{ label: t('permission'), path: '/user-role', active: true }]}
                    title={t('permission')}
                />

                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Tabs
                                    defaultActiveKey={data?.[0]?.label}
                                    transition={false}
                                    className="mb-4 nav-bordered">
                                    {data?.map((tab, index) => {
                                        return (
                                            <Tab eventKey={tab?.label} title={tab?.label}>
                                                <PermissionsTable roleItem={tab} index={index} />
                                            </Tab>
                                        );
                                    })}
                                </Tabs>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </>
        );
    }
};

export default PermissionsPage;
