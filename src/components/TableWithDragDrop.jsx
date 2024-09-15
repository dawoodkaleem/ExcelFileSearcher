import { useTable, useRowSelect, useDrag, useDrop } from "react-table";

function TableWithDragDrop({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <table {...getTableProps()} className="table-auto w-full text-white">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => {
              // Destructure 'key' and pass it separately
              const { key, ...restProps } = column.getHeaderProps();
              return (
                <th
                  key={key}
                  {...restProps}
                  className="p-4 text-left bg-purple-700">
                  {column.render("Header")}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                // Destructure 'key' and pass it separately
                const { key, ...restProps } = cell.getCellProps();
                return (
                  <td
                    key={key}
                    {...restProps}
                    className="p-4 border-b border-gray-700">
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableWithDragDrop;
