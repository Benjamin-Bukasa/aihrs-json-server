import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import TotalAgents from '../components/Dashboard/TotalAgents';
import Data from './../../db.json'
import ChartBar from '../components/Dashboard/ChartBar';
import AllAgents from '../components/AllAgents';
// import Employee from '../components/Employee/Employee';
import UploadFile from '../components/Dashboard/UploadFile'

function AdminDashboard() {
  const { role, user, logoutUser } = useContext(UserContext);
  const displayRole = role === 'admin' ? 'Administrateur': 'Utilisateur'

  const data = Data.entries
  const dataKinshasa = Data.entries.filter(agent=>agent.lieuAffectation ==="Kinshasa")
  const dataKinshasaLenght = dataKinshasa.length
  const dataProvince = Data.entries.filter(agent=>agent.lieuAffectation !=="Kinshasa")
  const dataProvinceLength = dataProvince.length
  const dataInactif = Data.entries.filter(agent=>agent.status ===false)
  const dataAgentInactif = dataInactif.length

  return (
    <>
    <div className=''>
      <div className="w-full flex justify-between items-center p-2">
        {/* <h1 className=''>Admin Dashboard</h1> */}
        <h2 className=''>Welcome, <span className='font-semibold text-orange-500'>{user?.username}</span></h2>
        <button onClick={logoutUser} className='px-3 py-2 border rounded-3xl shadow-custom-light bg-gray-300 font-semibold text-slate-500 hover:bg-orange-400 hover:text-white'>Se déconnecter</button>
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
        <div className="w-full h-1/2 flex p-4 gap-1">
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
            <div className="w-1/2 h-full p-2 bg-gradient-to-l from-[#EE4A3C] to-[#FAA336] rounded-xl text-white/75 font-semibold">
            Total
            </div>
            <div className="w-1/2 h-full p-2 bg-gradient-to-r from-[#A90CC4] to-[#4F059D] rounded-xl text-white/75 font-semibold">
            Total
            </div>
          </div>
          <div className="w-full flex items-center jusitfy-center gap-1 h-1/2">
            <div className="w-1/2 h-full p-2 bg-gradient-to-r from-[#0C98C4] to-[#28059D] rounded-xl text-white/75 font-semibold">
            Total
            </div>
            <div className="w-1/2 h-full p-2 bg-gradient-to-r from-[#74E9A3] to-[#086A38] rounded-xl text-white/75 font-semibold">
            Total
            </div>
          </div>
      </div>
    </div>
    </>
  );
}

export default AdminDashboard;
