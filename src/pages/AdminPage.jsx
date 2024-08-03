import React from 'react';
import Admin from '../components/Admin/Admin';
import ChartBar from '../components/Dashboard/ChartBar';

function AdminPage() {
  return (
    <>
    <Admin/>
    <div className="w-full h-3/5 flex gap-2 rounded-xl p-4">
      <div className="w-1/2 h-full bg-white border rounded-xl shadow-custom-light">
        <div className="w-full h-1/2 p-4 flex justify-center">
          <ChartBar/>
        </div>
        <div className="w-full flex p-4 gap-1">
          <div className="w-1/2 h-full">
            <ChartBar/>
          </div>
          <div className="w-1/2 h-full">
            <ChartBar/>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-full overflow-hidden p-4 bg-white border rounded-xl shadow-custom-light">
          {/* <Employee/> */}
      </div>
    </div>
    </>
  );
}

export default AdminPage;
