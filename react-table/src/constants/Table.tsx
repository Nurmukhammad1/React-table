import React from 'react'
import {useTable, usePagination} from 'react-table';
import '../index.css'

interface TableProps {
    columns: any[];
    data: any[];
    updateData: (rowIndex: number, columnId: string, value: any) => void;
}

const Table: React.FC<TableProps> = ({columns, data, updateData}) => {
    const {
      getTableProps, 
      getTableBodyProps, 
      headerGroups, 
      page, 
      prepareRow,
      nextPage,
      previousPage,
      state: { pageIndex, pageSize },
    } = useTable({columns, data}, usePagination);

    const handleCellChange = (event: React.ChangeEvent<HTMLTableCellElement>, rowIndex: number, columnId: string) => {
      const {innerText} = event.target;
      updateData(rowIndex, columnId, innerText);
  };

      return (
        <div className='table-container'>
            <table className='table' {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, rowIndex) => {
                        prepareRow(row);
                        return (
                            <React.Fragment key={rowIndex}>
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <td
                                            {...cell.getCellProps()}
                                            contentEditable
                                            suppressContentEditableWarning
                                            onBlur={(event) => handleCellChange(event, rowIndex, cell.column.id)}
                                        >
                                            {cell.render("Cell")}
                                        </td>
                                    ))}
                                </tr>
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
            <div className='pagination'>
              <button className='btn' onClick={() => previousPage()} disabled={pageIndex === 0}>
                Предыдущая страница
              </button>
              <span>
                Страница{''}
                <strong>
                  {pageIndex + 1} из {Math.ceil(data.length / pageSize)}
                </strong> {''}
              </span>
              <button className='btn' onClick={() => nextPage()} disabled={pageIndex ===  Math.ceil(data.length / pageSize ) -1}>
                Следующая страница
              </button>
            </div>
        </div>
    );


}

export default Table;







