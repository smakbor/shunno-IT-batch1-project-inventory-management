import React, { useMemo, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';
import LoadingData from '../../../components/common/LoadingData';
import ErrorDataLoad from '../../../components/common/ErrorDataLoad';
import AleartMessage from '../../../utils/AleartMessage';
import SubcategoryCreateUpdate from './SubcategoryCreateUpdate';
import { useSubcategoryListQuery, useSubcategoryDeleteMutation } from '../../../redux/services/subcategoryService';
import { useCategoryListQuery } from '../../../redux/services/categoryService';

const Subcategory = () => {
    const { t } = useTranslation();
    const [defaultValues, setDefaultValues] = useState({ category: '', name: '', note: '' });
    const [modal, setModal] = useState(false);
    const [editData, setEditData] = useState(false);

    const {
        data: subcategoryData,
        isLoading: isSubcategoryLoading,
        isError: isSubcategoryError,
        refetch: refetchSubcategories,
    } = useSubcategoryListQuery();
    const { data: categoryData, isLoading: isCategoryLoading, isError: isCategoryError } = useCategoryListQuery();
    const [deleteSubcategory] = useSubcategoryDeleteMutation();

    // Show/hide the modal
    const addShowModal = () => {
        setEditData(false);
        setDefaultValues({ category: '', name: '', note: '' });
        setModal(!modal);
    };

    const toggle = (e) => {
        setModal(!modal);
    };

    const handleDelete = async (id) => {
        try {
            await deleteSubcategory(id).unwrap();
            refetchSubcategories(); // Refetch to get the updated list
            AleartMessage.Success(t('Subcategory deleted successfully'));
        } catch (error) {
            AleartMessage.Error(t('Error deleting subcategory'));
        }
    };

    // Action column render
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
                    onClick={() => AleartMessage.Delete(row?.original._id, handleDelete)}
                    data-toggle="tooltip"
                    data-placement="top"
                    title={t('delete subcategory')}>
                    <i className="mdi mdi-delete"></i>
                </span>
            </>
        );
    };

    // Get all columns
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
                Header: 'Category Name',
                accessor: 'category',
                sort: true,
                Cell: ({ row }) => {
                    if (!categoryData) return '';
                    const category = categoryData.find((cat) => cat._id === row.original.category);
                    return category ? category.name : '';
                },
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
        [categoryData, t]
    );

    // Get pagelist to display
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

    if (isSubcategoryLoading || isCategoryLoading) {
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
    } else if (isSubcategoryError || isCategoryError) {
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
                                    data={subcategoryData || []}
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
