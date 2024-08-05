import React, { useContext, useState, useEffect } from 'react';
// import axios from 'axios';
import api from '../api';
import { UserContext } from '../UserContext';

function ProfilePage() {
  const { user, loginUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert('New passwords do not match');
      return;
    }
    try {
      const response = await api.get(`http://localhost:5000/users?username=${user.username}&password=${currentPassword}`);
      if (response.data.length > 0) {
        const updatedUser = response.data[0];
        updatedUser.username = username;
        updatedUser.password = newPassword || updatedUser.password;

        await api.put(`http://localhost:5000/users/${updatedUser.id}`, updatedUser);
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-slate-600">Editer mon Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-slate-600">Nom d'utilisateur</label>
          <input
            type="text"
            className="w-full p-2 border border-slate-300 rounded-xl outline-none focus:border-slate-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-slate-600">Current Password:</label>
          <input
            type="password"
            className="w-full p-2 border border-slate-300 rounded-xl outline-none focus:border-slate-500"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-slate-600">New Password:</label>
          <input
            type="password"
            className="w-full p-2 border border-slate-300 rounded-xl outline-none focus:border-slate-500"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-slate-600">Confirm New Password:</label>
          <input
            type="password"
            className="w-full p-2 border border-slate-300 rounded-xl outline-none focus:border-slate-500"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default ProfilePage;
