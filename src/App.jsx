import { useState, useMemo, useEffect } from "react";
import FileUploadAndSearch from "./components/FileUploadAndSearch";
import TableWithDragDrop from "./components/TableWithDragDrop";

function App() {
  const [data, setData] = useState([]);

  // Define column headers to match the Excel file's field names
  const columns = useMemo(
    () => [
      {
        Header: "Project Name",
        accessor: "Project Name", // Exact name from Excel
      },
      {
        Header: "Task Name",
        accessor: "Task Name", // Exact name from Excel
      },
      {
        Header: "Assigned to",
        accessor: "Assigned to", // Exact name from Excel
      },
      {
        Header: "Start Date",
        accessor: "Start Date", // Exact name from Excel
      },
      {
        Header: "Days Required",
        accessor: "Days Required ",
        // Exact name from Excel
      },
      {
        Header: "End Date",
        accessor: "End Date", // Exact name from Excel
      },
      {
        Header: "Progress",
        accessor: "Progress", // Exact name from Excel
      },
    ],
    []
  );

  useEffect(
    () => {
      if (data.length > 0) {
        console.log(Object.keys(data, "Helllllllllllo")); // This will log all the keys in the first row of the Excel sheet
      }
    },
    [data],
    [columns]
  );

  return (
    <div className="container mx-auto p-6 bg-purple-100 min-h-screen">
      <h1 className="text-2xl font-bold text-purple-700 mb-6">
        Excel File Reader
      </h1>
      <FileUploadAndSearch setData={setData} />
      {data.length > 0 && (
        <div className="mt-6">
          <TableWithDragDrop columns={columns} data={data} />
        </div>
      )}
    </div>
  );
}

export default App;
