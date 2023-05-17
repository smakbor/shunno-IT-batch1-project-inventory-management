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

//api services

import { useSupplierListQuery, useSupplierDeleteMutation } from '../../../redux/services/suppliersService';
import SupplierCreateUpdateModal from './SupplierCreateUpdateModal';
import { useSelector } from 'react-redux';

// main component
const Suppliers = () => {
    const { t } = useTranslation();
    const [defaultValues, setDefaultValues] = useState({ name: '', status: 'ACTIVE' });

    const [modal, setModal] = useState(false);
    const [editData, setEditData] = useState(false);
    const storeID = useSelector(state => state.setting.activeStore?._id)
    const [supplierDelete] = useSupplierDeleteMutation();

    const { data, isLoading, isError } = useSupplierListQuery(storeID, {
        skip: !storeID
    });
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
            Header: t('address'),
            accessor: 'address',
            sort: true,
            Cell: ({ row }) => {
                const splitAddress = row.original.address.split(',');
                return splitAddress.map((item, i) => (
                    <p className="mb-0" key={i}>
                        {item}
                        {i !== splitAddress.length - 1 ? ',' : ''}
                    </p>
                ));
            },
            classes: 'table-user',
        },
        {
            Header: t('mobile'),
            accessor: 'mobile',
            sort: true,
            Cell: ({ row }) => row.original.mobile,
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
                                <Row className="mb-2">
                                    <Col sm={5}>
                                        <Button variant="danger" className="mb-2" onClick={addShowModal}>
                                            <i className="mdi mdi-plus-circle me-2"></i> {t('add supplier')}
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
                <SupplierCreateUpdateModal {...{ modal, setModal, toggle, editData, defaultValues }} />
            </>
        );
    }
};

export default Suppliers;
