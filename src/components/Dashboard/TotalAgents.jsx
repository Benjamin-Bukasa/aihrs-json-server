import { FaArrowRightToCity } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import db from "../../../db.json"



const TotalAgents = ({title,total}) => {
  const dateNow = Date.now()
  const date = new Date(dateNow)
  const formatDate = format(date, 'dd/MM/yyyy')
  const infoData = formatDate

  

  return (
    <div className='lg:w-1/3 h-full flex flex-col justify-start items-start shadow-custom-light text-[#4d4d4d] rounded-3xl overflow-hidden sm:w-full border'>
        <div className="w-full h-1/2 flex justify-between items-center px-8 py-2 bg-gray-100  ">
          <Link to={'/global-tracking'} className='w-2/3 flex justify-start items-center gap-2 '>
            <span className="p-2 bg-white rounded-lg">
              <FaArrowRightToCity size={25} />
            </span>
          <p className="font-medium text-md text-gray-500">{title}</p>
          </Link>
          <p className=" p-2 bg-gray-200 text-gray-500 w-20 text-end rounded-3xl font-bold text-lg">{total}</p>
        </div>
        <div className="w-full h-1/2 px-8 py-2 bg-white">
            <div className="divide-y">
                <p className="py-2 flex justify-between items-center">
                  <span className=" font-semibold">Total Nouveaux agent au cours ce mois </span>
                  <span>{total}</span>
                  
                  </p>
                <p className="py-2 flex justify-between items-center">
                  <span className=" font-normal">Date de la dérnière modification</span>
                  <span className="">{infoData}</span>
                </p>
            </div>
        </div>
    </div>
  )
}

export default TotalAgents
