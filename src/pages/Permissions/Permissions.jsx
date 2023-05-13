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
import { useRoleListQuery } from '../../redux/services/roleService';
import { useProfileDetailsQuery } from '../../redux/services/profileService';
import { useEffect, useState } from 'react';

const Permissions = () => {
    const { t } = useTranslation();
    const { data: profile, isLoading: profileLoad, isError: profileError } = useProfileDetailsQuery() || {};
    const {
        data: allRoles,
        isLoading,
        isError,
    } = useRoleListQuery(profile?.storeID, {
        skip: !profile?.storeID,
    });

    const [activeRole, setActiveRole] = useState([]);

    useEffect(() => {
        if (allRoles) {
            setActiveRole(allRoles.filter((r) => r.visibility === true));
        }
    }, []);

    if (isLoading || profileLoad) {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[{ label: t('user role'), path: '/user-role', active: true }]}
                    title={t('user role')}
                />
                <Card>
                    <Card.Body>
                        <LoadingData />
                    </Card.Body>
                </Card>
            </>
        );
    } else if (isError || profileError) {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[{ label: t('user role'), path: '/user-role', active: true }]}
                    title={t('user role')}
                />
                <Card>
                    <Card.Body>
                        <ErrorDataLoad />
                    </Card.Body>
                </Card>
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
                                    defaultActiveKey={activeRole?.[0]?.name}
                                    transition={false}
                                    className="mb-4 nav-bordered">
                                    {activeRole?.map((tab, index) => {
                                        return (
                                            <Tab eventKey={tab?.name} title={tab?.name}>
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

export default Permissions;
