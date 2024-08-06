import React, { useState } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autotable from "jspdf-autotable";
import { FaEdit, FaTrashAlt, FaFileExcel, FaFilePdf } from "react-icons/fa";

const isHolidayInDRC = (date) => {
  const holidays = [
    "01-01", // Nouvel An
    "01-04", // Jour des Martyrs
    "05-01", // Fête du Travail
    "06-30", // Fête de l'Indépendance
    "08-01", // Fête des Parents
    "12-25", // Noël
    "12-31", // Réveillon
    "06-05", // Kimbangu
    "05-17", // liberation AFDL
    "01-17", // Lumumba
    "01-16", // Laurent Kabila
  ];
  const formattedDate = new Date(date).toISOString().slice(5, 10);
  return holidays.includes(formattedDate);
};

const calculateTotal = (data) => {
  let total130 = 0;
  let total160 = 0;
  let total25 = 0;
  let total200 = 0;

  data.forEach((row) => {
    total130 += parseFloat(row.hours130);
    total160 += parseFloat(row.hours160);
    total25 += parseFloat(row.hours25);
    total200 += parseFloat(row.hours200);
  });

  if (total130 > 6) {
    total160 += total130 - 6;
    total130 = 6;
  }

  return { total130, total160, total25, total200 };
};

function UserAttendance() {
  const [data, setData] = useState([]);
  const [date, setDate] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleAdd = () => {
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    const totalHours = ((end - start) / (1000 * 60 * 60)).toFixed(2);

    let hours130 = 0;
    let hours160 = 0;
    let hours25 = 0;
    let hours200 = 0;

    const dayOfWeek = new Date(date).getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isHoliday = isHolidayInDRC(date);

    if (isWeekend || isHoliday) {
      hours200 = totalHours;
    } else if (totalHours > 8.5) {
      const overtime = (totalHours - 8.5).toFixed(2);
      const endOfRegularHours = new Date(`1970-01-01T16:30:00`);
      const startOfExtraHours = new Date(`1970-01-01T19:00:00`);

      if (start < endOfRegularHours) {
        const regularHours = (
          (endOfRegularHours - start) /
          (1000 * 60 * 60)
        ).toFixed(2);
        hours130 = Math.min(overtime, 2.5, regularHours).toFixed(2);
      }

      if (end > startOfExtraHours) {
        const extraHours = (
          (end - startOfExtraHours) /
          (1000 * 60 * 60)
        ).toFixed(2);
        hours25 = Math.max(0, extraHours).toFixed(2);
      }

      if (totalHours - 8.5 > 6) {
        hours160 = (totalHours - 8.5 - 6).toFixed(2);
      }
    }

    setData([
      ...data,
      {
        date,
        employeeName,
        startTime,
        endTime,
        totalHours,
        hours130,
        hours160,
        hours25,
        hours200,
      },
    ]);
  };

  const handleDelete = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  const handleEdit = (index) => {
    const item = data[index];
    setDate(item.date);
    setEmployeeName(item.employeeName);
    setStartTime(item.startTime);
    setEndTime(item.endTime);
    handleDelete(index);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "heures_travail.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    autotable(doc, {
      head: [
        ["Jour", "Agent", "HA", "HD", "HT", "130%", "160%", "25%", "200%"],
      ],
      body: data.map((row) => [
        row.date,
        row.employeeName,
        row.startTime,
        row.endTime,
        row.totalHours,
        row.hours130,
        row.hours160,
        row.hours25,
        row.hours200,
      ]),
    });
    const totals = calculateTotal(data);
    autotable(doc, {
      head: [
        [
          "Total",
          "",
          "",
          "",
          "",
          totals.total130,
          totals.total160,
          totals.total25,
          totals.total200,
        ],
      ],
    });
    doc.save("heures_travail.pdf");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Pointage mensuel de l'agent MAD</h1>
      <div className="mb-4">
        <label className="block">
          Nom de l'employé:
          <input
            type="text"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            className="border p-2 rounded w-full outline-none"
          />
        </label>
      </div>
      <div className="mb-4 flex space-x-4">
        <label className="block w-1/4">
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded w-full outline-none"
          />
        </label>
        <label className="block w-1/4">
          Heure d'arrivée:
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border p-2 rounded w-full outline-none"
          />
        </label>
        <label className="block w-1/4">
          Heure de départ:
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="border p-2 rounded w-full  outline-none"
          />
        </label>
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white p-2 rounded self-end"
        >
          Ajouter
        </button>
      </div>

      <div className="mt-4 flex space-x-2">
        <button
          onClick={exportToExcel}
          className="bg-slate-500 text-white p-2 rounded flex items-center"
        >
          <FaFileExcel className="mr-2" /> Exporter en Excel
        </button>
        <button
          onClick={exportToPDF}
          className="bg-slate-200 text-slate-500 p-2 rounded flex items-center"
        >
          <FaFilePdf className="mr-2" /> Exporter en PDF
        </button>
      </div>

      <table className="mt-4 w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Jour</th>
            <th className="border p-2">Nom de l'employé</th>
            <th className="border p-2">Heure d'arrivée</th>
            <th className="border p-2">Heure de départ</th>
            <th className="border p-2">Heures totales</th>
            <th className="border p-2">130%</th>
            <th className="border p-2">160%</th>
            <th className="border p-2">25%</th>
            <th className="border p-2">200%</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            const totals =
              (index + 1) % 5 === 0
                ? calculateTotal(data.slice(index - 4, index + 1))
                : null;
            return (
              <React.Fragment key={index}>
                <tr>
                  <td className="border p-2">{row.date}</td>
                  <td className="border p-2">{row.employeeName}</td>
                  <td className="border p-2">{row.startTime}</td>
                  <td className="border p-2">{row.endTime}</td>
                  <td className="border p-2">
                    {parseFloat(row.totalHours).toFixed(2)}
                  </td>
                  <td className="border p-2">
                    {parseFloat(row.hours130).toFixed(2)}
                  </td>
                  <td className="border p-2">
                    {parseFloat(row.hours160).toFixed(2)}
                  </td>
                  <td className="border p-2">
                    {parseFloat(row.hours25).toFixed(2)}
                  </td>
                  <td className="border p-2">
                    {parseFloat(row.hours200).toFixed(2)}
                  </td>
                  <td className="border p-2 flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-yellow-500"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-500"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
                {totals && (
                  <tr>
                    <td className="border p-2 font-bold">Total</td>
                    <td className="border p-2"></td>
                    <td className="border p-2"></td>
                    <td className="border p-2"></td>
                    <td className="border p-2"></td>
                    <td className="border p-2 font-bold">
                      {totals.total130.toFixed(2)}
                    </td>
                    <td className="border p-2 font-bold">
                      {totals.total160.toFixed(2)}
                    </td>
                    <td className="border p-2 font-bold">
                      {totals.total25.toFixed(2)}
                    </td>
                    <td className="border p-2 font-bold">
                      {totals.total200.toFixed(2)}
                    </td>
                    <td className="border p-2"></td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserAttendance;
