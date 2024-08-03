import { IoNotifications } from "react-icons/io5";



const Notification = () => {
  return (
    <div className='lg:w-1/3 sm:w-full h-full lg:flex lg:flex-col lg:justify-start lg:items-start gap-2 bg-white shadow-custom-light  py-0 px-0 overflow-y-scroll no-scrollbar rounded-3xl border'>
      <h3 className="w-full flex justify-start items-center gap-8 px-2 py-2 sticky top-0 z-20 bg-slate-500 text-white font-semibold">
        <span className="rounded-2xl bg-white text-slate-500 p-2 ">
        <IoNotifications size={25} />
        </span>
        <span className="">Mes Notifications</span> 
      </h3>
      <div className="w-full h-60 justify-center items-center gap-0 px-0 py-0 divide-y z-10">
            <p className="w-full text-center font-light italic py-5">Pas de nouvelle notification</p>
            <p className="w-full text-center font-light italic py-5">Pas de nouvelle notification</p>
            <p className="w-full text-center font-light italic py-5">Pas de nouvelle notification</p>
            <p className="w-full text-center font-light italic py-5">Pas de nouvelle notification</p>
            <p className="w-full text-center font-light italic py-5">Pas de nouvelle notification</p>
            <p className="w-full text-center font-light italic py-5">Pas de nouvelle notification</p>
            <p className="w-full text-center font-light italic py-5">Pas de nouvelle notification</p>
            <p className="w-full text-center font-light italic py-5">Pas de nouvelle notification</p>
            <p className="w-full text-center font-light italic py-5">Pas de nouvelle notification</p>
            <p className="w-full text-center font-light italic py-5">Pas de nouvelle notification</p>
            <p className="w-full text-center font-light italic py-5">Pas de nouvelle notification</p>
            <p className="w-full text-center font-light italic py-5">Pas de nouvelle notification</p>
      </div>
    </div>
  )
}

export default Notification
