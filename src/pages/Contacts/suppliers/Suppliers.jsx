//External Lib Import
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { GrDocumentCsv, GrDocumentPdf } from 'react-icons/gr';
import { SiMicrosoftexcel } from 'react-icons/si';
import { BiImport } from 'react-icons/bi';

//Internal Lib Import
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';
import exportFromJson from '../../../utils/exportFromJson';
import LoadingData from '../../../components/common/LoadingData';
import ErrorDataLoad from '../../../components/common/ErrorDataLoad';
import AleartMessage from '../../../utils/AleartMessage';

//api services

import { useSupplierListQuery, useSupplierDeleteMutation, useSuppliersImportMutation, useSupplierMultiDeleteMutation } from '../../../redux/services/suppliersService';
import SupplierCreateUpdateModal from './SupplierCreateUpdateModal';
import { useSelector } from 'react-redux';
import demoFile from '../../../assets/demo/suppliersDemo.csv'


// main component
const Suppliers = () => {
    const { t } = useTranslation();
    const [defaultValues, setDefaultValues] = useState({ name: '', status: 'ACTIVE' });
    const [modal, setModal] = useState(false);
    const [editData, setEditData] = useState(false);
    // store id
    const store = useSelector((state) => state.setting.activeStore?._id);
    const [supplierDelete] = useSupplierDeleteMutation();
    const [supplierMultiDelete] = useSupplierMultiDeleteMutation();
    const [suppliersImport] = useSuppliersImportMutation();
    const { data, isLoading, isError } = useSupplierListQuery(store, {
        skip: !store,
    });

    //fake visibility
    const visibility = {
        district: false,
        thana: false,
        referenceName: false,
        referenceMobile: false,
        referenceAddress: false,
        referenceRelation: false,
        referenceNid: false,
    }
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

            dValues.referenceName = row?.original.reference.name;
            dValues.referenceMobile = row?.original.reference.mobile;
            dValues.referenceNid = row?.original.reference.nid;
            dValues.referenceRelation = row?.original.reference.relation;
            dValues.referenceAddress = row?.original.reference.address;
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
                    onClick={() => AleartMessage.Delete(row?.original._id, supplierDelete)}>
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
            Header: t('company name'),
            accessor: 'company',
            sort: true,
            Cell: ({ row }) => row.original.company,
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
            Header: t('mobile'),
            accessor: 'mobile',
            sort: false,
            Cell: ({ row }) => row.original.mobile,
            classes: 'table-user',
        },
        {
            Header: t('email'),
            accessor: 'email',
            sort: false,
            Cell: ({ row }) => row.original.email,
            classes: 'table-user',
        },
        {
            Header: t('due'),
            accessor: 'due',
            sort: true,
            Cell: ({ row }) => row.original.due,
            classes: 'table-user',
        },
        {
            Header: t('address'),
            accessor: 'address',
            sort: false,
            Cell: ({ row }) => {
                const splitAddress = row.original?.address?.split(',');
                return splitAddress?.map((item, i) => (
                    <p className="mb-0" key={i}>
                        {item}
                        {i !== splitAddress?.length - 1 ? ',' : ''}
                    </p>
                ));
            },
            classes: 'table-user',
        },
        {
            Header: t('district'),
            accessor: 'district',
            sort: false,
            Cell: ({ row }) => row.original.district,
            classes: 'table-user',
        },
        {
            Header: t('thana'),
            accessor: 'thana',
            sort: false,
            Cell: ({ row }) => row.original.thana,
            classes: 'table-user',
        },
        {
            Header: t('father name'),
            accessor: 'fatherName',
            sort: false,
            Cell: ({ row }) => row.original.fatherName,
            classes: 'table-user',
        },
        {
            Header: t('nid'),
            accessor: 'nid',
            sort: false,
            Cell: ({ row }) => row.original.nid,
            classes: 'table-user',
        },
        {
            Header: t('reference name'),
            accessor: 'referenceName',
            sort: false,
            Cell: ({ row }) => row.original.reference.name,
            classes: 'table-user',
        },
        {
            Header: t('reference mobile'),
            accessor: 'referenceMobile',
            sort: false,
            Cell: ({ row }) => row.original.reference.mobile,
            classes: 'table-user',
        },
        {
            Header: t('reference nid'),
            accessor: 'referenceNid',
            sort: false,
            Cell: ({ row }) => row.original.reference.nid,
            classes: 'table-user',
        },
        {
            Header: t('reference relation'),
            accessor: 'referenceRelation',
            sort: false,
            Cell: ({ row }) => row.original.reference.relation,
            classes: 'table-user',
        },
        {
            Header: t('reference address'),
            accessor: 'referenceAddress',
            sort: false,
            Cell: ({ row }) => row.original.reference.address,
            classes: 'table-user',
        },
        {
            Header: t('status'),
            accessor: 'status',
            sort: true,
            Cell: ({ row }) => t(row.original.status.toLowerCase()),
            classes: 'table-user',
        },
        {
            Header: t('remarks'),
            accessor: 'remarks',
            sort: false,
            Cell: ({ row }) => row.original.remarks,
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
                    breadCrumbItems={[{ label: t('suppliers'), path: '/suppliers', active: true }]}
                    title={t('suppliers')}
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
                    breadCrumbItems={[{ label: t('suppliers'), path: '/suppliers', active: true }]}
                    title={t('suppliers')}
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
                    breadCrumbItems={[{ label: t('suppliers'), path: '/suppliers', active: true }]}
                    title={t('suppliers')}
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
                                    importFunc={suppliersImport}
                                    deleteMulti={supplierMultiDelete}
                                    tableInfo={
                                        {
                                            tableName: "suppliers",
                                            exportFileName: "suppliers",
                                            columnOrder: "( *mobile, *name, fatherName, company, email, remarks, nid, address, thana, district, reference/name, reference/mobile, reference/address, reference/nid, reference/relation, due, status, country )",
                                            demoFile,
                                            visibility
                                        }
                                    }
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <SupplierCreateUpdateModal {...{ modal, setModal, toggle, editData, defaultValues }} />

            </>
        );
    }
};

export default Suppliers;
