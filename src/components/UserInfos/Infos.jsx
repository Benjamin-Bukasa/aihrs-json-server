import React from 'react'
import { Link, useParams } from 'react-router-dom'
import db from '../../../db.json'
import placeholder from '../../images/placeholder.png'


const Infos = () => {

    const { name } = useParams();
    const filter = db.entries.filter((item) => {
      return item.name === name;
    });
    const agent = db.entries.find(
      (agent) => agent.name === name
    );

  return (
    <div className='w-full flex  px-2 py-2 bg-white'>
      <div className="w-1/6 flex flex-col justify-start items-center gap-4 py-7">
            <img src={placeholder} alt="" className="w-40 h-40 rounded-xl opacity-75" />
            <Link to=' ' className="px-4 py-1 bg-orange-500 font-semibold text-white rounded-2xl">Modifier photo</Link>
      </div>
      <div className="w-4/6 px-8 py-1 flex flex-col justify-start items-start gap-10 divide-y">
            <div className="flex flex-col gap-1 py-4">
                <h4 className="font-semibold text-orange-500 text-lg">Indentité</h4>
                <p className="text-zinc-400/75">Toutes les information concernant l'identité de l'agent mise à disposition</p>
            </div>
            <div className="w-full flex flex-col py-2 text-[14px]">
                <div className="flex justify-between items-center pr-2">
                    <div className="w-2/3 flex justify-start gap-8  items-center py-2 ">
                        <p className="w-1/2 font-semibold text-slate-600">Nom complet</p>
                        <p className="w-1/2 text-slate-500">{agent.name}</p>
                    </div>
                    <Link to='' className='text-orange-500 font-semibold'>Modifier</Link>
                </div>
            </div>
            <div className="w-full flex flex-col py-2 text-[14px]">
                <div className="flex justify-between items-center pr-2">
                    <div className="w-2/3 flex justify-start gap-8  items-center py-2 ">
                        <p className="w-1/2 font-semibold text-slate-600">Genre</p>
                        <p className="w-1/2 text-slate-500">{agent.gender}</p>
                    </div>
                    <Link to='' className='text-orange-500 font-semibold'>Modifier</Link>
                </div>
            </div>
            <div className="w-full flex flex-col py-2 text-[14px]">
                <div className="flex justify-between items-center pr-2">
                    <div className="w-2/3 flex justify-start gap-8 items-center py-2 ">
                        <p className="w-1/2 font-semibold text-slate-600">Lieu et date de naissance</p>
                        <p className="w-1/2 text-slate-500">{agent.placeOfBirth}, {''}{agent.dateOfBirth}</p>
                    </div>
                    <Link to='' className='text-orange-500 font-semibold'>Modifier</Link>
                </div>
            </div>
            <div className="w-full flex flex-col py-2 text-[14px]">
                <div className="flex justify-between items-center pr-2">
                    <div className="w-2/3 flex justify-start gap-8 items-center py-2 ">
                        <p className="w-1/2 font-semibold text-slate-600">Etat-Civil</p>
                        <p className="w-1/2 text-slate-500">{agent.matrimonial}</p>
                    </div>
                    <Link to='' className='text-orange-500 font-semibold'>Modifier</Link>
                </div>
            </div>
            <div className="w-full flex flex-col py-2 text-[14px]">
                <div className="flex justify-between items-center pr-2">
                    <div className="w-2/3 flex justify-start gap-8 items-center py-2 ">
                        <p className="w-1/2 font-semibold text-slate-600">Nombre d'enfant</p>
                        <p className="w-1/2 text-slate-500">{agent.children}</p>
                    </div>
                    <Link to='' className='text-orange-500 font-semibold'>Modifier</Link>
                </div>
            </div>
            <div className="w-full flex flex-col py-2 text-[14px]">
                <div className="flex justify-between items-center pr-2">
                    <div className="w-2/3 flex justify-start gap-8 items-center py-2 ">
                        <p className="w-1/2 font-semibold text-slate-600">Adresse Domicile</p>
                        <p className="w-1/2 text-slate-500">{agent.adress}</p>
                    </div>
                    <Link to='' className='text-orange-500 font-semibold'>Modifier</Link>
                </div>
            </div>
            <div className="w-full flex flex-col py-2 text-[14px]">
                <div className="flex justify-end items-center pr-2">
                    <Link to={`/${agent.name}/contract`} className='bg-slate-400 text-white font-semibold px-4 py-2 rounded-lg'>voir son contrat</Link>
                </div>
            </div>
      </div>
    </div>
  )
}

export default Infos
