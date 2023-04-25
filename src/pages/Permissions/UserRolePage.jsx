//External Lib Import
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';

//Internal Lib Import
import PageTitle from '../../components/PageTitle';
import Table from '../../components/Table';
import exportFromJson from '../../utils/exportFromJson';
import { GrDocumentCsv } from 'react-icons/gr';
import { SiMicrosoftexcel } from 'react-icons/si';
import { BiImport } from 'react-icons/bi';
import LoadingData from '../../components/common/LoadingData';
import ErrorDataLoad from '../../components/common/ErrorDataLoad';
import DateFormatter from '../../utils/DateFormatter';

//api services
import { useRoleDeleteMutation, useRoleListQuery } from '../../redux/services/roleService';
import AleartMessage from '../../utils/AleartMessage';
import ModalCreateUpdate from './ModalCreateUpdate';
import { useTranslation } from 'react-i18next';

// main component
const UserRolePage = () => {
    const { t } = useTranslation();
    const [defaultValues, setDefaultValues] = useState({ name: '', status: true });

    const [modal, setModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const [roleDelete] = useRoleDeleteMutation();
    const { data, isLoading, isError } = useRoleListQuery();

    /**
     * Show/hide the modal
     */

    const addShowModal = () => {
        setEditData(null);
        setDefaultValues({ name: '', status: true });
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
                    onClick={() => AleartMessage.Delete(row?.original._id, roleDelete)}>
                    <i className="mdi mdi-delete"></i>
                </span>
            </>
        );
    };

    // get all columns
    const columns = [
        {
            Header: 'ID',
            accessor: 'sl',
            sort: true,
            Cell: ({ row }) => row.index + 1,
            classes: 'table-user',
        },
        {
            Header: 'User Role',
            accessor: 'UserRole',
            sort: true,
            Cell: ({ row }) => row.original.label,
            classes: 'table-user',
        },
        {
            Header: 'Status',
            accessor: 'Status',
            sort: true,
            Cell: ({ row }) =>
                row.original.status ? (
                    <div className="badge bg-success">Active</div>
                ) : (
                    <div className="badge bg-danger">Deactive</div>
                ),
            classes: 'table-user',
        },
        {
            Header: 'Created Date',
            accessor: 'createdAt',
            sort: true,
            Cell: ({ row }) => DateFormatter(row?.original?.createdAt),
            classes: 'table-user',
        },
        {
            Header: 'Action',
            accessor: 'action',
            sort: false,
            classes: 'table-action',
            Cell: ActionColumn,
        },
    ];

    // get pagelist to display
    const sizePerPageList = [
        {
            text: '5',
            value: 5,
        },
        {
            text: '10',
            value: 10,
        },
        {
            text: '50',
            value: 50,
        },
    ];

    if (isLoading) {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[{ label: t('User Role'), path: '/user-role', active: true }]}
                    title={t('User Role')}
                />
                <LoadingData />
            </>
        );
    } else if (isError) {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[{ label: t('User Role'), path: '/user-role', active: true }]}
                    title={t('User Role')}
                />
                <ErrorDataLoad />
            </>
        );
    } else {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[{ label: t('User Role'), path: '/user-role', active: true }]}
                    title={t('User Role')}
                />

                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body>
                                <Row className="mb-2">
                                    <Col sm={5}>
                                        <Button variant="danger" className="mb-2" onClick={addShowModal}>
                                            <i className="mdi mdi-plus-circle me-2"></i> {t('Add User Role')}
                                        </Button>
                                    </Col>

                                    <Col sm={7}>
                                        <div className="text-sm-end">
                                            <Button variant="success" className="mb-2 me-1">
                                                <i className="mdi mdi-cog"></i>
                                            </Button>

                                            <Button variant="light" className="mb-2 me-1">
                                                <BiImport /> {t('Import')}
                                            </Button>

                                            <Button
                                                variant="light"
                                                className="mb-2 me-1"
                                                onClick={() => exportFromJson([{ name: 'f' }], 'roles', 'xls')}>
                                                <SiMicrosoftexcel />
                                                {t('Export')}
                                            </Button>
                                            <Button
                                                variant="light"
                                                className="mb-2 me-1"
                                                onClick={() => exportFromJson([{ name: 'f' }], 'roles', 'csv')}>
                                                <GrDocumentCsv /> {t('Export')}
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>

                                <Table
                                    columns={columns}
                                    data={data}
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
