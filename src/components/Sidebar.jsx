import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { GoHomeFill } from "react-icons/go";
import { FaTachometerAlt } from "react-icons/fa";
import { FaFilePowerpoint } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
// import { FaClipboardList } from "react-icons/fa6";
import { FaUserCog } from "react-icons/fa";
import { MdSupervisedUserCircle } from "react-icons/md";
import { GoBellFill } from "react-icons/go";
import { MdFolderShared } from "react-icons/md";
import data from '../../db.json'

function Sidebar({sidebarToggle}) {
  const { user } = useContext(UserContext);
  const notification = data.notifications.filter(item =>item.viewed !== true)
  console.log
  const notReadedNotification = notification.length

  return (
    <div className={`${sidebarToggle ? " hidden transition ease-in-out delay-2000 z-80":" transition ease-in-out delay-2000 z-80 "} w-64 h-screen fixed bg-slate-500 text-white transition ease-in-out delay-2000 z-80`}>
      <h1 className="text-xl text-orange-400 font-bold py-3 px-4">AIHRS Outsourcing</h1>
      <ul>
      <span className='absolute flex justify-center items-center font-semibold z-30 top-[288px]  right-[208px] text-[10px] w-5 h-5 p-1 rounded-full bg-orange-500'>{notReadedNotification}</span>
        <li className="py-4 px-4 hover:bg-slate-50/20 hover:text-white font-semibold text-[15px]"><Link to={user?.role === 'admin' ? '/admin-dashboard' : '/dashboard'} className="flex justify-start items-center gap-5"><GoHomeFill size={25}/>Dashboard</Link></li>
        <li className="py-4 px-4 hover:bg-slate-50/20 hover:text-white font-semibold text-[15px]"><Link to="/global-tracking" className="flex justify-start items-center gap-5"><FaTachometerAlt size={25}/>Suivi Global AMAD</Link></li>
        <li className="py-4 px-4 hover:bg-slate-50/20 hover:text-white font-semibold text-[15px]"><Link to="/clients" className="flex justify-start items-center gap-5"><FaTachometerAlt size={25}/>Suivi Global Client</Link></li>
        <li className="py-4 px-4 hover:bg-slate-50/20 hover:text-white font-semibold text-[15px]"><Link to="/pointage" className="flex justify-start items-center gap-5"><FaFilePowerpoint size={25}/>Pointage</Link></li>
        {/* <li className="py-4 px-4 hover:bg-slate-50/20 hover:text-white font-semibold text-[15px]"><Link to="/report" className="flex justify-start items-center gap-5"><FaClipboardList size={25}/>Report</Link></li> */}
        <li className="py-4 px-4 hover:bg-slate-50/20 hover:text-white font-semibold text-[15px]"><Link to="/notifications" className="flex justify-start items-center gap-5"><GoBellFill size={25}/>Notification</Link></li>
        <li className="py-4 px-4 hover:bg-slate-50/20 hover:text-white font-semibold text-[15px]"><Link to="/profile" className="flex justify-start items-center gap-5"><FaUserCog size={25}/>Profile</Link></li>
        {user && user.role === 'admin' && (
          <li className="py-4 px-4 hover:bg-slate-50/20 hover:text-white font-semibold text-[15px]"><Link to="/admin" className="flex justify-start items-center gap-5"><MdSupervisedUserCircle size={25}/>Admin</Link></li>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
