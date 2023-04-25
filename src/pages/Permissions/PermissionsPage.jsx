//External Lib Import
import { Row, Col, Card, Tab, Nav } from 'react-bootstrap';

//Internal Lib Import
import PageTitle from '../../components/PageTitle';
import LoadingData from '../../components/common/LoadingData';
import ErrorDataLoad from '../../components/common/ErrorDataLoad';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

//External Lib Import
import PermissionsTable from './PermissionsTable';

//api services
import { useRoleDropDownQuery } from '../../redux/services/roleService';

const PermissionsPage = (): React$Element<React$FragmentType> => {
    const { t } = useTranslation();
    const { data, isLoading, isError } = useRoleDropDownQuery();

    if (isLoading) {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[{ label: t('Permission'), path: '/user-role', active: true }]}
                    title={t('Permission')}
                />
                <LoadingData />
            </>
        );
    } else if (isError) {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[{ label: t('Permission'), path: '/user-role', active: true }]}
                    title={t('Permission')}
                />
                <ErrorDataLoad />
            </>
        );
    } else {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[{ label: t('Permission'), path: '/user-role', active: true }]}
                    title={t('Permission')}
                />

                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Tab.Container defaultActiveKey={data?.[0]?.name}>
                                    <Nav variant="pills" className="no-borderd" as="ul">
                                        {data?.map((tab, index) => {
                                            return (
                                                <Nav.Item key={index}>
                                                    <Nav.Link to="#" eventKey={tab?.name}>
                                                        <i
                                                            className={classNames(
                                                                tab?.icon,
                                                                'd-md-none',
                                                                'd-block',
                                                                'me-1'
                                                            )}></i>
                                                        <span className="d-none d-md-block">{tab?.name}</span>
                                                    </Nav.Link>
                                                </Nav.Item>
                                            );
                                        })}
                                    </Nav>

                                    <Tab.Content>
                                        {data?.map((tab, index) => {
                                            return (
                                                <Tab.Pane eventKey={tab?.name} id={tab?._id} key={index}>
                                                    <PermissionsTable roleItem={tab} />
                                                </Tab.Pane>
                                            );
                                        })}
                                    </Tab.Content>
                                </Tab.Container>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </>
        );
    }
};

export default PermissionsPage;
