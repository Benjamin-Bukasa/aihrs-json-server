import React from 'react';

function Report() {
  return (
    <div className='w-full  p-2 flex flex-col gap-10 bg-white shadow-custom-light border'>
      <h1 className="w-full font-bold text-orange-500 text-[20px]">Reporting</h1>
      <div className="flex gap-4 h-full">
        <div className="w-1/4 flex flex_col justify-center items-center h-52 border rounded-xl shadow-custom-light cursor-pointer">
          <h2 className="text-center text-[20px] font-semibold text-orange-500">Rapport de pointage</h2>
        </div>
        <div className="w-1/4 flex flex_col justify-center items-center h-52 border rounded-xl shadow-custom-light cursor-pointer">
          <h2 className="text-center text-[20px] font-semibold text-orange-500">Rapport du suivi global</h2>
        </div>
        <div className="w-1/4 flex flex_col justify-center items-center h-52 border rounded-xl shadow-custom-light cursor-pointer">
          <h2 className="text-center text-[20px] font-semibold text-orange-500">Rapport Indicateur</h2>
        </div>
        <div className="w-1/4 flex flex_col justify-center items-center h-52 border rounded-xl shadow-custom-light cursor-pointer">
          <h2 className="text-center text-[20px] font-semibold text-orange-500">Rapport </h2>
        </div>
      </div>
    </div>
  );
}

export default Report;
