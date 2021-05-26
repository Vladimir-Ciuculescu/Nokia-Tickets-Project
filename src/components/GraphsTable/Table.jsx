import React from "react";

import { useTable, usePagination, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'

// Define a default UI for filtering
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span>
            Search:{' '}
            <input
                className="form-control"
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
            />
        </span>
    )
}

function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length

    return (
        <input
            className="form-control"
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
            placeholder={`Search ${count} records...`}
        />
    )
}

function Table({ columns, data }) {
    const defaultColumn = React.useMemo(
        () => ({
            // Default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    )
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        preGlobalFilteredRows,
        setGlobalFilter,
        rows,
        state,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 15 },
            defaultColumn
        },
        useFilters,
        useGlobalFilter,
        usePagination
    )

    // Render the UI for your table
    return (
        <div>
            <table className="styled-table" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
            <div className="table-pages">
                <ul className="pagination">
                    <li className="page-item" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        <a className="page-link">Prima pagină</a>
                    </li>
                    <li className="page-item" onClick={() => previousPage()} disabled={!canPreviousPage}>
                        <a className="page-link">{'<'}</a>
                    </li>
                    <li className="page-item" onClick={() => nextPage()} disabled={!canNextPage}>
                        <a className="page-link">{'>'}</a>
                    </li>
                    <li className="page-item" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        <a className="page-link">Ultima pagină</a>
                    </li>
                    <li>
                        <a className="page-link">
                            Page{' '}
                            <strong>
                                {pageIndex + 1} of {pageOptions.length}
                            </strong>{' '}
                        </a>
                    </li>
                    <li>
                        <a className="page-link">
                            <input
                                className="form-control"
                                type="number"
                                defaultValue={pageIndex + 1}
                                onChange={e => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                                    gotoPage(page)
                                }}
                                style={{ "width": '30px', "height": "8px", "text-align": "center" }}
                            />
                        </a>
                    </li>{' '}
                    <select
                        className="form-control"
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                        style={{ width: '120px', height: '36px', "border-radius": "0 4px 4px 0", float: "right", "margin-left": "-1px"}}
                    >
                        {[5, 10, 15, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Pagina {pageSize}
                            </option>
                        ))}
                    </select>
                </ul>
            </div>
        </div >
    )
}

function PaginationTableComponent(props) {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Info',
                columns: [
                    {
                        Header: '#ID',
                        accessor: 'INCIDENT_NUMBER',
                    },
                    {
                        Header: 'Status',
                        accessor: 'STATUS',
                    },
                    {
                        Header: 'Submit date',
                        accessor: 'SUBMIT_DATE',
                    },
                    {
                        Header: 'Cat Tier',
                        accessor: 'CAT_TIER_1',
                    },
                ],
            },
        ],
        []
    )

    return (
        <Table columns={columns} data={props.table_data} />
    )
}

export default PaginationTableComponent;