import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import ModalAddUser from './ModalAddUser'; // Assurez-vous que le chemin est correct
import api from '../../api';

const UsersList = ({ currentUser }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await api.get('http://localhost:5000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`http://localhost:5000/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.username !== 'adminIT' &&
      (user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="w-full h-full p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4 text-slate-600">Liste d'utilisateurs</h1>
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-slate-300 rounded-xl outline-none focus:border-orange-500 w-1/3"
        />
        <select
          value={filter}
          onChange={handleFilterChange}
          className="p-2 border border-slate-300 rounded-xl outline-none focus:border-orange-500 w-1/3 text-slate-600"
        >
          <option value="">All Departments</option>
          <option value="Outsourcing">Outsourcing</option>
          <option value="Payroll">Payroll</option>
          <option value="IT">IT</option>
          <option value="Direction Générale">Direction Générale</option>
          <option value="Co-Dir">Co-Dir</option>
        </select>
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 px-4 py-2 bg-slate-500 text-white font-semibold rounded-xl"
      >
        Nouveau +
      </button>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 text-left">Prénom</th>
            <th className="py-2 text-left">Nom</th>
            <th className="py-2 text-left">Email</th>
            <th className="py-2 text-left">Département</th>
            <th className="py-2 text-left">Position</th>
            <th className="py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers
            .filter((user) => (filter ? user.department === filter : true))
            .map((user) => (
              <tr key={user.id}>
                <td className="py-2 text-left">{user.firstName}</td>
                <td className="py-2 text-left">{user.lastName}</td>
                <td className="py-2 text-left">{user.email}</td>
                <td className="py-2 text-left">{user.department}</td>
                <td className="py-2 text-left">{user.position}</td>
                <td className="py-2 text-left">
                  <button className="text-blue-500 hover:text-blue-700 mr-2">
                    <FaEdit />
                  </button>
                  {currentUser === 'adminIT' && (
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {isModalOpen && (
        <ModalAddUser visible={isModalOpen} onClose={() => setIsModalOpen(false)} onAddUser={fetchUsers} />
      )}
    </div>
  );
};

export default UsersList;
