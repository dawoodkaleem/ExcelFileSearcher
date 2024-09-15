import { useTable, useRowSelect } from "react-table";

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
              // Destructure 'key' and pass it explicitly
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
          // Destructure 'key' and pass it explicitly for <tr>
          const { key, ...restProps } = row.getRowProps();
          return (
            <tr key={key} {...restProps}>
              {row.cells.map((cell) => {
                const { key: cellKey, ...cellRestProps } = cell.getCellProps();
                return (
                  <td
                    key={cellKey}
                    {...cellRestProps}
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
