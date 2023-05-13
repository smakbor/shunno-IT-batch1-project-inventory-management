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
import DateFormatter from '../../../utils/DateFormatter';

//api services

import AleartMessage from '../../../utils/AleartMessage';

import { useManufacturerListQuery, useManufacturerDeleteMutation } from '../../../redux/services/manufacturerService';
import ManufacturerCreateUpdateModal from './ManufacturerCreateUpdateModal';

// main component
const Manufacturer = () => {
    const { t } = useTranslation();
    const [defaultValues, setDefaultValues] = useState({ name: '', status: true });

    const [modal, setModal] = useState(false);
    const [editData, setEditData] = useState(false);

    const [manufacturerDelete] = useManufacturerDeleteMutation();

    const { data, isLoading, isError } = useManufacturerListQuery();

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
    console.log(editData);

    /* action column render */
    const ActionColumn = ({ row }) => {
        // console.log(row)
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
                    onClick={() => AleartMessage.Delete(row?.original._id, manufacturerDelete)}>
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
            Header: t('status'),
            accessor: 'status',
            sort: true,
            Cell: ({ row }) =>
                row.original.status === 'ACTIVE' ? (
                    <div className="badge bg-success">{t('active')}</div>
                ) : (
                    <div className="badge bg-danger">{t('inactive')}</div>
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
                {/* <PageTitle
                    breadCrumbItems={[{ label: t('user role'), path: '/user-role', active: true }]}
                    title={t('category')}
                /> */}

                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body>
                                <Row className="mb-2">
                                    <Col sm={5}>
                                        <Button variant="danger" className="mb-2" onClick={addShowModal}>
                                            <i className="mdi mdi-plus-circle me-2"></i> {t('add manufacturer')}
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
                                    data={data.data}
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
                {/* <ModalCreateUpdate {...{ modal, setModal, toggle, editData, defaultValues }} /> */}
                <ManufacturerCreateUpdateModal {...{ modal, setModal, toggle, editData, setEditData, defaultValues }} />
            </>
        );
    }
};

export default Manufacturer;
