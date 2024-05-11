//External Lib Import
import React, { useRef, useEffect, forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import {
    useTable,
    useSortBy,
    usePagination,
    useRowSelect,
    useGlobalFilter,
    useAsyncDebounce,
    useExpanded,
} from 'react-table';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

//Internal Lib Import
// components
import Pagination from './Pagination';
import { Button, Col, Row } from 'react-bootstrap';
import ExportData from './ExportData';
import CsvImportModal from '../pages/modals/CsvImportModal';
import { useSelector } from 'react-redux';
import AleartMessage from '../utils/AleartMessage';

// Define a default UI for filtering
const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter, searchBoxClass }) => {
    const { t } = useTranslation();

    const count = preGlobalFilteredRows?.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 200);
    const [startDate, setStartDate] = useState(new Date())
    return (
        <div className={classNames(searchBoxClass)}>
            <span className="d-flex align-items-center">
                {t('search')} :{' '}
                <input
                    value={value || ''}
                    onChange={(e) => {
                        setValue(e.target.value);
                        onChange(e.target.value);
                    }}
                    placeholder={`${count} ${t('records...')}`}
                    className="form-control w-auto ms-1"
                />
            <div className='ms-4 d-flex gap-2'><span className='my-auto'>Filter by date: </span><DatePicker className='form-control' selected={startDate} toggleCalendarOnIconClick isClearable placeholderText='provide date!'  onChange={(date)=> setStartDate(date)} closeOnScroll={true}/></div>
            </span>
        </div>
    );
};

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
        <>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" ref={resolvedRef} {...rest} />
                <label htmlFor="form-check-input" className="form-check-label"></label>
            </div>
        </>
    );
});

const Table = (props) => {
    const { t } = useTranslation();
    const [importedFile, setImportedFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [exportData, setExportData] = useState({});
    const [showToggle, setShowToggle] = useState(false);
    const isSearchable = props['isSearchable'] || false;
    const isSortable = props['isSortable'] || false;
    const pagination = props['pagination'] || false;
    const isSelectable = props['isSelectable'] || false;
    const isExpandable = props['isExpandable'] || false;
    const addShowModal = props['addShowModal'];
    const importFunc = props['importFunc'];
    const tableInfo = props['tableInfo'] || {};
    const { tableName, columnOrder, demoFile, visibility } = tableInfo || '';
    const deleteMulti = props['deleteMulti'];
    const store = useSelector((state) => state.setting?.activeStore?._id);
    let hiddenColumns = [];
    for (const key in visibility) {
        if (visibility[key] === false) {
            hiddenColumns.push(key);
        }
    }

    const dataTable = useTable(
        {
            columns: props['columns'],
            data: props['data'],
            initialState: {
                pageSize: props['pageSize'] || 10,
                hiddenColumns,
            },
            useRowSelect,
        },
        isSearchable && useGlobalFilter,
        isSortable && useSortBy,
        isExpandable && useExpanded,
        pagination && usePagination,
        isSelectable && useRowSelect,
        (hooks) => {
            isSelectable &&
                hooks.visibleColumns.push((columns) => [
                    // Let's make a column for selection
                    {
                        id: 'selection',
                        // The header can use the table's getToggleAllRowsSelectedProps method
                        // to render a checkbox
                        Header: ({ getToggleAllPageRowsSelectedProps }) => (
                            <div>
                                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                            </div>
                        ),
                        // The cell can use the individual row's getToggleRowSelectedProps method
                        // to the render a checkbox
                        Cell: ({ row }) => (
                            <div>
                                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                            </div>
                        ),
                    },
                    ...columns,
                ]);
            isExpandable &&
                hooks.visibleColumns.push((columns) => [
                    // Let's make a column for selection
                    {
                        // Build our expander column
                        id: 'expander', // Make sure it has an ID
                        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
                            <span {...getToggleAllRowsExpandedProps()}>{isAllRowsExpanded ? '-' : '+'}</span>
                        ),
                        Cell: ({ row }) =>
                            // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
                            // to build the toggle for expanding a row
                            row.canExpand ? (
                                <span
                                    {...row.getToggleRowExpandedProps({
                                        style: {
                                            // We can even use the row.depth property
                                            // and paddingLeft to indicate the depth
                                            // of the row
                                            paddingLeft: `${row.depth * 2}rem`,
                                        },
                                    })}>
                                    {row.isExpanded ? '-' : '+'}
                                </span>
                            ) : null,
                    },
                    ...columns,
                ]);
        }
    );
    const multiSelectIds = dataTable.selectedFlatRows?.map((item) => item.original._id);
    const { allColumns } = dataTable;
    let rows = pagination ? dataTable.page : dataTable.rows;
    // for import excel modal

    const toggleImportModal = () => {
        setShowModal(!showModal);
    };

    const importCsv = () => {
        const file = importedFile;
        const formData = new FormData();
        formData.append('file', file);
        importFunc({ store: store, postBody: formData });
        toggleImportModal();
    };

    useEffect(() => {
        if (rows) {
            const transformData = rows.reduce(
                (acc, current) => {
                    let { proprietor, store, _id, createdAt, updatedAt, ...others } = current.original;
                    let { _id: vId, createdAt: vCreatedAt, updatedAt: vUpdatedAt, ...valueOthers } = current.values;
                    acc.original.push(others);
                    acc.values.push(valueOthers);
                    return acc;
                },
                { original: [], values: [] }
            );
            setExportData(transformData);
        }
    }, [rows]);

    return (
        <>
            <Row className="mb-2">
                <Col sm={5}>
                    <Button variant="primary" className="me-2" onClick={addShowModal}>
                        <i className="mdi mdi-plus-circle me-2"></i> {t(`Add ${tableName}`)}
                    </Button>

                    {dataTable.selectedFlatRows?.length > 0 && (
                        <Button
                            variant="danger"
                            onClick={() => AleartMessage.Delete({ ids: multiSelectIds, store }, deleteMulti)}>
                            <i className="mdi mdi-delete"></i>
                        </Button>
                    )}
                </Col>
                {exportData.values && (
                    <ExportData
                        fileName={tableName}
                        data={exportData.values}
                        showToggle={showToggle}
                        setShowToggle={setShowToggle}
                        toggleImportModal={toggleImportModal}
                    />
                )}
            </Row>
            {showToggle && (
                <div className="d-flex align-content-start flex-wrap  bg-dragula p-2">
                    {allColumns?.map((col, i) => {
                        return (
                            <div key={i} className="me-2">
                                <label style={{ cursor: 'pointer' }}>
                                    <input type="checkbox" {...col.getToggleHiddenProps()} className="me-1" />
                                    {col.Header}
                                </label>
                            </div>
                        );
                    })}
                </div>
            )}
            {isSearchable && (
                <GlobalFilter
                    preGlobalFilteredRows={dataTable.preGlobalFilteredRows}
                    globalFilter={dataTable.state.globalFilter}
                    setGlobalFilter={dataTable.setGlobalFilter}
                    searchBoxClass={props['searchBoxClass']}
                />
            )}

            <div className="table-responsive">
                <table
                    {...dataTable.getTableProps()}
                    className={classNames('table table-centered react-table', props['tableClass'])}>
                    <thead className={props['theadClass']}>
                        {dataTable.headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => {
                                    return (
                                        <th
                                            {...column.getHeaderProps(column.sort && column.getSortByToggleProps())}
                                            className={classNames({
                                                sorting_desc: column.isSortedDesc === true,
                                                sorting_asc: column.isSortedDesc === false,
                                                sortable: column.sort === true,
                                            })}>
                                            {column.render('Header')}
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>

                    <tbody {...dataTable.getTableBodyProps()}>
                        {rows.map((row, i) => {
                            dataTable.prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {pagination && <Pagination tableProps={dataTable} sizePerPageList={props['sizePerPageList']} />}
            <CsvImportModal
                {...{ showModal, setImportedFile, toggleImportModal, importCsv, tableName, columnOrder, demoFile }}
            />
        </>
    );
};

export default Table;
