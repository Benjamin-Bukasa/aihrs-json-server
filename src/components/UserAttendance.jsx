import React, { useState } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autotable from "jspdf-autotable";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaFileExcel, FaFilePdf, FaSave } from "react-icons/fa";

// Fonction pour générer un identifiant unique pour chaque pointage
const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Fonction pour identifier les jours fériés en RDC
const isHolidayInDRC = (date) => {
  const holidays = [
    "01-01", "01-04", "05-01", "06-30", "08-01", "12-25", "12-31", "06-05", "05-17", "01-17", "01-16"
  ];
  const formattedDate = new Date(date).toISOString().slice(5, 10);
  return holidays.includes(formattedDate);
};

// Fonction pour calculer les totaux hebdomadaires
const calculateWeeklyTotals = (data, weekStartIndex, weekEndIndex) => {
  let weeklyTotals = { total130: 0, total160: 0, total25: 0, total200: 0 };

  const weekData = data.slice(weekStartIndex, weekEndIndex + 1);
  weekData.forEach((row) => {
    weeklyTotals.total130 += parseFloat(row.hours130) || 0;
    weeklyTotals.total25 += parseFloat(row.hours25) || 0;
    weeklyTotals.total200 += parseFloat(row.hours200) || 0;
  });

  // Si le total des heures à 130% dépasse 6, on ajoute l'excédent à 160%
  if (weeklyTotals.total130 > 6) {
    weeklyTotals.total160 = weeklyTotals.total130 - 6;
    weeklyTotals.total130 = 6;
  }

  return weeklyTotals;
};

function UserAttendance() {
  const [data, setData] = useState([]);
  const [date, setDate] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [totalHeurSupp, setTotalHeurSupp] = useState(0);
  const [allWeeksTotal, setAllWeeksTotal] = useState({ total130: 0, total160: 0, total25: 0, total200: 0 });

  const handleAdd = () => {
    if (!employeeName) {
      setModalMessage("Le nom de l'employé est requis.");
      return;
    }

    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    const totalHours = ((end - start) / (1000 * 60 * 60)).toFixed(2);

    const duplicateDate = data.find(
      (entry) => entry.date === date && entry.employeeName === employeeName
    );
    if (duplicateDate) {
      setModalMessage(`La date ${date} a déjà été entrée pour cet employé.`);
      return;
    }

    let hours130 = 0;
    let hours160 = 0;
    let hours25 = 0;
    let hours200 = 0;

    const newDate = new Date(date);
    const dayOfWeek = newDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isHoliday = isHolidayInDRC(date);

    if (isWeekend || isHoliday) {
      hours200 = parseFloat(totalHours) || 0;
    } else {
      const eveningStart = new Date(`1970-01-01T18:59:00`);
      if (end > eveningStart) {
        hours25 = ((end - eveningStart) / (1000 * 60 * 60)).toFixed(2);
      }

      const overtimeStart = new Date(`1970-01-01T16:30:00`);
      if (end > overtimeStart) {
        const after430Hours = ((end - overtimeStart) / (1000 * 60 * 60)).toFixed(2);
        hours130 = Math.min(after430Hours, 6);
      }
    }

    setData([
      ...data,
      {
        id: generateId(),
        date,
        employeeName,
        startTime,
        endTime,
        totalHours: parseFloat(totalHours).toFixed(2),
        hours130: parseFloat(hours130).toFixed(2),
        hours160,
        hours25: parseFloat(hours25).toFixed(2),
        hours200: parseFloat(hours200).toFixed(2),
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

  const handleCalculateTotal = async () => {
    let weeklyTotal130 = 0;
    let weeklyTotal160 = 0;
    let weeklyTotal25 = 0;
    let weeklyTotal200 = 0;

    // Calcul des totaux de chaque semaine
    for (let i = 0; i < data.length; i += 7) {
      const weeklyTotals = calculateWeeklyTotals(data, i, Math.min(i + 6, data.length - 1));
      weeklyTotal130 += weeklyTotals.total130;
      weeklyTotal160 += weeklyTotals.total160;
      weeklyTotal25 += weeklyTotals.total25;
      weeklyTotal200 += weeklyTotals.total200;
    }

    setAllWeeksTotal({ total130: weeklyTotal130, total160: weeklyTotal160, total25: weeklyTotal25, total200: weeklyTotal200 });

    const payload = {
      id: generateId(),
      employee: employeeName,
      mois: new Date(date).toLocaleString("fr-FR", { month: "long" }),
      totalHeurSupp: weeklyTotal130 + weeklyTotal160 + weeklyTotal25 + weeklyTotal200, // Valeur en number
    };

    try {
      await axios.post("http://localhost:5000/pointage", payload);
      alert("Total heures supplémentaires sauvegardé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
      alert("Une erreur est survenue lors de la sauvegarde.");
    }
  };

  const handleSave = async () => {
    try {
      for (const row of data) {
        const payload = {
          id: row.id,
          employeeName: row.employeeName,
          date: row.date,
          heure_arrivee: row.startTime,
          heure_depart: row.endTime,
          total_hours: row.totalHours,
          hours130: row.hours130,
          hours160: row.hours160 || 0,
          hours25: row.hours25 || 0,
          hours200: row.hours200 || 0
        };

        await axios.post("http://localhost:5000/pointage", payload);
      }

      alert("Données sauvegardées avec succès !");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
      alert("Une erreur est survenue lors de la sauvegarde.");
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "Pointage.xlsx");
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
        row.hours160 ? row.hours160 : "",
        row.hours25,
        row.hours200,
      ]),
    });
    doc.save("heures_travail.pdf");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Pointage mensuel de l'agent</h1>

      {modalMessage && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Erreur</h2>
            <p className="text-gray-600 mb-4">{modalMessage}</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setModalMessage("")}
            >
              Fermer
            </button>
          </div>
        </div>
      )}

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
            className="border p-2 rounded w-full outline-none"
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
        <button
          onClick={handleSave}
          className="bg-green-700 text-white p-2 rounded flex items-center"
        >
          <FaSave className="mr-2" /> Sauvegarder
        </button>
        <button
          onClick={handleCalculateTotal}
          className="bg-purple-500 text-white p-2 rounded flex items-center"
        >
          Calculer Total Semaine
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
          {data.map((row, index) => (
            <React.Fragment key={index}>
              <tr>
                <td className="border p-2">{row.date}</td>
                <td className="border p-2">{row.employeeName}</td>
                <td className="border p-2">{row.startTime}</td>
                <td className="border p-2">{row.endTime}</td>
                <td className="border p-2">{row.totalHours}</td>
                <td className="border p-2">{row.hours130}</td>
                <td className="border p-2"></td> {/* 160% reste vide */}
                <td className="border p-2">{row.hours25}</td>
                <td className="border p-2">{row.hours200}</td>
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

              {/* Ajouter une ligne "Total Semaine" après chaque groupe de 7 jours */}
              {(index + 1) % 7 === 0 && (
                <tr className="font-bold bg-gray-100">
                  <td className="border p-2">Total Semaine</td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                  <td className="border p-2">
                    {calculateWeeklyTotals(data, index - 6, index).total130.toFixed(2)}
                  </td>
                  <td className="border p-2">
                    {calculateWeeklyTotals(data, index - 6, index).total160.toFixed(2)}
                  </td>
                  <td className="border p-2">
                    {calculateWeeklyTotals(data, index - 6, index).total25.toFixed(2)}
                  </td>
                  <td className="border p-2">
                    {calculateWeeklyTotals(data, index - 6, index).total200.toFixed(2)}
                  </td>
                  <td className="border p-2"></td>
                </tr>
              )}
            </React.Fragment>
          ))}

          {/* Ligne qui affiche le total de toutes les semaines */}
          {data.length > 0 && (
            <tr className="font-bold bg-orange-100">
              <td className="border p-2">Total Toutes Semaines</td>
              <td className="border p-2"></td>
              <td className="border p-2"></td>
              <td className="border p-2"></td>
              <td className="border p-2"></td>
              <td className="border p-2">{allWeeksTotal.total130.toFixed(2)}</td>
              <td className="border p-2">{allWeeksTotal.total160.toFixed(2)}</td>
              <td className="border p-2">{allWeeksTotal.total25.toFixed(2)}</td>
              <td className="border p-2">{allWeeksTotal.total200.toFixed(2)}</td>
              <td className="border p-2"></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserAttendance;
