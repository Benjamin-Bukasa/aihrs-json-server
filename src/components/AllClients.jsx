import React, { useEffect, useState, useContext } from 'react';
import db from '../../db.json';
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material';
import { Link } from 'react-router-dom';
import { AiFillEye } from "react-icons/ai";
import { UserContext } from '../UserContext';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const AllClients = () => {
  const { role, user, logoutUser } = useContext(UserContext);
  const [clients, setClients] = useState([]);
  const dataApi = db.clients;
  const data = dataApi.map((client) => (
    [client.id, client.clientName, client.clientAdress, client.contract, client.contractType, client.contractStart, client.contractEnd, client.madAgents, client.status]
  ));

  const columns = [
    { name: 'Id' },
    { name: "Nom du client" },
    { name: "Adresse client" },
    { name: "Type de contrat" },
    { name: "Produit(s)" },
    { name: "date début Contrat" },
    { name: "Date fin contrat" },
    { name: "Nombre d'AMAD" },
    {
      name: "Status",
      options: {
        customBodyRender: (value) => (
          <p className=''>
            {value === true ? <span className='bg-green-100 text-green-600 font-semibold px-4 py-1 rounded-xl'>En cours</span> : <span className='bg-red-100 text-red-600 font-semibold px-4 py-1 rounded-xl'>fin contrat</span>}
          </p>
        )
      }
    },
    {
      name: "Action",
      options: {
        customBodyRender: (value) => (
          <Link to={`/${value}`}>
            <p className='flex items-center justify-center gap-1 px-1 py-1 text-white bg-orange-400 rounded-xl'>
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
      const exportData = dataApi.map((client) => ({
        ID: client.id,
        "Nom & Post-nom": client.name,
        Genre: client.gender,
        Fonction: client.function,
        Enteprise: client.company,
        "Lieu d'Affectation": client.location,
        "Date d'affectation": client.dateOfAffectation,
        Status: client.status ? 'Actif' : 'Inactif',
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
    fetch('http://localhost:3000/entries')
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

export default AllClients;
