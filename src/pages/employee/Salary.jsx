import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import { Button, Card, Col, Row } from 'react-bootstrap';
import Table from '../../components/Table';
import LoadingData from '../../components/common/LoadingData';
import ErrorDataLoad from '../../components/common/ErrorDataLoad';
import { BiImport } from 'react-icons/bi';
import { SiMicrosoftexcel } from 'react-icons/si';
import { GrDocumentCsv } from 'react-icons/gr';
import exportFromJson from '../../utils/exportFromJson';

const Salary = () => {
    const { t } = useTranslation();
    const { employeeID } = useParams()
    const columns = useMemo(() => [
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

        // {
        //     Header: t('action'),
        //     accessor: 'action',
        //     sort: false,
        //     classes: 'table-action',
        //     Cell: ActionColumn,
        // },
    ]);
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
    const isLoading = false;
    const isError = false;
    if (isLoading) {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[{ label: t('salary'), path: '/salary', active: true }]}
                    title={t('salary')}
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
                    breadCrumbItems={[{ label: t('salary'), path: '/salary', active: true }]}
                    title={t('salary')}
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
                    breadCrumbItems={[{ label: t('salary'), path: '/salary', active: true }]}
                    title={t('salary')}
                />
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body>
                                <Row className="mb-2">
                                    <Col sm={5}>

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
                                    data={[]}
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
            </>
        )
    }
}

export default Salary;