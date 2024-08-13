import React, { useState } from 'react';
// import { FaArrowRightToCity, FaPlusCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';

const MadResume = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    name: '',
    gender: '',
    category: '',
    status: '',
    createdAt: '',
    placeOfBirth: '',
    dateOfBirth: '',
    matrimonial: '',
    children: '',
    adress: '',
    userProfile: '',
    manager: '',
    hrbp: '',
    supervisor: '',
    typeAffectation: '',
    company: '',
    function: '',
    dateOfAffectation: '',
    typeContract: '',
    startContract: '',
    endContract: '',
    renewContract: '',
    netSalary: '',
    location: '',
    cnss: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/entries', formData);
      setShowModal(false);
      // Optionnel : ajouter une logique pour rafraîchir la liste des employés ou afficher une notification
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'employé:", error);
    }
  };

  return (
    <div className='lg:w-1/3 h-full flex flex-col justify-start items-start shadow-custom-light bg-white text-zinc-500 rounded-3xl overflow-hidden sm:w-full border'>
      <div className="w-full h-1/2 flex justify-between items-center px-8 py-2 bg-gray-100 ">
        <Link to={'/usersList'} className='w-2/3 flex justify-start items-center gap-2'>
          <span className="p-2 bg-white rounded-lg">
            {/* <FaArrowRightToCity size={25} /> */}
          </span>
          <p className="font-medium text-lg text-gray-500">Total AMAD</p>
        </Link>
        <p className=" p-2 bg-gray-200 text-gray-500 w-20 text-end rounded-3xl font-bold text-lg ">0</p>
      </div>
      <div className="w-full h-1/2 px-8 py-2 bg-white">
        <div className="divide-y">
          <p className="py-2 flex justify-between items-center">
            <span className="text-slate-600 font-semibold">Ajouter un nouvel agent</span>
            <button
              className='flex items-center justify-between gap-2 p-2 bg-[#e37e43] hover:bg-[#e75503] rounded-3xl text-white font-semibold'
              onClick={() => setShowModal(true)}
            >
              {/* <FaPlusCircle />  */}
              Créer
            </button>
          </p>
          <p className="py-2 flex justify-between items-center">
            <span className="text-slate-600 font-semibold">Date du dernier enregistrement</span>
            <span className="">{new Date().toLocaleString()}</span>
          </p>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-6xl w-full">
            <h2 className="text-xl font-bold text-slate-500 mb-4">Ajouter un nouvel agent</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-500">ID</label>
                  <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-500">Prénom</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-500">Nom</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-500">Genre</label>
                  <input
                    type="text"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-500">Catégorie</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-500">Statut</label>
                  <input
                    type="text"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-500">Date de création</label>
                  <input
                    type="date"
                    name="createdAt"
                    value={formData.createdAt}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-500">Lieu de naissance</label>
                  <input
                    type="text"
                    name="placeOfBirth"
                    value={formData.placeOfBirth}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-500">Date de naissance</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-500">État civil</label>
                  <input
                    type="text"
                    name="matrimonial"
                    value={formData.matrimonial}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-500">Nombre d'enfants</label>
                  <input
                    type="number"
                    name="children"
                    value={formData.children}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-500">Adresse</label>
                  <input
                    type="text"
                    name="adress"
                    value={formData.adress}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-500">Profil utilisateur</label>
                  <input
                    type="text"
                    name="userProfile"
                    value={formData.userProfile}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-500">Manager</label>
                  <input
                    type="text"
                    name="manager"
                    value={formData.manager}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-500">HRBP</label>
                  <input
                    type="text"
                    name="hrbp"
                    value={formData.hrbp}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-500">Superviseur</label>
                  <input
                    type="text"
                    name="supervisor"
                    value={formData.supervisor}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-500">Type d'affectation</label>
                  <input
                    type="text"
                    name="typeAffectation"
                    value={formData.typeAffectation}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-500">Entreprise</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-500">Fonction</label>
                  <input
                    type="text"
                    name="function"
                    value={formData.function}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-500">Date d'affectation</label>
                  <input
                    type="date"
                    name="dateOfAffectation"
                    value={formData.dateOfAffectation}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-500">Type de contrat</label>
                  <input
                    type="text"
                    name="typeContract"
                    value={formData.typeContract}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-500">Début du contrat</label>
                  <input
                    type="date"
                    name="startContract"
                    value={formData.startContract}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-500">Fin du contrat</label>
                  <input
                    type="date"
                    name="endContract"
                    value={formData.endContract}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-500">Renouvellement du contrat</label>
                  <input
                    type="text"
                    name="renewContract"
                    value={formData.renewContract}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-500">Salaire net</label>
                  <input
                    type="number"
                    name="netSalary"
                    value={formData.netSalary}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-500">Localisation</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-500">CNSS</label>
                  <input
                    type="text"
                    name="cnss"
                    value={formData.cnss}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-400 text-white rounded-lg"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MadResume;
