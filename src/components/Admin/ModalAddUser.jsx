import { useState } from "react";
import { MdClose } from "react-icons/md";

const ModalAddUser = ({ visible, onClose }) => {
  const handleClose = (e) => {
    if (e.target.id === "container") onClose();
  };
  if (!visible) return null;

  return (
    <div
      id="container"
      onClick={handleClose}
      className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-40 sm:h-full  shadow-custom z-30 flex justify-center items-center ease-in-out"
    >
      <div className=" lg:w-2/4  sm:w-3/4 sm:h-[90%] md:h-[80%] flex flex-col md:justify-around sm:justify-around gap-1 bg-white rounded-lg shadow-custom-light p-4">
        <div className="w-full flex justify-end items-center px-0 py-2 ">
          <button
            onClick={onClose}
            className="rounded-full bg-slate-200 p-2 hover:bg-red-600 hover:text-white"
          >
            <MdClose size={20} />
          </button>
        </div>
        <div className="w-full h-screen flex flex-col gap-2 p-2">
          <h3 className="w-full text-center text-3xl font-bold text-orange-500">
            Ajouter un nouvel utilisateur
          </h3>
          <form
            action=""
            className="w-full h-full flex flex-col justify-start gap-8 items-start px-1 py-4"
          >
            <div className="w-full flex justify-between items-center gap-1">
              <input
                type="text"
                className="w-1/3 p-2 border outline-none focus:border-orange-500"
                placeholder="Nom de l'utilisateur"
              />
              <input
                type="text"
                className="w-1/3 p-2 border outline-none focus:border-orange-500"
                placeholder="Post-nom de l'utilisateur"
              />
              <input
                type="text"
                className="w-1/3 p-2 border outline-none focus:border-orange-500"
                placeholder="Prénom de l'utilisateur"
              />
            </div>
            <div className="w-full flex justify-between items-center gap-1">
              <input
                type="date"
                className="w-1/2 p-2 border outline-none focus:border-orange-500"
                placeholder="Date de naissance"
              />
              <select
                name=""
                id=""
                className="w-1/2 p-2 border outline-none focus:border-orange-500 text-slate-600"
              >
                <option value="" className="">
                  Choisir genre
                </option>
                <option value="">Homme</option>
                <option value="">Femme</option>
              </select>
            </div>
            <div className="w-full flex justify-between items-center gap-1">
              <input
                type="email"
                className="w-full p-2 border outline-none focus:border-orange-500"
                placeholder="Adresse email de l'utilisateur"
              />
            </div>
            <div className="w-full flex justify-between items-center gap-1">
              <select
                name=""
                id=""
                className="w-1/2 p-2 border outline-none focus:border-orange-500 text-slate-600"
              >
                <option value="">Service/Dept. de l'utilisateur</option>
                <option value="">Outsourcing</option>
                <option value="">Payroll</option>
                <option value="">IT</option>
                <option value="">Direction Générale</option>
                <option value="">Co-Dir</option>
                <option value="">Payroll</option>
              </select>
              <select
                name=""
                id=""
                className="w-1/2 p-2 border outline-none focus:border-orange-500 text-slate-600"
              >
                <option value="">Poste de l'utilisateur</option>
                <option value="OD">OD</option>
                <option value="OM">OM</option>
                <option value="DG">DG</option>
                <option value="HRBP_HQ">HRBP HQ</option>
                <option value="HRBP_OUT">HRBP OUT</option>
                <option value="PAYROLL">Payroll</option>
                <option value="IT">IT</option>
                <option value="CODIR">Co-Dir</option>
                <option value="AUTRE">Autre</option>
              </select>
            </div>
            <div className="w-full flex justify-between items-center gap-1">
              <select
                name=""
                id=""
                className="w-1/2 p-2 border outline-none focus:border-orange-500 text-slate-600"
              >
                <option value="">Rôle</option>
                <option value="">Administrateur</option>
                <option value="">Utilisateur</option>
                <option value="">Observateur</option>
              </select>
              <select
                name=""
                id=""
                className="w-1/2 p-2 border outline-none focus:border-orange-500 text-slate-600"
              >
                <option value="">Lieu de travail</option>
                <option value="">HQ</option>
                <option value="">Out-Office</option>
              </select>
            </div>
            <div className="w-full flex justify-between items-center gap-1">
              <input
                type="text"
                className="w-1/2 p-2 border outline-none focus:border-orange-500"
                placeholder="Créer un mot de passe"
              />
              <input
                type="text"
                className="w-1/2 p-2 border outline-none focus:border-orange-500"
                placeholder="Confirmer mot de passe"
              />
            </div>
            <div className="w-full flex justify-center items-center gap-4">
              <button className="px-4 py-2 border border-slate-400 bg-slate-500 hover:bg-slate-600 ease-in-out hover:ease-in-out delay-100 text-white font-semibold w-1/3 rounded-lg ">
                Créer
              </button>
              <button className="px-4 py-2 border border-gray-100 hover:bg-gray-200 bg-gray-50 text-slate-500 font-semibold w-1/3 ease-in-out hover:ease-in-out delay-100 hover:delay-100 rounded-lg ">
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalAddUser;
