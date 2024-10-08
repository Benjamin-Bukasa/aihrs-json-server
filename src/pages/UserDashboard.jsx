import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import TotalAgents from '../components/Dashboard/TotalAgents';
import Data from './../../db.json'
import ChartBar from '../components/Dashboard/ChartBar';
import { IoStatsChartOutline } from "react-icons/io5";
import { FaChartArea } from "react-icons/fa6";
import UploadFile from '../components/Dashboard/UploadFile';

function UserDashboard() {
  const { role, user, logoutUser } = useContext(UserContext);
  const displayRole = user === user.username ? 'Administrateur': user.firstName+ ' '+user.lastName

  const data = Data.entries
  const dataKinshasa = Data.entries.filter(agent=>agent.location ==="Kinshasa")
  const dataKinshasaLenght = dataKinshasa.length
  const dataProvince = Data.entries.filter(agent=>agent.location !=="Kinshasa")
  const dataProvinceLength = dataProvince.length
  const dataInactif = Data.entries.filter(agent=>agent.status ===false)
  const dataAgentInactif = dataInactif.length
  const actifAgents = data.length

  return (
    <>
    
    <div className='flex flex-col'>
    <div className="flex justify gap-5 p-4">
        <h2 className=''>Bienvenu, vous ête connecté en tant que <span className='text-orange-500 font-semibold'>{displayRole}</span></h2>
        {/* <button onClick={logoutUser}>Logout</button> */}
      </div>
    <div className="w-full h-1/5 flex justify-start items-center sm:flex-wrap lg:flex-nowrap gap-2 p-4">
        <TotalAgents title="Total AMAD" total={data.length}/>
        <TotalAgents title = "Total Agent Kinshasa" total={dataKinshasaLenght}/>
        <TotalAgents title= "Total Agent Province" total={dataProvinceLength}/>
        <TotalAgents title ="Total Agent Inactif" total ={dataAgentInactif}/>
      </div>
    </div>
    <div className="w-full h-3/5 flex gap-2 rounded-xl p-4">
      <div className="w-1/2 h-full bg-white border rounded-xl shadow-custom-light">
        <div className="w-full h-1/2 p-4 flex justify-center">
          <ChartBar/>
        </div>
        <div className="w-full flex p-4 gap-1">
          <div className="w-1/2 h-full">
            <ChartBar/>
          </div>
          <div className="w-1/2 h-full">
            <ChartBar/>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-full flex flex-col justify-center gap-1 p-4 bg-white border rounded-xl shadow-custom-light">
          {/* <UploadFile/> */}
          {/* <AllAgents/> */}
          <div className="w-full flex items-center jusitfy-center gap-1 h-1/2">
            <div className="w-1/2 h-full px-4 py-2 bg-gradient-to-l from-[#EE4A3C] to-[#FAA336] rounded-xl text-white/75 font-semibold">
              <div className="flex items-center justify-between">
                <p className="w-1/2 text-lg text-left">Effectif total agents MAD</p>
                <p className="text-2xl text-right flex flex-col">{actifAgents}<span className="text-lg">agents</span></p>
              </div>
              <div className=""><IoStatsChartOutline size={100} /></div>
            </div>
            <div className="w-1/2 h-full px-4 py-2 bg-gradient-to-r from-[#A90CC4] to-[#4F059D] rounded-xl text-white/75 font-semibold">
                <div className="flex items-center justify-between">
                <p className="w-1/2 text-lg text-left">Effectif agents en Province</p>
                <p className="text-2xl text-right flex flex-col">{dataProvinceLength}<span className="text-lg">agents</span></p>
              </div>
              <div className=""><FaChartArea size={100}/></div>
            </div>
          </div>
          <div className="w-full flex items-center jusitfy-center gap-1 h-1/2">
            <div className="w-1/2 h-full px-4 py-2 bg-gradient-to-r from-[#0C98C4] to-[#28059D] rounded-xl text-white/75 font-semibold">
            <div className="flex items-center justify-between">
                <p className="w-1/2 text-lg text-left">Effectif agents MAD</p>
                <p className="text-2xl text-right flex flex-col">{actifAgents}<span className="text-lg">agents</span></p>
              </div>
              <div className=""><IoStatsChartOutline size={100} /></div>
            </div>
            <div className="w-1/2 h-full px-4 py-2 bg-gradient-to-r from-[#74E9A3] to-[#086A38] rounded-xl text-white/75 font-semibold">
            <div className="flex items-center justify-between">
                <p className="w-1/2 text-lg text-left">Effectif agents MAD</p>
                <p className="text-2xl text-right flex flex-col">{actifAgents}<span className="text-lg">agents</span></p>
              </div>
              <div className=""><IoStatsChartOutline size={100} /></div>
            </div>
          </div>
      </div>
    </div>
    </>
  );
}

export default UserDashboard;
