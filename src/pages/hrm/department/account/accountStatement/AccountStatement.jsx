//External Lib Import
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { GrDocumentCsv, GrDocumentPdf } from 'react-icons/gr';
import { SiMicrosoftexcel } from 'react-icons/si';
import { BiImport } from 'react-icons/bi';

//Internal Lib Import

import Table from '../../../../../components/Table';
import PageTitle from '../../../../../components/PageTitle';
import ErrorDataLoad from '../../../../../components/common/ErrorDataLoad';
import LoadingData from '../../../../../components/common/LoadingData';
import AleartMessage from '../../../../../utils/AleartMessage';
//api services

import { useSelector } from 'react-redux';
import {
    useAccountStatementDeleteMutation,
    useAccountStatementImportMutation,
    useAccountStatementListQuery,
    useAccountStatementMultiDeleteMutation,
} from '../../../../../redux/services/accountStatementService';
import AccountStatementAddEdit from './AccountStatementAddEdit';

// main component
const AccountStatement = () => {
    const { t } = useTranslation();
    const [defaultValues, setDefaultValues] = useState({});
    const [modal, setModal] = useState(false);
    const [editData, setEditData] = useState(false);
    // store id
    const store = useSelector((state) => state.setting.activeStore?._id);
    const [accountStatementDelete] = useAccountStatementDeleteMutation();
    const [accountStatementMultiDelete] = useAccountStatementMultiDeleteMutation();
    const [accountStatementImport] = useAccountStatementImportMutation();
    const { data, isLoading, isError } = useAccountStatementListQuery(store, {
        skip: !store,
    });

    //fake visibility
    const visibility = {
        name: true,
        accountNumber: true,
        note: true,
    };
    /**
     * Show/hide the  modal
     */

    const addShowModal = () => {
        setDefaultValues({});
        setEditData(false);
        setModal(!modal);
    };

    const toggle = (e) => {
        setModal(!modal);
    };

    useEffect(() => {
        if (!modal) setDefaultValues({});
    }, [modal]);

    /* action column render */
    const ActionColumn = ({ row }) => {
        const edit = () => {
            toggle();
            let dValues = { ...row?.original };
            setEditData(true);
            setDefaultValues(dValues);
        };

        return (
            <>
                <span role="button" className="action-icon text-warning" onClick={edit}>
                    <i className="mdi mdi-square-edit-outline"></i>
                </span>
                <span
                    role="button"
                    className="action-icon text-danger"
                    onClick={() => AleartMessage.Delete(row?.original._id, accountStatementDelete)}>
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
            Cell: ({ row }) => row.original.name,
            classes: 'table-user',
        },
        {
            Header: t('accountNumber'),
            accessor: 'accountNumber',
            sort: false,
            Cell: ({ row }) => row.original.accountNumber,
            classes: 'table-user',
        },
        {
            Header: t('debit'),
            accessor: 'debit',
            sort: false,
            Cell: ({ row }) => row.original.debit,
            classes: 'table-user',
        },
        {
            Header: t('credit'),
            accessor: 'credit',
            sort: false,
            Cell: ({ row }) => row.original.credit,
            classes: 'table-user',
        },
        {
            Header: t('note'),
            accessor: 'note',
            sort: false,
            Cell: ({ row }) => row.original.note,
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
                    breadCrumbItems={[{ label: t('accountStatement'), path: '/accountStatement', active: true }]}
                    title={t('accountStatement')}
                />
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
                <PageTitle
                    breadCrumbItems={[{ label: t('accountStatement'), path: '/accountStatement', active: true }]}
                    title={t('accountStatement')}
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
                    breadCrumbItems={[{ label: t('accountStatement'), path: '/accountStatement', active: true }]}
                    title={t('accountStatement')}
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
                                    isSelectable={true}
                                    isSearchable={true}
                                    tableClass="table-striped"
                                    theadClass="table-light"
                                    searchBoxClass="mt-2 mb-3"
                                    addShowModal={addShowModal}
                                    importFunc={accountStatementImport}
                                    deleteMulti={accountStatementMultiDelete}
                                    tableInfo={{
                                        tableName: 'accountStatement',
                                        exportFileName: 'accountStatement',
                                        columnOrder: '(  *name, accountNumber, credit, debit, note)',
                                        visibility,
                                    }}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <AccountStatementAddEdit {...{ modal, setModal, toggle, editData, defaultValues }} />
            </>
        );
    }
};

export default AccountStatement;
