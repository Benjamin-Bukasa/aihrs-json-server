import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import TotalAgents from '../components/Dashboard/TotalAgents';
import Data from './../../db.json'
import ChartBar from '../components/Dashboard/ChartBar';

function UserDashboard() {
  const { role, user, logoutUser } = useContext(UserContext);
  const displayRole = role === 'admin' ? 'Administrateur': 'Utilisateur'

  const data = Data.employee
  const dataKinshasa = Data.employee.filter(agent=>agent.lieuAffectation ==="Kinshasa")
  const dataKinshasaLenght = dataKinshasa.length
  const dataProvince = Data.employee.filter(agent=>agent.lieuAffectation !=="Kinshasa")
  const dataProvinceLength = dataProvince.length
  const dataInactif = Data.employee.filter(agent=>agent.status ===false)
  const dataAgentInactif = dataInactif.length

  return (
    <>
    
    <div className='flex flex-col'>
    <div className="flex justify gap-5 p-4">
        <h2 className=''>Bienvenu, vous ête connecté en tant qu' <span className='text-orange-500 font-semibold'>{displayRole}</span></h2>
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
      <div className="w-1/2 h-full p-4 bg-white border rounded-xl shadow-custom-light">
Hello world
      </div>
    </div>
    </>
  );
}

export default UserDashboard;
