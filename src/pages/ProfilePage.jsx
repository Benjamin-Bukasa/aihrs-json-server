import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
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
      const response = await axios.get(`http://localhost:5000/users?username=${user.username}&password=${currentPassword}`);
      if (response.data.length > 0) {
        const updatedUser = response.data[0];
        updatedUser.username = username;
        updatedUser.password = newPassword || updatedUser.password;

        await axios.put(`http://localhost:5000/users/${updatedUser.id}`, updatedUser);
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
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Current Password:</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default ProfilePage;
