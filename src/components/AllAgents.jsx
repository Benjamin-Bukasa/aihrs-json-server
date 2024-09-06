import React, { useEffect, useState, useContext } from 'react';
import db from '../../db.json';
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material';
import { Link } from 'react-router-dom';
import { AiFillEye } from "react-icons/ai";
import { UserContext } from '../UserContext';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const AllAgents = () => {
  const { role, user, logoutUser } = useContext(UserContext);
  const [agents, setAgents] = useState([]);
  const dataApi = db.entries;
  const data = dataApi.map((agent) => (
    [agent.id, agent.name, agent.gender, agent.function, agent.company, agent.location, agent.dateOfAffectation, agent.status, agent.name]
  ));

  const columns = [
    { name: 'ID' },
    { name: "Nom & Post-nom" },
    { name: "Genre" },
    { name: "Fonction" },
    { name: "Entreprise" },
    { name: "Lieu d'Affectation" },
    { name: "Date d'affectation" },
    {
      name: "Status",
      options: {
        customBodyRender: (value) => (
          <p className=''>
            {value === true ? <span className='bg-green-200 border border-green-400 text-green-600 font-semibold px-4 py-1 rounded-2xl'>Actif</span> : <span className='bg-red-400 text-white px-4 py-1 rounded-2xl'>inactif</span>}
          </p>
        )
      }
    },
    {
      name: "Action",
      options: {
        customBodyRender: (value) => (
          <Link to={`/${value}`}>
            <p className='flex items-center justify-center gap-1 px-1 py-1 text-orange-500 font-semibold border border-orange-300 bg-orange-200 rounded-2xl'>
              <AiFillEye size={20} color='white' className='flex' /><span>Détails</span>
            </p>
          </Link>
        )
      }
    }
  ];

  const options = {
    selectableRows: false,
    elevation: 0,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 50, 100, 500],
    onDownload: () => {
      const exportData = dataApi.map((agent) => ({
        ID: agent.id,
        "Nom & Post-nom": agent.name,
        Genre: agent.gender,
        Fonction: agent.function,
        Enteprise: agent.company,
        "Lieu d'Affectation": agent.location,
        "Date d'affectation": agent.dateOfAffectation,
        Status: agent.status ? 'Actif' : 'Inactif',
      }));
      const date = new Date()
      const exportDate = date.getFullYear()
      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Tous les Agents MAD");

      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
      saveAs(dataBlob, `AMAD-${exportDate}.xlsx`);
      
      // Return false to prevent default CSV download
      return false;
    }
  };

  const getMuiTheme = () => createTheme({
    typography: {
      fontFamily: "raleway",
    },
    components: {
      MuiTableCell: {
        styleOverrides: {
          head: {},
          body: {
            padding: "7px 10px",
            color: "#475569"
          }
        }
      }
    }
  });

  useEffect(() => {
    fetch('http://localhost:5000/entries')
      .then((res) => res.json())
      .then((dataApi) => {
        setAgents(dataApi?.id);
      });
  }, []);

  return (
    <div className='w-full h-full p-2 rounded-xl border bg-white shadow-custom-light'>
      <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={"Tous les Agents MAD"}
          data={data}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </div>
  )
}

export default AllAgents;
