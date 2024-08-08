import React from 'react'
import { useParams } from 'react-router-dom'
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
      <div className='p-2'>
        {
          filter.map((element)=>(
            <div className="w-full h-full flex p-2 bg-white border rounded-xl shadow-custom-light" key={element.name}>
                <div className="w-1/5">
                  <FaUserTie size={200} className='text-orange-400'/>
                </div>
                <div className="w-4/5 flex flex-col justify-start items-start p-2 gap-2 text-[16px]">
                <h3 className="text-[30px] font-bold text-orange-400">{name}</h3>
                <h3 className="text-[30px] font-bold text-orange-400">Informations générales</h3>
                <div className="w-full flex justify-start items-center gap-5 ">
                  <div className="">Nom complet</div>
                  <div className="font-semibold">{user.name} {user.firstname}</div>
                </div>
                <div className="w-full flex justify-start items-center gap-5">
                <div className="">Genre</div>
                <div className="font-semibold">{user.gender}</div>
                </div>
                <div className="w-full flex justify-start items-center gap-5">
                  <div className="">Fonction</div>
                  <div className="font-semibold">{user.function}</div>
                </div>
                <div className="w-full flex justify-start items-center gap-5">
                  <div className="">Lieu d'affectation</div>
                  <div className="font-semibold">{user.location}</div>
                </div>
                <div className="w-full flex justify-start items-center gap-5">
                  <div className="">Genre</div>
                  <div className="font-semibold">{user.gender}</div>
                </div>
                <div className="w-full flex justify-start items-center gap-5"></div>
                <div className="w-full flex justify-start items-center gap-5"></div>
                </div>
            </div>
          ))
        }
      </div>
      {/* <div className="">
        {
          filter.map((infos)=>(
            table
          ))
        }
      </div> */}
    </>
  )
}

export default User
