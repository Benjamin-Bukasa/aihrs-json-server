import { useState } from "react"
import { MdClose } from "react-icons/md";

const ModalAddUser = ({visible, onClose}) => {
const handleClose = (e) =>{
    if(e.target.id ==='container') onClose();
}
if(!visible) return null; 

  return (
    <div id="container" onClick={handleClose} className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-40  shadow-custom z-30 flex justify-center items-center ease-in-out border">
        <div className=" lg:w-2/4 lg:h-2/3 sm:w-3/4 sm:h-3/4 flex flex-col gap-1 bg-white rounded-lg shadow-custom-light p-4">
            <div className="w-full flex justify-end items-center px-0 py-2 ">
                <button onClick={onClose} className="rounded-full bg-slate-200 p-2 hover:bg-red-600 hover:text-white"><MdClose size={20}/></button>
            </div>
            <div className="w-full h-screen flex flex-col gap-2 p-2">
            <h3 className="w-full text-center text-3xl font-bold text-orange-500">Ajouter un nouvel utilisateur</h3>
            <form action="" className="w-full h-full flex flex-col justify-start gap-4 items-start px-1 py-4">
                <div className="w-full flex justify-between items-center gap-1">
                    <input type="text" className="w-1/3 p-2 border outline-none focus:border-orange-500" placeholder="Nom de l'utilisateur"/>
                    <input type="text" className="w-1/3 p-2 border outline-none focus:border-orange-500" placeholder="Post Nom de l'utilisateur"/>
                    <input type="text" className="w-1/3 p-2 border outline-none focus:border-orange-500" placeholder="Prénom de l'utilisateur"/>
                </div>
                <div className="w-full flex justify-between items-center gap-1">
                    <input type="date" className="w-1/2 p-2 border outline-none focus:border-orange-500" placeholder="Date de naissance"/>
                    <select name="" id="" className="w-1/2 p-2 border outline-none focus:border-orange-500 text-slate-600">
                        <option value="" className="">Choisir genre</option>
                        <option value=""></option>
                        <option value=""></option>
                    </select>
                </div>
                <div className="w-full flex justify-between items-center gap-1">
                    <input type="email" className="w-full p-2 border outline-none focus:border-orange-500" placeholder="Adresse email de l'utilisateur"/>
                </div>
                <div className="w-full flex justify-between items-center gap-1">
                    <select name="" id="" className="w-1/2 p-2 border outline-none focus:border-orange-500 text-slate-600">
                        <option value=""></option>
                        <option value=""></option>
                    </select>
                    <select name="" id="" className="w-1/2 p-2 border outline-none focus:border-orange-500 text-slate-600">
                        <option value=""></option>
                        <option value=""></option>
                    </select>
                </div>

            </form>
            </div>
        </div>
    </div>
  )
}

export default ModalAddUser
