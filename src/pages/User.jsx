import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import db from '../../db.json'
import { FaUserTie } from "react-icons/fa6";
// import table from 'autotable/lib/table';

function User() {

  const { name } = useParams();
  const filter = db.entries.filter((item) => {
    return item.name === name;
  });
  const user = db.entries.find(
    (user) => user.name === name
  );

  return (
    <>
      <div className="w-full bg-white">
        <div className='w-full p-2'>
          <p className="text-[18px] text-slate-500 p-2">Details de l'agent: <span className='text-orange-500 font-extrabold'>{user.name}</span></p>
        </div>
        <div className="w-full rounded-xl p-2 divide-y">
          <ul className="w-full flex justify-center divide-x ">
            <Link to={`/${user.name}/infos`}className='flex justify-start items-center gap-2 px-10 py-2 text-slate-400 hover:text-slate-600'><li className="font-medium active:text-orange-500 text-[14px]">Information générale</li></Link>
            <Link to={`/${user.name}/contract`} className='flex justify-start items-center gap-2 px-10 py-2 text-slate-400 hover:text-slate-600'><li className="font-medium active:text-orange-500 text-[14px]">Contrat</li></Link>
            <Link to={`/${user.name}/report`} className='flex justify-start items-center gap-2 px-10 py-2 text-slate-400 hover:text-slate-600'><li className="font-medium active:text-orange-500 text-[14px]">Indicateurs</li></Link>
            <Link to={`/${user.name}/pointage`} className='flex justify-start items-center gap-2 px-10 py-2 text-slate-400 hover:text-slate-600'><li className="font-medium active:text-orange-500 text-[14px]">Absence et Congé</li></Link>
            <Link to={`/${user.name}/report`} className='flex justify-start items-center gap-2 px-10 py-2 text-slate-400 hover:text-slate-600'><li className="font-medium active:text-orange-500 text-[14px]">Actions Disciplinaires</li></Link>
            <Link to={`/${user.name}/report`} className='flex justify-start items-center gap-2 px-10 py-2 text-slate-400 hover:text-slate-600'><li className="font-medium active:text-orange-500 text-[14px]">Reporting</li></Link>
          </ul>
          <div className="w-full h-full flex justify-start px-10 py-2">
            <Outlet/>
          </div>
        </div>
    </div>
    </>
  )
}

export default User
