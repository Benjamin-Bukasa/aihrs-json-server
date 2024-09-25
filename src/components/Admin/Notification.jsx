import React, { useEffect, useState, useContext } from 'react';
import { getNotifications, updateNotificationStatus } from '../../../services/notificationService';
import { UserContext } from '../../UserContext';
import Modal from 'react-modal';
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

Modal.setAppElement('#root');

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [notificationsPerPage] = useState(5);

  const { user, role, email, firstName, lastName } = useContext(UserContext);

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    filterNotifications();
  }, [searchTerm, notifications]);

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Charger les notifications vues depuis localStorage
      const viewedNotifications = JSON.parse(localStorage.getItem(`viewedNotifications_${user.id}`)) || {};

      const updatedNotifications = sortedData.map(notification => {
        // Si notification non vue dans la session actuelle, la marquer comme non vue même si viewed est true
        if (viewedNotifications[notification.id]) {
          return { ...notification, viewed: true };
        } else {
          return { ...notification, viewed: false };
        }
      });

      setNotifications(updatedNotifications);
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications:', error);
    }
  };

  const handleViewDetails = (notification) => {
    setSelectedNotification(notification);

    // Si la notification n'a pas été vue, mettre à jour l'état et stocker dans localStorage
    if (!notification.viewed) {
      updateNotificationStatus(notification.id, { viewed: true })
        .then(() => {
          setNotifications(prevNotifications =>
            prevNotifications.map(notif =>
              notif.id === notification.id ? { ...notif, viewed: true } : notif
            )
          );
          
          // Sauvegarder l'état vu dans localStorage
          const viewedNotifications = JSON.parse(localStorage.getItem(`viewedNotifications_${user.id}`)) || {};
          viewedNotifications[notification.id] = true;
          localStorage.setItem(`viewedNotifications_${user.id}`, JSON.stringify(viewedNotifications));
        })
        .catch(error => console.error('Erreur lors de la mise à jour de la notification:', error));
    }
  };

  const filterNotifications = () => {
    const filtered = notifications.filter(notification =>
      (notification.action && notification.action.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (notification.message && notification.message.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredNotifications(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
  const currentNotifications = filteredNotifications.slice(indexOfFirstNotification, indexOfLastNotification);
  const totalPages = Math.ceil(filteredNotifications.length / notificationsPerPage);

  const closeModal = () => {
    setSelectedNotification(null);
  };

  return (
    <div className="w-full p-4 bg-white shadow-custom-light rounded-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-slate-500">Notifications</h2>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border rounded-lg p-2 outline-none"
          />
          <FaSearch className="ml-2 text-slate-500" />
        </div>
      </div>

      {currentNotifications.length > 0 ? (
        currentNotifications.map((notification, index) => (
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

      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-slate-500">
          {filteredNotifications.length} Notifications trouvées
        </p>
        <div className="flex items-center">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 text-slate-500 disabled:opacity-50"
          >
            <FaChevronLeft />
          </button>
          <p className="text-sm text-slate-500 mx-4">
            Page {currentPage} sur {totalPages}
          </p>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 text-slate-500 disabled:opacity-50"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {selectedNotification && (
        <Modal
          isOpen={!!selectedNotification}
          onRequestClose={closeModal}
          className="bg-white rounded-lg shadow-xl p-6 mx-auto my-20 w-full max-w-md"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <h3 className="text-lg font-bold text-slate-500 mb-2">Détails de l'utilisateur</h3>
          <p className="text-sm text-slate-500">
            <strong>Nom complet:</strong> {user?.firstName} {user?.lastName}
          </p>
          <p className="text-sm text-slate-500">
            <strong>Email:</strong> {user?.email || 'Inconnu'}
          </p>
          <p className="text-sm text-slate-500">
            <strong>Rôle:</strong> {user?.role || 'Inconnu'}
          </p>
          <p className="text-sm text-slate-500 mt-4">
            <strong>Détails de la notification:</strong> {selectedNotification.message}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-slate-400 text-white rounded-lg hover:bg-slate-500 transition-all"
            onClick={closeModal}
          >
            Fermer
          </button>
        </Modal>
      )}
    </div>
  );
};

export default Notification;
