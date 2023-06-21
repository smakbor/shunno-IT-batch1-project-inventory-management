//External Lib Import
import React, { useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { GrDocumentCsv } from 'react-icons/gr';
import { SiMicrosoftexcel } from 'react-icons/si';
import { BiImport } from 'react-icons/bi';

//Internal Lib Import
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';
import exportFromJson from '../../../utils/exportFromJson';
import LoadingData from '../../../components/common/LoadingData';
import ErrorDataLoad from '../../../components/common/ErrorDataLoad';
import AleartMessage from '../../../utils/AleartMessage';
import UnitCreateUpdate from './UnitCreateUpdate';

//api services
import { useUnitListQuery, useUnitDeleteMutation } from '../../../redux/services/unitService';
import { useSelector } from 'react-redux';

// main component
const Units = () => {
    const { t } = useTranslation();
    const [defaultValues, setDefaultValues] = useState({ name: '' });

    const [modal, setModal] = useState(false);
    const [editData, setEditData] = useState(false);
    const storeID = useSelector((state) => state.setting.activeStore?._id);
    const [unitDelete] = useUnitDeleteMutation();
    const { data, isLoading, isError } = useUnitListQuery(storeID, {
        skip: !storeID,
    });

    /**
     * Show/hide the modal
     */

    const addShowModal = () => {
        setEditData(false);
        setDefaultValues({ name: '', status: 'ACTIVE' });
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
                    onClick={() => AleartMessage.Delete(row?.original._id, unitDelete)}>
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
            sort: false,
            Cell: ({ row }) => row.index + 1,
            classes: 'table-user',
        },
        {
            Header: t('unit name'),
            accessor: 'name',
            sort: true,
            Cell: ({ row }) => row.original.name,
            classes: 'table-user',
        },
        {
            Header: t('status'),
            accessor: 'status',
            sort: true,
            Cell: ({ row }) =>
                row.original.status === 'ACTIVE' ? (
                    <div className="badge badge-success-lighten">{t('active')}</div>
                ) : (
                    <div className="badge badge-danger-lighten">{t('inactive')}</div>
                ),
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
                    breadCrumbItems={[{ label: t('units'), path: '/products/units', active: true }]}
                    title={t('units')}
                />

                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body>
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
                <UnitCreateUpdate {...{ modal, setModal, toggle, editData, defaultValues }} />
            </>
        );
    }
};

export default Units;
