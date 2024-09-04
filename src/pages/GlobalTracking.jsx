import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext';
import { Link, Outlet, useParams } from 'react-router-dom';
import AllAgents from '../components/AllAgents';
// import apiClient from '../api';
import axios from 'axios';


function GlobalTracking() {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const {id} = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://10.5.0.26:5000/entries');
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
      <div className="">  
      </div>
      <div className="w-full overflow-hidden">
        <AllAgents/>
      </div>
    </div>
  );
}

export default GlobalTracking;
