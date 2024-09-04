import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Employees() {
  const [file, setFile] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10); // Number of items per page
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchEmployees();
  }, [page, filter]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`http://10.5.0.26:3000/employee`, {
        params: {
          q: filter,
          _page: page,
          _limit: pageSize,
        },
      });
      setEmployees(response.data);
      setTotalPages(Math.ceil(parseInt(response.headers['x-total-count'], 10) / pageSize));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
        raw: false, // respect cell formats
      });

      // Remove duplicate entries
      const uniqueData = [];
      const seen = {};

      jsonData.forEach((item) => {
        const key = `${item.nom}-${item.prenom}-${item.postnom}`;
        if (!seen[key]) {
          seen[key] = true;
          uniqueData.push(item);
        }
      });

      try {
        await axios.post('http://10.5.0.26:3001/employee', uniqueData);
        alert('Data successfully uploaded to db.json');
        fetchEmployees();
      } catch (error) {
        console.error('Error uploading data:', error);
        alert('Error uploading data');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mb-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Upload Excel File</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="block w-full text-slate-600 font-raleway border border-slate-400 rounded-lg px-4 py-2"
          />
          <button
            type="submit"
            className="w-full bg-slate-500 text-white font-raleway py-2 rounded-lg hover:bg-orange-500 transition-colors"
          >
            Upload
          </button>
        </form>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <input
          type="text"
          placeholder="Search..."
          value={filter}
          onChange={handleFilterChange}
          className="block w-full text-slate-600 font-raleway border border-slate-400 rounded-lg px-4 py-2 mb-4"
        />
        <ul>
          {employees.map((employee) => (
            <li key={employee.id} className="py-2 border-b border-slate-300">
              {employee.nom} {employee.prenom} {employee.postnom}
            </li>
          ))}
        </ul>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="bg-slate-500 text-white font-raleway py-2 px-4 rounded-lg hover:bg-orange-500 transition-colors disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-slate-600 font-raleway">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="bg-slate-500 text-white font-raleway py-2 px-4 rounded-lg hover:bg-orange-500 transition-colors disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Employees;
