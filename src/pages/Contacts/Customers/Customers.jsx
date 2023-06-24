//External Lib Import
import React, { useMemo, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

//Internal Lib Import
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';
import LoadingData from '../../../components/common/LoadingData';
import ErrorDataLoad from '../../../components/common/ErrorDataLoad';
import AleartMessage from '../../../utils/AleartMessage';

//api services
import {
    useCustomerListQuery,
    useCustomerDeleteMutation,
    useCustomersImportMutation,
    useCustomerMultiDeleteMutation,
} from '../../../redux/services/customerService';
import CustomerCreateUpdateModal from './CustomerCreateUpdateModal';
import DateFormatter from '../../../utils/DateFormatter';
import { useSelector } from 'react-redux';

import demoFile from '../../../assets/demo/customerDemo.csv';

// main component
const Customers = () => {
    const { t } = useTranslation();
    const [defaultValues, setDefaultValues] = useState({ name: '', status: 'ACTIVE' });

    const [modal, setModal] = useState(false);
    const [editData, setEditData] = useState(false);

    const storeID = useSelector((state) => state.setting.activeStore?._id);
    const [customerDelete] = useCustomerDeleteMutation();
    const [customerMultiDelete] = useCustomerMultiDeleteMutation();
    const [customersImport] = useCustomersImportMutation();
    const { data, isLoading, isError } = useCustomerListQuery(storeID, {
        skip: !storeID,
    });

    //fake visibility
    const visibility = {
        sl: true,
        name: true,
        mobile: false,
        referenceName: false,
    };

    /**
     * Show/hide the modal
     */
    const addShowModal = () => {
        setEditData(false);
        setDefaultValues({});
        setModal(!modal);
    };

    const toggle = (e) => {
        setModal(!modal);
    };
    /* action column render */

    const ActionColumn = ({ row }) => {
        const edit = () => {
            toggle();
            let dValues = { ...row?.original };
            dValues.referenceName = row?.original.reference.name;
            dValues.referenceMobile = row?.original.reference.mobile;
            dValues.referenceNid = row?.original.reference.nid;
            dValues.referenceRelation = row?.original.reference.relation;
            dValues.referenceAddress = row?.original.reference.address;
            setEditData(dValues);
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
                    onClick={() => AleartMessage.Delete(row?.original._id, customerDelete)}>
                    <i className="mdi mdi-delete"></i>
                </span>
            </>
        );
    };

    // get all columns
    const columns = useMemo(
        () => [
            {
                Header: t('#'),
                accessor: 'sl',
                sort: true,
                Cell: ({ row }) => row.index + 1,
                classes: 'table-user',
            },
            {
                Header: t('name'),
                accessor: 'name',
                sort: true,
                Cell: ({ row }) => row.original?.name,
                classes: 'table-user',
            },
            {
                Header: t('mobile'),
                accessor: 'mobile',
                sort: false,
                Cell: ({ row }) => row.original?.mobile,
                classes: 'table-user',
            },
            {
                Header: t('email'),
                accessor: 'email',
                sort: false,
                Cell: ({ row }) => row.original?.email,
                classes: 'table-user',
            },
            {
                Header: t('customer type'),
                accessor: 'customerType',
                sort: true,
                Cell: ({ row }) => (row.original?.customerType === 'RETAIL' ? t('retail') : t('wholesale')),
                classes: 'table-user',
            },

            {
                Header: t('nid'),
                accessor: 'nid',
                sort: false,
                Cell: ({ row }) => row.original?.nid,
                classes: 'table-user',
            },
            {
                Header: t("father's name"),
                accessor: 'fatherName',
                sort: true,
                Cell: ({ row }) => row.original?.fatherName,
                classes: 'table-user',
            },
            {
                Header: t('address'),
                accessor: 'address',
                sort: true,
                Cell: ({ row }) => {
                    const splitAddress = row.original?.address?.split(',');
                    return splitAddress?.map((item, i) => (
                        <p className="mb-0" key={i}>
                            {item}
                            {i !== splitAddress.length - 1 ? ',' : ''}
                        </p>
                    ));
                },
                classes: 'table-user',
            },

            {
                Header: t('ledger number'),
                accessor: 'ledgerNumber',
                sort: true,
                Cell: ({ row }) => row.original?.ledgerNumber,
                classes: 'table-user',
            },
            {
                Header: t('due'),
                accessor: 'due',
                sort: false,
                Cell: ({ row }) => row.original?.due,
                classes: 'table-user',
            },
            {
                Header: t('reference name'),
                accessor: 'referenceName',
                sort: false,
                Cell: ({ row }) => row.original?.reference?.name,
                classes: 'table-user',
            },
            {
                Header: t('reference mobile'),
                accessor: 'referenceMobile',
                sort: false,
                Cell: ({ row }) => row.original?.reference?.mobile,
                classes: 'table-user',
            },
            {
                Header: t('reference address'),
                accessor: 'referenceAddress',
                sort: false,
                Cell: ({ row }) => row.original?.reference?.address,
                classes: 'table-user',
            },
            {
                Header: t('reference nid'),
                accessor: 'referenceNid',
                sort: false,
                Cell: ({ row }) => row.original?.reference?.nid,
                classes: 'table-user',
            },
            {
                Header: t('reference relation'),
                accessor: 'referenceRelation',
                sort: false,
                Cell: ({ row }) => row.original?.reference?.relation,
                classes: 'table-user',
            },
            {
                Header: t('date'),
                accessor: 'createdAt',
                sort: true,
                Cell: ({ row }) => DateFormatter(row.original.createdAt),
                classes: 'table-user',
            },

            {
                Header: t('action'),
                accessor: 'action',
                sort: false,
                classes: 'table-action',
                Cell: ActionColumn,
            },
        ],
        [data]
    );

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
                    breadCrumbItems={[{ label: t('customers'), path: '/customers', active: true }]}
                    title={t('customers')}
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
                    breadCrumbItems={[{ label: t('customers'), path: '/customers', active: true }]}
                    title={t('customers')}
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
                    breadCrumbItems={[{ label: t('customers'), path: '/customers', active: true }]}
                    title={t('customers')}
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
                                    importFunc={customersImport}
                                    deleteMulti={customerMultiDelete}
                                    tableInfo={{
                                        tableName: 'customers',
                                        exportFileName: 'customers',
                                        columnOrder:
                                            '( *customerType, *mobile, *name, fatherName, email, remarks, nid, address, thana, district, reference/name, reference/mobile, reference/address, reference/nid, reference/relation, due, *status )',
                                        demoFile,
                                        visibility,
                                    }}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <CustomerCreateUpdateModal {...{ modal, setModal, toggle, editData, defaultValues }} />
            </>
        );
    }
};

export default Customers;
