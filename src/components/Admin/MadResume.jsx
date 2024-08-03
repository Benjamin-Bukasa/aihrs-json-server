import { FaArrowRightToCity } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FaPlusCircle } from "react-icons/fa";

const MadResume = () => {

    


  return (
    <div className='lg:w-1/3 h-full flex flex-col justify-start items-start shadow-custom-light bg-white text-zinc-500 rounded-3xl overflow-hidden sm:w-full border'>
        <div className="w-full h-1/2 flex justify-between items-center px-8 py-2 bg-gray-100 ">
          <Link to={'/usersList'} className='w-2/3 flex justify-start items-center gap-2'>
            <span className="p-2 bg-white rounded-lg">
              <FaArrowRightToCity size={25} />
            </span>
          <p className="font-medium text-lg text-gray-500">Total AMAD</p>
          </Link>
          <p className=" p-2 bg-gray-200 text-gray-500 w-20 text-end rounded-3xl font-bold text-lg ">0</p>
        </div>
        <div className="w-full h-1/2 px-8 py-2 bg-white">
            <div className="divide-y">
                <p className="py-2 flex justify-between items-center">
                  <span className="text-slate-600 font-semibold">Ajouter un nouvel agent</span>
                  <button className='flex items-center justify-between gap-2 p-2 bg-[#e37e43] hover:bg-[#e75503] rounded-3xl text-white font-semibold'><FaPlusCircle />  Créer</button>
                  
                  </p>
                <p className="py-2 flex justify-between items-center">
                  <span className="text-slate-600 font-semibold">Date du dernier enregistrement</span>
                  <span className="">{Date.now()}</span>
                </p>
            </div>
        </div>
    </div>
  )
}

export default MadResume
