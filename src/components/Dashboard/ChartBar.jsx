import React from 'react';
import {Chart as ChartJs} from 'chart.js/auto'
import {Bar} from "react-chartjs-2"
import Data from './../../../db.json'
import { format } from 'date-fns';



const ChartBar = () => {

const data = Data.entries
const dataAnneePassee = data.filter((employee)=>employee.annee === 2023)
const dataAnneeEnCours = data.filter((employee)=>employee.annee === 2024)
const totalAnneePassee = dataAnneePassee.length
const totalAnneeEnCours = dataAnneeEnCours.length


  return (
    <div className='w-full h-full flex justify-center shadow-custom-light border rounded-xl'>
        <Bar
          data = {{
            labels:["2023","2024"],
            datasets:[
              {
                label:"Total agent 2023",
                data:[totalAnneePassee],
              },{
                label:"Total agent 2024",
                data:[totalAnneeEnCours],
              }
            ]
          }}
        />
    </div>
  );
}

export default ChartBar;
