//external lib import
import React, { useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { GrDocumentCsv } from 'react-icons/gr';
import { SiMicrosoftexcel } from 'react-icons/si';
import { BiImport } from 'react-icons/bi';

//internal lib import
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';
import exportFromJson from '../../../utils/exportFromJson';
import LoadingData from '../../../components/common/LoadingData';
import ErrorDataLoad from '../../../components/common/ErrorDataLoad';
import AleartMessage from '../../../utils/AleartMessage';
import ExpenditureCreateUpdate from './ExpenditureCreateUpdate';
import { useExpenditureDeleteMutation, useGetExpendituresQuery } from '../../../redux/services/expenditureService';
import DateFormatter from '../../../utils/DateFormatter';
import { useGetAllCostSectionQuery } from '../../../redux/services/costSectionService';

//api services

// main component
const Expenditure = () => {
    const { t } = useTranslation();
    const [defaultValues, setDefaultValues] = useState({ name: '' });

    const [modal, setModal] = useState(false);
    const [editData, setEditData] = useState(false);
    const [expenditureDelete] = useExpenditureDeleteMutation();
    const { data, isLoading, isError } = useGetExpendituresQuery();
    const { data: costSectionData, isLoading: isLoaded, isError: isErr } = useGetAllCostSectionQuery();

    /**
     * Show/hide the modal
     */

    const addShowModal = () => {
        setEditData(false);
        setDefaultValues({ name: '' });
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
                    onClick={() => AleartMessage.Delete(row?.original._id, expenditureDelete)}>
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
            Header: t('staff name'),
            accessor: 'staffName',
            sort: true,
            Cell: ({ row }) => row.original.staffName,
            classes: 'table-user',
        },
        {
            Header: t('cost section'),
            accessor: 'purposeName',
            sort: true,
            Cell: ({ row }) => row.original.purposeName,
            classes: 'table-user',
        },
        {
            Header: t('amount'),
            accessor: 'amount',
            sort: true,
            Cell: ({ row }) => row.original.amount,
            classes: 'table-user',
        },
        {
            Header: t('note'),
            accessor: 'remarks',
            sort: true,
            Cell: ({ row }) => row.original.remarks,
            classes: 'table-user',
        },
        {
            Header: t('date'),
            accessor: 'updatedAt',
            sort: true,
            Cell: ({ row }) => DateFormatter(row.original.updatedAt),
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
                    breadCrumbItems={[{ label: t('expenditure'), path: '/expenditure', active: true }]}
                    title={t('expenditure')}
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
                    breadCrumbItems={[{ label: t('expenditure'), path: '/expenditure', active: true }]}
                    title={t('expenditure')}
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
                    breadCrumbItems={[{ label: t('expenditure'), path: '/expenditure', active: true }]}
                    title={t('expenditure')}
                />
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body>
                                <Row className="mb-2">
                                    <Col sm={5}>
                                        <Button variant="danger" className="mb-2" onClick={addShowModal}>
                                            <i className="mdi mdi-plus-circle me-2"></i> {t('add expenditure')}
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
                <ExpenditureCreateUpdate {...{ modal, setModal, toggle, editData, defaultValues, costSectionData }} />
            </>
        );
    }
};

export default Expenditure;
