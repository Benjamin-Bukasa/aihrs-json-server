import React from 'react';
import {Chart as ChartJs} from 'chart.js/auto'
import {Bar} from "react-chartjs-2"
import Data from './../../../db.json'
import { format } from 'date-fns';



const ChartBar = () => {

const data = Data.entries
const dataAnneePassee = data.filter((employee)=>employee.location === "Kinshasa")
const dataAnneeEnCours = data.filter((employee)=>employee.location !== "Kinshasa")
const totalAnneePassee = dataAnneePassee.length
const totalAnneeEnCours = dataAnneeEnCours.length

  return (
    <div className='w-full h-full flex justify-center shadow-custom-light border rounded-xl'>
        <Bar
          data = {{
            labels:["2023"],
            datasets:[
              {
                label:"Total agent Kinshasa",
                data:[totalAnneePassee],
              },{
                label:"Total agent Province",
                data:[totalAnneeEnCours],
              },
            ]
            
          }}
        />
    </div>
  );
}

export default ChartBar;
