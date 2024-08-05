import React, { useEffect, useState,useContext } from 'react'
import db from '../../db.json'
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material';
import { CiTextAlignLeft } from 'react-icons/ci';
import { Padding } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { AiFillEye } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import { FaUserTimes } from "react-icons/fa";
import { UserContext } from '../UserContext';

const AllAgents = () => {
const { role, user, logoutUser } = useContext(UserContext);
const [agents, setAgents] = useState ([])
const dataApi = db.entries
const data = dataApi.map((agent)=>(
    [agent.id,agent.name,agent.gender, agent.function, agent.location, agent.dateOfAffectation, agent.status,agent.name]
))
const columns = [
    {
        name:'ID',
    },
    {
        name:"Nom & Post-nom",

    },
    {
        name:"Genre",

    },
    {
        name:"Fonction",

    },
    {
        name:"Lieu d'Affectation",

    },
    {
        name:"Date d'affectation",

    },
    {
        name:"Status",
        options:{
            customBodyRender:(value)=>(
                <p className=''>{value=== true?<span className='bg-green-400 text-white px-4 py-1 rounded-xl'>Actif</span>:<span className='bg-red-400 text-white px-4 py-1 rounded-xl'>inactif</span>}</p>
            )
        }

    },
    {
        name:"Action",
        options:{
            customBodyRender:(value)=>(
                <p className='flex items-center justify-around gap-1'>
                    <Link to={`/${value}`}><AiFillEye size={20} color='skyblue'/></Link>
                    {user && user.role ==='admin'?<Link to=''><FaUserEdit size={15} color='green'/></Link>:""}
                    {user && user.role ==='admin'?<Link to=''><FaUserTimes size={15} color='red'/></Link>:""}
                </p>
            )
        }

    }
    ];


const options = {
    selectableRows: false,
    elevation:0,
    rowsPerPage: 10,
    rowsPerPageOptions: [10,20,50,100,500]
  };

  const getMuiTheme = ()=>createTheme({
        typography:{
            fontFamily:"raleway",
        },
        components:{
            MuiTableCell:{
                head:{
                   
                }, 
                body:{
                    padding:"7px 10px",
                    color:"#475569"
                }
            }
        }
  })

  useEffect(()=>{
    fetch('http://localhost:3000/entries')
    .then((res) =>res.json())
    .then((dataApi)=>{
        setAgents(dataApi?.id);
    })
  },[])

  return (
    <div className='w-full h-full p-2 rounded-xl border bg-white shadow-custom-light'>
        <ThemeProvider theme={getMuiTheme()}>
           {/* {dataApi.length} */}
            <MUIDataTable
        title={"Liste des Agents MAD"}
        data={data}
        columns={columns}
        options={options}
        />
        </ThemeProvider>
    </div>
  )
}

export default AllAgents
