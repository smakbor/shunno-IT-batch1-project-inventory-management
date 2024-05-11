//External Lib Import
import React, { useMemo, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

//Internal Lib Import
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';
import LoadingData from '../../../components/common/LoadingData';
import ErrorDataLoad from '../../../components/common/ErrorDataLoad';

//api services

import AleartMessage from '../../../utils/AleartMessage';
import { isError } from 'joi';
import SubcategoryCreateUpdate from './SubcategoryCreateUpdate';
import { useSubcategoryListQuery, useSubcategoryDeleteMutation } from '../../../redux/services/subcategoryService';

// main component
const Subcategory = () => {
    const { t } = useTranslation();
    const [defaultValues, setDefaultValues] = useState({ category: '', name: '', note: '' });

    const [modal, setModal] = useState(false);

    const [editData, setEditData] = useState(false);
    const { data, isLoading, isError } = useSubcategoryListQuery();

    // const [deleteSubcategory, { isLoading: isLoad, isError: isErr }] = useSubcategoryDeleteMutation;

    /**
     * Show/hide the modal
     */
    const addShowModal = () => {
        setEditData(false);
        setDefaultValues({ category: '', name: '', note: '' });
        setModal(!modal);
    };

    const toggle = (e) => {
        setModal(!modal);
    };

    /* action column render */
    const ActionColumn = ({ row }) => {
        const edit = () => {
            setEditData(row?.original);
            setDefaultValues(row?.original);
            toggle();
        };
        return (
            <>
                <i
                    className="mdi mdi-plus-circle me-2 text-info"
                    style={{ fontSize: '1.3rem', cursor: 'pointer' }}
                    // onClick={}
                    data-toggle="tooltip"
                    data-placement="top"
                    title={t('add subcategory')}
                />

                <span
                    role="button"
                    className="action-icon text-warning"
                    data-toggle="tooltip"
                    data-placement="top"
                    title={t('edit subcategory')}
                    onClick={edit}>
                    <i className="mdi mdi-square-edit-outline"></i>
                </span>
                <span
                    role="button"
                    className="action-icon text-danger"
                    onClick={() => AleartMessage.Delete(row?.original._id)}
                    data-toggle="tooltip"
                    data-placement="top"
                    title={t('delete subcategory')}>
                    <i className="mdi mdi-delete"></i>
                </span>
            </>
        );
    };

    // get all columns
    const columns = useMemo(
        () => [
            {
                Header: '#',
                accessor: 'sl',
                sort: true,
                Cell: ({ row }) => row.index + 1,
                classes: 'table-user',
            },
            {
                Header: 'Category',
                accessor: 'category',
                sort: true,
                Cell: ({ row }) => row.index + 1,
                classes: 'table-user',
            },

            {
                Header: t('Subcategory name'),
                accessor: 'name',
                sort: true,
                Cell: ({ row }) => row.original.name,
                classes: 'table-user',
            },
            {
                Header: t('Remarks'),
                accessor: 'note',
                sort: true,
                Cell: ({ row }) => row.original.note,
                classes: 'table-user',
            },
            {
                Header: t('Action'),
                accessor: 'action',
                sort: false,
                classes: 'table-action',
                Cell: ActionColumn,
            },
        ],
        []
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
                    breadCrumbItems={[{ label: t('subcategory'), path: '/products/subcategory', active: true }]}
                    title={t('Subcategory')}
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
                    breadCrumbItems={[{ label: t('subcategory'), path: '/products/subcategory', active: true }]}
                    title={t('Subcategory')}
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
                    breadCrumbItems={[{ label: t('subcategory'), path: '/products/subcategory', active: true }]}
                    title={t('Subcategory')}
                />
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body>
                                <Table
                                    columns={columns}
                                    data={data || []}
                                    pageSize={5}
                                    sizePerPageList={sizePerPageList}
                                    isSortable={true}
                                    pagination={true}
                                    isSelectable={false}
                                    isSearchable={true}
                                    tableClass="table-striped"
                                    theadClass="table-light"
                                    searchBoxClass="mt-2 mb-3"
                                    addShowModal={addShowModal}
                                    tableInfo={{ tableName: 'Subcategory' }}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <SubcategoryCreateUpdate {...{ modal, setModal, toggle, editData, defaultValues }} />
            </>
        );
    }
};

export default Subcategory;
