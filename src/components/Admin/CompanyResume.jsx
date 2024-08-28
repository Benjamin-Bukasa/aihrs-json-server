import React, { useState } from 'react';
// import { FaArrowRightToCity, FaPlusCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';
import db from '../../../db.json'

const CompanyResume = () => {
  const data = db.notifications[0].date
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    clientAddress: '',
    dgName: '',
    drhName: '',
    contract: '',
    contractType: '',
    madAgents: '',
    contractStart: '',
    contractEnd: '',
    phoneNumber: '',
    email: ''
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
      await axios.post('http://localhost:3000/clients', formData);
      setShowModal(false);
      // Optionnel : ajouter une logique pour rafraîchir la liste des clients ou afficher une notification
    } catch (error) {
      console.error("Erreur lors de l'ajout du client:", error);
    }
  };

  return (
    <div className='lg:w-1/3 h-full flex flex-col justify-start items-start shadow-custom-light text-slate-500 rounded-3xl overflow-hidden sm:w-full border'>
      <div className="w-full h-1/2 flex justify-between items-center px-8 py-2 bg-gray-100">
        <Link to={'/clientsList'} className='w-2/3 flex justify-start items-center gap-2 '>
          <span className="p-2 bg-white rounded-lg">
            {/* <FaArrowRightToCity size={25} /> */}
          </span>
          <p className="font-medium text-lg text-slate-500">Clients</p>
        </Link>
        <p className="p-2 bg-gray-200 text-slate-500 w-20 text-end rounded-3xl font-bold text-lg">0</p>
      </div>
      <div className="w-full h-1/2 px-8 py-2 bg-white">
        <div className="divide-y">
          <p className="py-2 flex justify-between items-center">
            <span className="font-semibold">Ajouter une nouvelle Entreprise</span>
            <button
              className='flex items-center justify-between gap-2 p-2 bg-orange-500 hover:bg-orange-600 rounded-3xl text-white font-semibold'
              onClick={() => setShowModal(true)}
            >
              {/* <FaPlusCircle /> */}
              Créer
            </button>
          </p>
          <p className="py-2 flex justify-between items-center">
            <span className="font-normal">Date de la dernière modification</span>
            <span className="">{data}</span>
          </p>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold text-slate-500 mb-4">Ajouter un nouveau client</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-500">Nom du client</label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-500">Adresse du client</label>
                  <input
                    type="text"
                    name="clientAddress"
                    value={formData.clientAddress}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-500">Nom du DG</label>
                  <input
                    type="text"
                    name="dgName"
                    value={formData.dgName}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-500">Nom de la DRH</label>
                  <input
                    type="text"
                    name="drhName"
                    value={formData.drhName}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-500">Contrat avec le client</label>
                  <input
                    type="text"
                    name="contract"
                    value={formData.contract}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-500">Type de contrat</label>
                  <input
                    type="text"
                    name="contractType"
                    value={formData.contractType}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-500">Effectif Agents MAD</label>
                  <input
                    type="number"
                    name="madAgents"
                    value={formData.madAgents}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-500">Numéro de téléphone</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-500">Date de début de contrat</label>
                  <input
                    type="date"
                    name="contractStart"
                    value={formData.contractStart}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-500">Date de fin de contrat</label>
                  <input
                    type="date"
                    name="contractEnd"
                    value={formData.contractEnd}
                    onChange={handleChange}
                    className="w-full p-2 border border-slate-400 rounded-lg"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-500">Adresse e-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-slate-400 rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
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

export default CompanyResume;