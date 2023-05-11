//External Lib Import
import React, { useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';

//Internal Lib Import
import PageTitle from '../../components/PageTitle';
import Table from '../../components/Table';
import LoadingData from '../../components/common/LoadingData';
import ErrorDataLoad from '../../components/common/ErrorDataLoad';
import DateFormatter from '../../utils/DateFormatter';

//api services
import { useRoleDeleteMutation, useRoleListQuery } from '../../redux/services/roleService';
import AleartMessage from '../../utils/AleartMessage';
import ModalCreateUpdate from './ModalCreateUpdate';
import { useTranslation } from 'react-i18next';
import { useProfileDetailsQuery } from '../../redux/services/profileService';
import ExportData from '../../components/ExportData';

// main component
const UserRolePage = () => {
    const { t } = useTranslation();
    const [defaultValues, setDefaultValues] = useState({ name: '', visibility: true });
    const [modal, setModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const { data: profile } = useProfileDetailsQuery() || {};
    const [roleDelete] = useRoleDeleteMutation();
    const {
        data: roles,
        isLoading,
        isError,
    } = useRoleListQuery(profile?.storeID, {
        skip: !profile?.storeID,
    });

    /**
     * Show/hide the modal
     */

    const addShowModal = () => {
        setEditData(null);
        setDefaultValues({ name: '', visibility: true });
        setModal(!modal);
    };

    const toggle = (e) => {
        setModal(!modal);
    };

    /* action column render */
    const ActionColumn = ({ row }) => {
        const edit = () => {
            toggle();
            setEditData(row?.original);
            setDefaultValues(row?.original);
        };

        return (
            <>
                <span role="button" className="action-icon text-warning" onClick={edit}>
                    <i className="mdi mdi-square-edit-outline"></i>
                </span>
                <span
                    role="button"
                    className="action-icon text-danger"
                    onClick={() =>
                        AleartMessage.Delete({ id: row?.original._id, storeID: profile?.storeID }, roleDelete)
                    }>
                    <i className="mdi mdi-delete"></i>
                </span>
            </>
        );
    };

    // get all columns
    const columns = [
        {
            Header: '#',
            accessor: 'sl',
            sort: true,
            Cell: ({ row }) => row.index + 1,
            classes: 'table-user',
        },
        {
            Header: t('user role'),
            accessor: 'userRole',
            sort: true,
            Cell: ({ row }) => row.original.name,
            classes: 'table-user',
        },
        {
            Header: t('status'),
            accessor: 'visibility',
            sort: true,
            Cell: ({ row }) =>
                row.original.visibility ? (
                    <div className="badge bg-success">{t('active')}</div>
                ) : (
                    <div className="badge bg-danger">{t('inactive')}</div>
                ),
            classes: 'table-user',
        },
        {
            Header: t('created date'),
            accessor: 'createdAt',
            sort: true,
            Cell: ({ row }) => DateFormatter(row?.original?.createdAt),
            classes: 'table-user',
        },
        {
            Header: t('action'),
            accessor: 'action',
            sort: false,
            classes: 'table-action',
            Cell: ActionColumn,
        },
    ];

    // get pagelist to display
    const sizePerPageList = [
        {
            text: t('5'),
            value: 5,
        },
        {
            text: t('10'),
            value: 10,
        },
        {
            text: t('50'),
            value: 50,
        },
    ];

    if (isLoading) {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[{ label: t('user role'), path: '/user-role', active: true }]}
                    title={t('user role')}
                />
                <LoadingData />
            </>
        );
    } else if (isError) {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[{ label: t('user role'), path: '/user-role', active: true }]}
                    title={t('user role')}
                />
                <ErrorDataLoad />
            </>
        );
    } else {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[{ label: t('user role'), path: '/user-role', active: true }]}
                    title={t('user role')}
                />

                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body>
                                <Row className="mb-2">
                                    <Col sm={5}>
                                        <Button variant="danger" className="mb-2" onClick={addShowModal}>
                                            <i className="mdi mdi-plus-circle me-2"></i> {t('add user role')}
                                        </Button>
                                    </Col>
                                    <ExportData name="roles" data={roles} />
                                </Row>

                                <Table
                                    columns={columns}
                                    data={roles || []}
                                    pageSize={5}
                                    sizePerPageList={sizePerPageList}
                                    isSortable={true}
                                    pagination={true}
                                    isSelectable={false}
                                    isSearchable={true}
                                    tableClass="table-striped"
                                    theadClass="table-light"
                                    searchBoxClass="mt-2 mb-3"
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <ModalCreateUpdate {...{ modal, setModal, toggle, editData, defaultValues }} />
            </>
        );
    }
};

export default UserRolePage;
