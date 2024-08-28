import { useState, useContext } from "react";
import { HiUsers } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import { FaPlusCircle } from "react-icons/fa";
import ModalAddUser from "./ModalAddUser";
import { createNotification } from '../../../services/notificationService'; // Import du service de notification
import { UserContext } from '../../UserContext'; // Import du contexte 
import db from "../../../db.json"

const UsersResume = () => {
  const infoData = db.notifications[0].date
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(UserContext); // Récupération de l'utilisateur connecté
  const handleClose = () => setShowModal(false);

  // Fonction de callback pour la création de l'utilisateur
  const handleUserCreated = async (newUser) => {
    try {
      // Créer une notification après la création de l'utilisateur
      await createNotification({
        message: `Utilisateur ${newUser.name} créé par ${user.username}`,
        action: 'Créer',
        entity: 'User',
        entityId: newUser.id,
        date: new Date().toLocaleString(),
      });
    } catch (error) {
      console.error('Erreur lors de la création de la notification:', error);
    }
    setShowModal(false); // Fermer le modal après création
  };

  return (
    <>
      <div className='lg:w-1/3 h-full flex flex-col justify-start items-start shadow-custom-light bg-white text-zinc-500 rounded-3xl overflow-hidden sm:w-full border'>
        <div className="w-full h-1/2 flex justify-between items-center px-8 py-2 bg-gray-100">
          <Link to={'/usersList'} className='w-2/3 flex justify-start items-center gap-2'>
            <span className="p-2 bg-white rounded-lg">
              <HiUsers size={25} />
            </span>
            <p className="font-medium text-lg text-gray-500">Utilisateurs</p>
          </Link>
          <p className="p-2 bg-gray-200 text-gray-500 w-20 text-end rounded-3xl font-bold text-lg">0</p>
        </div>
        <div className="w-full h-1/2 px-8 py-2 bg-white">
          <div className="divide-y">
            <p className="py-2 flex justify-between items-center">
              <span className="text-slate-600 font-semibold">Ajouter un nouvel utilisateur</span>
              <button onClick={() => setShowModal(true)} className='flex items-center justify-between gap-2 p-2 bg-[#e37e43] hover:bg-[#e75503] rounded-3xl text-white font-semibold'>
                <FaPlusCircle /> Créer
              </button>
            </p>
            <p className="py-2 flex justify-between items-center">
              <span className="text-slate-600 font-semibold">Date de la dernière modification</span>
              <span>{infoData}</span>
            </p>
          </div>
        </div>
        <ModalAddUser onClose={handleClose} visible={showModal} onUserCreated={handleUserCreated} />
      </div>
    </>
  );
};

export default UsersResume;
