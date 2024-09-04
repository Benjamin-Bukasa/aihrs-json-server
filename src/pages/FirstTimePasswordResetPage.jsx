import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
// import apiClient from '../api'

function FirstTimePasswordResetPage() {
  const { user, loginUser } = useContext(UserContext);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      setCurrentPassword(user.password); // Préremplir le mot de passe actuel
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    try {
      console.log(`Fetching user: ${user.username}`);
      const response = await axios.get(`http://10.5.0.26:3000/users?username=${user.username}`);
      console.log('Response:', response);
      if (response.data.length > 0) {
        const fetchedUser = response.data[0];
        console.log('Fetched User:', fetchedUser);
        if (fetchedUser.password !== currentPassword) {
          alert('Invalid current password');
          return;
        }

        const updatedUser = { ...fetchedUser, password: newPassword, mustResetPassword: false };
        console.log('Updating user:', updatedUser);
        const putResponse = await axios.put(`http://10.5.0.26:3000/users/${fetchedUser.id}`, updatedUser);
        console.log('PUT Response:', putResponse);
        loginUser(updatedUser, rememberMe);
        alert('Password reset successfully. You are now logged in.');
        navigate(updatedUser.role === 'admin' ? '/admin-dashboard' : '/dashboard');
      } else {
        alert('User not found');
      }
    } catch (error) {
      console.error('Error updating profile', error);
      alert('An error occurred while updating the profile');
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="lg:w-1/4 lg:h-2/4 sm:w-2/4 sm:h-2/3 mx-auto my-auto flex flex-col justify-around items-start gap-1 p-5 bg-white text-slate-600 font-semibold text-[16px] rounded-3xl shadow-custom-light border">
      <h3 className="text-orange-500 font-extrabold text-3xl">Créer votre mot de passe</h3>
      <div className="w-full flex flex-col justify-start items-start gap-1 p-1">
          <label>Current Password:</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required className="w-full h-12 outline outline-1 outline-slate-200 focus:outline-slate-400 hover:outline-1 px-2 py-1 rounded-md" 
          />
        </div>
        <div className="w-full flex flex-col justify-start items-start gap-1 p-1">
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required className="w-full h-12 outline outline-1 outline-slate-200 focus:outline-slate-400 hover:outline-1 px-2 py-1 rounded-md"
          />
        </div>
        <div className="w-full flex flex-col justify-start items-start gap-1 p-1">
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required className="w-full h-12 outline outline-1 outline-slate-200 focus:outline-slate-400 hover:outline-1 px-2 py-1 rounded-md"
          />
        </div>
        <div className="w-full flex justify-start items-center gap-2 p-1 ">
          <label className="w-full flex justify-start items-center gap-2 p-1 ">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember Me
          </label>
        </div>
        <div className="w-full flex justify-center items-center p-1">
        <button type="submit" className="lg:w-1/3 sm:w-3/4 bg-slate-500 text-white px-3 py-2 rounded-md hover:bg-orange-500 transition ease-in-out">Connexion</button>
      </div>
      </form>
    </div>
  );
}

export default FirstTimePasswordResetPage;
