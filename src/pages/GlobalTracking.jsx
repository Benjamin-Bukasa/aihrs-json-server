import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
// import Employee from '../components/Employee';
// import UploadFile from '../components/Dashboard/UploadFile';
import { Link, Outlet, useParams } from 'react-router-dom';
import AllAgents from '../components/AllAgents';
// import Employee from '../components/Employee/Employee';

function GlobalTracking() {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const {id} = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/entries');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching global tracking data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='w-full flex flex-col gap-2 p-4'>
      <h3 className="text-orange-500 font-extrabold text-[18px] p-2  ">Suivi global des agents</h3>
      <div className="w-full flex flex-col justify-start gap-4 border-b">
        <div className="w-full flex justify-around gap-4">
          <div className='text-center bg-white p-2 font-semibold text-slate-500 text-[13px] active:bg-orange-500 active:text-white hover:bg-slate-400 hover:text-white w-full h-full cursor-pointer'><Link to='/' className='w-full h-full'>Tous les agents</Link></div>
          <div className='text-center bg-white p-2 font-semibold text-slate-500 text-[13px] active:bg-orange-500 active:text-white hover:bg-slate-400 hover:text-white w-full h-full cursor-pointer'><Link to='/' className='w-full h-full'>Agents Kinshasa</Link></div>
          <div className='text-center bg-white p-2 font-semibold text-slate-500 text-[13px] active:bg-orange-500 active:text-white hover:bg-slate-400 hover:text-white w-full h-full cursor-pointer'><Link to='/' className='w-full h-full'>Agents Province</Link></div>
          <div className='text-center bg-white p-2 font-semibold text-slate-500 text-[13px] active:bg-orange-500 active:text-white hover:bg-slate-400 hover:text-white w-full h-full cursor-pointer'><Link to='/' className='w-full h-full'>Agents Actifs</Link></div>
          <div className='text-center bg-white p-2 font-semibold text-slate-500 text-[13px] active:bg-orange-500 active:text-white hover:bg-slate-400 hover:text-white w-full h-full cursor-pointer'><Link to='/' className='w-full h-full'>Agents inactifs</Link></div>
        </div>
      </div>
      <div className="">
          
      </div>
      <div className="w-full overflow-hidden">
        {/* <Employee/> */}
        <AllAgents/>
      </div>
      <div className="">
        <Outlet/>
      </div>
      {/* <UploadFile/> */}
      {/* <Employee/> */}
    </div>
  );
}

export default GlobalTracking;
