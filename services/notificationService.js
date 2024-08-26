import axios from 'axios';

const API_URL = 'http://localhost:3000/notifications';

/**
 * Créer une nouvelle notification
 * @param {Object} notification - L'objet notification à créer
 * @returns {Promise} - La promesse axios pour la requête POST
 */
export const createNotification = async (notification) => {
  try {
    const response = await axios.post(API_URL, notification);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de la notification", error);
    throw error;
  }
};

/**
 * Récupérer toutes les notifications
 * @returns {Promise} - La promesse axios pour la requête GET
 */
export const getNotifications = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des notifications", error);
    throw error;
  }
};

/**
 * Mettre à jour le statut d'une notification
 * @param {string} notificationId - L'ID de la notification à mettre à jour
 * @param {Object} status - L'objet contenant le nouveau statut
 * @returns {Promise} - La promesse axios pour la requête PATCH
 */
export const updateNotificationStatus = async (notificationId, status) => {
  try {
    const response = await axios.patch(`${API_URL}/${notificationId}`, status);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la notification", error);
    throw error;
  }
};
