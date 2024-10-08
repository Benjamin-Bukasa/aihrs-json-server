import axios from 'axios';

const API_URL = 'http://10.5.0.26:5000/notifications';

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
 * Récupérer toutes les notifications non lues
 * @returns {Promise} - La promesse axios pour la requête GET filtrée par viewed=false
 */
export const getUnreadNotifications = async () => {
  try {
    const response = await axios.get(`${API_URL}?viewed=false`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des notifications non lues:", error);
    throw error;
  }
};

/**
 * Mettre à jour le statut d'une notification
 * @param {string} notificationId - L'ID de la notification à mettre à jour
 * @param {Object} status - L'objet contenant le nouveau statut (par ex. { viewed: true })
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

/**
 * Supprimer une notification
 * @param {string} notificationId - L'ID de la notification à supprimer
 * @returns {Promise} - La promesse axios pour la requête DELETE
 */
export const deleteNotification = async (notificationId) => {
  try {
    const response = await axios.delete(`${API_URL}/${notificationId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de la notification", error);
    throw error;
  }
};
