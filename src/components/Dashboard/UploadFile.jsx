import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

function UploadFile() {
  const [file, setFile] = useState(null);

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
        for (const entry of uniqueData) {
          await axios.post('http://10.5.0.26:3000/entries', entry);
        }
        alert('Data successfully uploaded to db.json');
      } catch (error) {
        console.error('Error uploading data:', error);
        alert('Error uploading data');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="h-full p-4 flex items-center justify-center bg-white">
      <div className="bg-white p-8 rounded-lg shadow-custom-light w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Uploader un fichier Excel</h1>
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
    </div>
  );
}

export default UploadFile;
