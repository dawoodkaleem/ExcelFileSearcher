import { useState } from "react";
import PropTypes from "prop-types";
import * as XLSX from "xlsx";

const FileUploadAndSearch = ({ setData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [originalData, setOriginalData] = useState([]); // Keep track of original data

  // Handle file upload and parse it into JSON format
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setOriginalData(jsonData); // Store original data
      setData(jsonData); // Set data for display
    };
    reader.readAsArrayBuffer(file);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle the search button click
  const handleSearchClick = () => {
    if (searchTerm === "") {
      setData(originalData); // If search term is empty, show all data
    } else {
      // Filter the data based on the search term
      const filteredData = originalData.filter(
        (item) =>
          item["Project Name"]
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item["Task Name"].toLowerCase().includes(searchTerm.toLowerCase()) ||
          item["Assigned to"]
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item["Progress"].toString().includes(searchTerm)
      );
      setData(filteredData);
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-md shadow-md">
      {/* File Upload Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-200">
          Upload Excel File:
        </label>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="mt-1 p-2 w-full border border-gray-600 rounded-md text-gray-200 bg-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>

      {/* Search Input */}
      <div className="flex items-center space-x-4">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-200">
            Search:
          </label>
          <input
            type="text"
            placeholder="Search by Project, Task, Assigned to, etc."
            value={searchTerm}
            onChange={handleSearchChange}
            className="mt-1 p-2 w-full border border-gray-600 rounded-md text-gray-200 bg-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
        {/* Search Button */}
        <button
          onClick={handleSearchClick}
          className="mt-5 p-2 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600">
          Search
        </button>
      </div>
    </div>
  );
};

FileUploadAndSearch.propTypes = {
  setData: PropTypes.func.isRequired,
};

export default FileUploadAndSearch;
