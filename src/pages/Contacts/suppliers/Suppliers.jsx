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

import { useSupplierListQuery, useSupplierDeleteMutation } from '../../../redux/services/suppliersService';
import SupplierCreateUpdateModal from './SupplierCreateUpdateModal';
import { useSelector } from 'react-redux';
import ExcelImportModal from '../../modals/ExcelImportModal';
import { FormInput } from '../../../components';

// main component
const Suppliers = () => {
    const { t } = useTranslation();
    const [defaultValues, setDefaultValues] = useState({ name: '', status: 'ACTIVE' });
    const [importedFile, setImportedFile] = useState(null);
    const [modal, setModal] = useState(false);
    const [editData, setEditData] = useState(false);
    // store id
    const store = useSelector((state) => state.setting.activeStore?._id);
    const [supplierDelete] = useSupplierDeleteMutation();

    const { data, isLoading, isError } = useSupplierListQuery(store, {
        skip: !store,
    });

    // for import excel modal
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const importExcel = () => {
        const file = importedFile
        // Process the file here
        console.log(file);
        closeModal();
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
            Header: t('address'),
            accessor: 'address',
            sort: false,
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
                                            {/* <OverlayTrigger
                                                placement="top"
                                                overlay={
                                                    <Tooltip>
                                                        {t("download demo")}
                                                    </Tooltip>
                                                }
                                            >
                                                <Button variant="info" className="mb-2 me-1">
                                                    <i className="dripicons-information" />
                                                </Button>
                                            </OverlayTrigger> */}
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={
                                                    <Tooltip>
                                                        {t("settings")}
                                                    </Tooltip>
                                                }
                                            >
                                                <Button variant="success" className="mb-2 me-1">
                                                    <i className="mdi mdi-cog"
                                                        data-toggle="tooltip"
                                                        data-placement="top"
                                                        title={t("settings")}
                                                    />
                                                </Button>
                                            </OverlayTrigger>


                                            <OverlayTrigger
                                                placement="top"
                                                overlay={
                                                    <Tooltip>
                                                        {t("import excel")}
                                                    </Tooltip>
                                                }
                                            >
                                                <Button variant="warning" className="mb-2 me-1" onClick={openModal}>
                                                    <BiImport />
                                                    {t("import")}
                                                </Button>
                                            </OverlayTrigger>

                                            <OverlayTrigger
                                                placement="top"
                                                overlay={
                                                    <Tooltip>
                                                        {t("export excel")}
                                                    </Tooltip>
                                                }
                                            >
                                                <Button
                                                    variant="success"
                                                    className="mb-2 me-1 text-dark"
                                                    onClick={() => exportFromJson(data, 'suppliers', 'xls')

                                                    }
                                                >
                                                    <SiMicrosoftexcel />
                                                    {t('export')}
                                                </Button>
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={
                                                    <Tooltip>
                                                        {t("export csv")}
                                                    </Tooltip>
                                                }
                                            >
                                                <Button
                                                    variant="success"
                                                    className="mb-2 me-1 text-dark"
                                                    onClick={() => exportFromJson([data], 'roles', 'csv')}
                                                >
                                                    <GrDocumentCsv /> {t('export')}
                                                </Button>
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={
                                                    <Tooltip>
                                                        {t("export pdf")}
                                                    </Tooltip>
                                                }
                                            >
                                                <Button
                                                    variant="danger"
                                                    className="mb-2 me-1 text-dark"
                                                    onClick={() => exportFromJson([data], 'roles', 'pdf')}
                                                >
                                                    <GrDocumentPdf /> {t('export')}
                                                </Button>
                                            </OverlayTrigger>


                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className='d-flex'>
                                            {
                                                columns.map((col, i) => {
                                                    return (
                                                        <FormInput key={i} type='checkbox' label={t(col.accessor)} className='d-inline-block me-2' />
                                                    )
                                                })
                                            }
                                        </div>
                                    </Col>
                                </Row>

                                <Table
                                    columns={columns || []}
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
                <ExcelImportModal {...{ showModal, setImportedFile, openModal, closeModal, importExcel, target: "suppliers", columnOrder: "(*name,*mobile)" }} />
            </>
        );
    }
};

export default Suppliers;
