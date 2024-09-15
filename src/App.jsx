import { useState, useMemo } from "react";
import FileUploadAndSearch from "./components/FileUploadAndSearch";
import TableWithDragDrop from "./components/TableWithDragDrop";

function App() {
  const [data, setData] = useState([]);

  const columns = useMemo(
    () =>
      data.length > 0
        ? Object.keys(data[0]).map((key) => ({
            Header: key,
            accessor: key,
          }))
        : [],
    [data]
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
