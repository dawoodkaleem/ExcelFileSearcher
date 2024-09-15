import {} from "react";
import { useTable } from "react-table";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";

const TableWithDragDrop = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedRows = Array.from(rows);
    const [removed] = reorderedRows.splice(result.source.index, 1);
    reorderedRows.splice(result.destination.index, 0, removed);
    prepareRow(reorderedRows);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <table
        {...getTableProps()}
        className="min-w-full bg-white border border-purple-200 shadow-md rounded-md overflow-hidden">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="bg-purple-600 text-white">
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="p-3 text-left text-sm font-semibold tracking-wide">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <Droppable droppableId="table-body">
          {(provided) => (
            <tbody
              {...getTableBodyProps()}
              ref={provided.innerRef}
              {...provided.droppableProps}>
              {rows.map((row, index) => {
                prepareRow(row);
                return (
                  <Draggable key={row.id} draggableId={row.id} index={index}>
                    {(provided) => (
                      <tr
                        {...row.getRowProps()}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white hover:bg-purple-50">
                        {row.cells.map((cell) => (
                          <td
                            {...cell.getCellProps()}
                            className="p-3 border-b border-purple-100 text-sm text-purple-900">
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </tbody>
          )}
        </Droppable>
      </table>
    </DragDropContext>
  );
};

TableWithDragDrop.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableWithDragDrop;
