import React from 'react';
import { HiMenu } from 'react-icons/hi';
import { GoBellFill } from 'react-icons/go';
import { FaUserCircle } from 'react-icons/fa';
import { UserContext } from '../UserContext';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import data from '../../db.json'

function Navbar({sidebarToggle, setSidebarToggle}) {

  const { user, logoutUser } = useContext(UserContext);
  const notification = data.notifications.filter(item =>item.viewed !== true)
  const notReadedNotification = notification.length
  const navigate = useNavigate()
  const handleNavigation = () => {
    navigate('/notifications'); 
  };

  return (
    <nav className="w-full sticky bg-slate-500 text-white flex justify-between items-center  px-4 py-3 ">
      <div className="flex justify-start items-center gap-4">
        <HiMenu size={25} className="cursor-pointer" onClick={()=>setSidebarToggle(!sidebarToggle)}/>
        <span className="text-[18px] font-semibold">Tableau de Bord</span>
      </div>
      <div className="flex items-center justify-between gap-x-5">
           
            <div className="relative flex items-center">

              <button className="group" onClick={handleNavigation}>
              <span className='absolute flex justify-center items-center z-50 top-[-5px]  right-[10px] text-[10px] w-4 h-4 p-2 rounded-full bg-orange-500'>{notReadedNotification}</span>
                    <GoBellFill size={25} />
              </button>
            </div>
            <div className="relative flex items-center">
              <button className="group">
                    <FaUserCircle size={25}/>
                    <div className=" z-10 hidden absolute bg-white text-[#515151] rounded-lg shadow w-32 group-focus:block top-full right-0">
                      <ul className="divide-y text-left">
                      <Link to='/profile'><li className="py-2 px-2 overflow-hidden hover:rounded-lg hover:bg-[#F8E9E1] hover:rounded-t">{user?.username}</li></Link>
                        <li className="py-2 px-2 overflow-hidden hover:rounded-lg hover:bg-[#F8E9E1] hover:rounded-b" onClick={logoutUser}>Deconnexion</li>
                      </ul>
                  </div>
              </button>
            </div>
      </div>
    </nav>
  );
}

export default Navbar;
