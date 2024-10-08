import React from 'react'
import {useParams, Link, Outlet} from 'react-router-dom'
import db from '../../db.json'

const Client = () => {

  const { clientName } = useParams();
  const filter = db.clients.filter((item) => {
    return item.clientName === clientName;
  });
  const client = db.clients.find(
    (client) => client.clientName === clientName
  );

  return (
    <div>
      <div className="w-full bg-white">
        <div className='w-full p-2'>
          <p className="text-[18px] text-slate-500 p-2">Details du client: <span className='text-orange-500 font-extrabold'>{client.clientName}</span></p>
        </div>
        <div className="w-full rounded-xl p-2 divide-y">
          <ul className="w-full flex justify-center divide-x ">
            <Link to={`/client/${client.clientName}/infos`}className='flex justify-start items-center gap-2 px-10 py-2 text-slate-400 hover:text-slate-600'><li className="font-medium active:text-orange-500 text-[14px]">Information générale</li></Link>
            <Link to={`/client/${client.clientName}/contract`} className='flex justify-start items-center gap-2 px-10 py-2 text-slate-400 hover:text-slate-600'><li className="font-medium active:text-orange-500 text-[14px]">Contrat</li></Link>
            <Link to={`/client/${client.clientName}/stats`} className='flex justify-start items-center gap-2 px-10 py-2 text-slate-400 hover:text-slate-600'><li className="font-medium active:text-orange-500 text-[14px]">Historique</li></Link>
            <Link to={`/client/${client.clientName}/report`} className='flex justify-start items-center gap-2 px-10 py-2 text-slate-400 hover:text-slate-600'><li className="font-medium active:text-orange-500 text-[14px]">Rapport</li></Link>
          </ul>
          <div className="w-full h-full flex justify-start px-10 py-2">
            <Outlet/>
          </div>
        </div>
    </div>
    </div>
  )
}

export default Client
