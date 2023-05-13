//External Lib Import
import React, { useState } from 'react';
import { Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { GrDocumentCsv } from 'react-icons/gr';
import { SiMicrosoftexcel } from 'react-icons/si';
import { BiImport } from 'react-icons/bi';
import classNames from 'classnames';

//Internal Lib Import
import PageTitle from '../../components/PageTitle';
import Table from '../../components/Table';
import exportFromJson from '../../utils/exportFromJson';
import LoadingData from '../../components/common/LoadingData';
import ErrorDataLoad from '../../components/common/ErrorDataLoad';
import AleartMessage from '../../utils/AleartMessage';

//api services

import { useStaffListQuery, useStaffDeleteMutation } from '../../redux/services/staffService';

import UserCreateUpdateModal from './UserCreateUpdateModal';
import DateFormatter from '../../utils/DateFormatter';

// main component
const Users = () => {
    const { t } = useTranslation();
    const [defaultValues, setDefaultValues] = useState({ name: '', status: true });

    const [modal, setModal] = useState(false);
    const [editData, setEditData] = useState(false);

    const [staffDelete] = useStaffDeleteMutation();

    const { data: staffs, isLoading, isError } = useStaffListQuery();

    /**
     * Show/hide the modal
     */

    const addShowModal = () => {
        setEditData(false);
        setDefaultValues({ name: '', status: '' });
        setModal(!modal);
    };

    const toggle = (e) => {
        setModal(!modal);
    };

    /* action column render */
    const ActionColumn = ({ row }) => {
        const edit = () => {
            toggle();
            let { reference, ...updateData } = { ...row.original };
            updateData.refName = row.original.reference?.name || '';
            updateData.refAddress = row.original.reference?.address || '';
            updateData.refMobile = row.original.reference?.mobile || '';
            console.log(updateData);
            setEditData(updateData);
            setDefaultValues(updateData);
        };

        return (
            <>
                <span role="button" className="action-icon text-info" onClick={edit}>
                    <i className="mdi mdi-eye"></i>
                </span>
                <span role="button" className="action-icon text-warning" onClick={edit}>
                    <i className="mdi mdi-square-edit-outline"></i>
                </span>
                <span
                    role="button"
                    className="action-icon text-danger"
                    onClick={() => AleartMessage.Delete(row?.original._id, staffDelete)}>
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
            Header: t('name'),
            accessor: 'name',
            sort: true,
            Cell: ({ row }) => row.original.name || 'NA',
            classes: 'table-user',
        },
        {
            Header: t('mobile'),
            accessor: 'mobile',
            sort: true,
            Cell: ({ row }) => row.original.mobile || 'NA',
            classes: 'table-user',
        },
        {
            Header: t('address'),
            accessor: 'address',
            sort: true,
            Cell: ({ row }) => row.original.address || 'NA',

            classes: 'table-user',
        },
        {
            Header: t('due'),
            accessor: 'due',
            sort: true,
            Cell: ({ row }) => row.original.due || 'NA',
            classes: 'table-user',
        },
        {
            Header: t('created on'),
            accessor: 'createdAt',
            sort: true,
            Cell: ({ row }) => DateFormatter(row.original.createdAt),
            classes: 'table-user',
        },
        {
            Header: t('status'),
            accessor: 'status',
            sort: true,
            Cell: ({ row }) => (
                <span
                    className={classNames('badge', {
                        'badge-success-lighten': row.original.status === 'ACTIVE',
                        'badge-danger-lighten': row.original.status === 'BLOCKED',
                        'badge-danger-lighten': row.original.status === 'BANNED',
                    })}>
                    {row.original.status}
                </span>
            ),
            classes: 'table-user',
        },
        {
            Header: t('action'),
            accessor: 'action',
            sort: true,
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
                <PageTitle breadCrumbItems={[{ label: t('users'), path: '/users', active: true }]} title={t('users')} />
                <Card>
                    <Card.Body>
                        <LoadingData />
                    </Card.Body>
                </Card>
            </>
        );
    } else if (isError) {
        return (
            <>
                <PageTitle breadCrumbItems={[{ label: t('users'), path: '/users', active: true }]} title={t('users')} />
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
                <PageTitle breadCrumbItems={[{ label: t('users'), path: '/users', active: true }]} title={t('users')} />
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body>
                                <Row className="mb-2">
                                    <Col sm={5}>
                                        <Button variant="danger" className="mb-2" onClick={addShowModal}>
                                            <i className="mdi mdi-plus-circle me-2"></i> {t('add user')}
                                        </Button>
                                    </Col>

                                    <Col sm={7}>
                                        <div className="text-sm-end">
                                            <Button variant="success" className="mb-2 me-1">
                                                <i className="mdi mdi-cog"></i>
                                            </Button>

                                            <Button variant="light" className="mb-2 me-1">
                                                <BiImport />
                                                {t('import')}
                                            </Button>

                                            <Button
                                                variant="light"
                                                className="mb-2 me-1"
                                                onClick={() => exportFromJson([{ name: 'f' }], 'roles', 'xls')}>
                                                <SiMicrosoftexcel />
                                                {t('export')}
                                            </Button>
                                            <Button
                                                variant="light"
                                                className="mb-2 me-1"
                                                onClick={() => exportFromJson([{ name: 'f' }], 'roles', 'csv')}>
                                                <GrDocumentCsv /> {t('export')}
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>

                                <Table
                                    columns={columns}
                                    data={staffs}
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
                <UserCreateUpdateModal {...{ modal, setModal, toggle, editData, defaultValues }} />
            </>
        );
    }
};

export default Users;
