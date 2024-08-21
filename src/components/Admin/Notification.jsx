import React, { useEffect, useState, useContext } from 'react';
import { getNotifications } from '../../../services/notificationService';
import { UserContext } from '../../UserContext'; // Importer le contexte utilisateur

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  
  // Récupérer les données de l'utilisateur à partir du UserContext
  const { role, user, logoutUser, email, firstName, lastName } = useContext(UserContext);

  // Fonction pour récupérer les notifications depuis le serveur
  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications:', error);
    }
  };

  // Fonction pour gérer l'affichage des détails d'une notification
  const handleViewDetails = (notification) => {
    setSelectedNotification(notification);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="w-full p-4 bg-white shadow-custom-light rounded-3xl  mx-auto">
      <h2 className="text-2xl font-bold text-slate-500 mb-4">Notifications</h2>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <div
            key={index}
            className={`notification-item p-4 mb-4 border w-full rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out 
            ${notification.viewed ? 'bg-slate-100 border-slate-400' : 'bg-orange-100 border-orange-400'}`}
          >
            <p className="text-md font-semibold text-slate-500">
              <strong>Action:</strong> {notification.action || 'Inconnu'}
            </p>
            <p className="text-sm text-slate-500">
              <strong>Date:</strong> {notification.date || 'Inconnu'}
            </p>
            <p className="text-sm text-slate-500">
              <strong>Détail:</strong> {notification.message || 'Inconnu'}
            </p>
            {/* <p className="text-sm text-slate-500">
              <strong>Entité:</strong> {notification.entity || 'Inconnu'} (ID: {notification.entityId || 'Inconnu'})
            </p> */}
            <div className="flex justify-between items-center mt-4">
              <button
                className="px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-all"
                onClick={() => handleViewDetails(notification)}
              >
                Voir plus
              </button>
              <span className={`text-xs font-semibold ${notification.viewed ? 'text-slate-500' : 'text-orange-500'}`}>
                {notification.viewed ? 'Déjà vu' : 'Nouveau'}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-slate-500">Aucune notification disponible.</p>
      )}

      {selectedNotification && (
        <div className="mt-6 p-4 bg-slate-100 rounded-lg shadow-inner">
          <h3 className="text-lg font-bold text-slate-500 mb-2">Détails de l'utilisateur</h3>
          <p className="text-sm text-slate-500">
            <strong>Nom complet:</strong> {user?.firstName} {lastName}
          </p>
          <p className="text-sm text-slate-500">
            <strong>Email:</strong> {user?.email || 'Inconnu'}
          </p>
          <p className="text-sm text-slate-500">
            <strong>Rôle:</strong> {user?.role || 'Inconnu'}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-slate-400 text-white rounded-lg hover:bg-slate-500 transition-all"
            onClick={() => setSelectedNotification(null)}
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
};

export default Notification;
