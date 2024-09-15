import { useState } from "react";
import PropTypes from "prop-types";
import * as XLSX from "xlsx";

const FileUploadAndSearch = ({ setData }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="p-4 bg-purple-50 rounded-md shadow-md">
      <div className="mb-4">
        <label className="block text-sm font-medium text-purple-700">
          Upload Excel File:
        </label>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="mt-1 p-2 w-full border border-purple-300 rounded-md text-purple-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-purple-700">
          Search:
        </label>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="mt-1 p-2 w-full border border-purple-300 rounded-md text-purple-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
    </div>
  );
};

FileUploadAndSearch.propTypes = {
  setData: PropTypes.func.isRequired,
};

export default FileUploadAndSearch;
