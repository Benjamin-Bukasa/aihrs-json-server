import React from 'react';

function Notifications() {
  return (
    <div className='w-full h-full flex flex-col items-center gap-4 bg-white p-2 '>
      <h1 className='text-orange-500 font-bold text-[25px] mt-5'>Historique d'actions des utilisateurs</h1>
      <p className='text-[17px] font-semibold'>Ici s'affichent toutes les notifications des actions des utilisateurs </p>      
      <p className='text-[15px]'>Seule les administrateurs peuvent les voir </p>      
    </div>
  );
}

export default Notifications;
