import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

function ProfilePage() {
  const { user, loginUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setProfilePhoto(user.profilePhoto || null);
    }
  }, [user]);

  const handlePhotoChange = (e) => {
    setProfilePhoto(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert('New passwords do not match');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:3000/users?username=${user.username}&password=${currentPassword}`);
      if (response.data.length > 0) {
        const updatedUser = response.data[0];
        updatedUser.username = username;
        updatedUser.profilePhoto = profilePhoto;
        updatedUser.password = newPassword || updatedUser.password;

        await axios.put(`http://localhost:3000/users/${updatedUser.id}`, updatedUser);
        loginUser(updatedUser, true); // Update context and persist in local storage
        alert('Profile updated successfully');
      } else {
        alert('Invalid current password');
      }
    } catch (error) {
      console.error('Error updating profile', error);
      alert('An error occurred while updating the profile');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-sm">
      <h1 className="text-3xl font-semibold mb-6 text-slate-700">Profile</h1>
      <form onSubmit={handleSubmit}>
        
        {/* Champ pour la photo de profil */}
        <div className="mb-8 flex items-center">
          <label className="block text-sm font-medium text-slate-700 w-32">Votre photo</label>
          <div className="flex items-center">
            <img
              src={profilePhoto || 'https://via.placeholder.com/80'} // Placeholder si pas de photo
              alt="Profile"
              className="w-24 h-24 rounded-full mr-4"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="text-sm text-slate-600"
            />
          </div>
        </div>

        {/* Champ pour le nom d'utilisateur */}
        <div className="mb-8 flex items-center">
          <label className="block text-sm font-medium text-slate-700 w-32">Nom d'utilisateur</label>
          <div className="flex-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 bg-slate-100 text-slate-500 text-sm">
              Nom d'utilisateur
            </span>
            <input
              type="text"
              className="flex-1 min-w-0 block w-full px-4 py-3 rounded-none rounded-r-md border border-slate-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Champ pour le mot de passe actuel */}
        <div className="mb-8 flex items-center">
          <label className="block text-sm font-medium text-slate-700 w-32">Mot de passe actuel</label>
          <input
            type="password"
            className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>

        {/* Champ pour le nouveau mot de passe */}
        <div className="mb-8 flex items-center">
          <label className="block text-sm font-medium text-slate-700 w-32">Nouveau mot de passe</label>
          <input
            type="password"
            className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        {/* Champ pour confirmer le nouveau mot de passe */}
        <div className="mb-8 flex items-center">
          <label className="block text-sm font-medium text-slate-700 w-32">Confirmer le nouveau mot de passe</label>
          <input
            type="password"
            className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>

        {/* Bouton de soumission */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Mettre à jour le profil
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfilePage;
