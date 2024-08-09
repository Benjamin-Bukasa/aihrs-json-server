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
      <div className='w-full bg-white'>
        {user.name}
      </div>
     
    </>
  )
}

export default User
