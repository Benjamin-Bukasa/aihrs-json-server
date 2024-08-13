import { useState } from "react";
import axios from "axios";
import { MdClose } from "react-icons/md";


const ModalAddUser = ({ visible, onClose, onAddUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    middleName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    department: '',
    position: '',
    role: '',
    workLocation: '',
    password: '',
    confirmPassword: '',
  });

  const handleClose = (e) => {
    if (e.target.id === "container") onClose();
  };
  
  if (!visible) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      await axios.post('http://localhost:3000/users', {
        username: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        middleName: formData.middleName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        email: formData.email,
        department: formData.department,
        position: formData.position,
        role: formData.role,
        workLocation: formData.workLocation,
        password: formData.password,
      });
      alert('Utilisateur ajouté avec succès');
      onAddUser();  // Appelle la fonction pour actualiser la liste des utilisateurs
      onClose();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur', error);
      alert('Une erreur est survenue lors de l\'ajout de l\'utilisateur');
    }
  };

  return (
    <div
      id="container"
      onClick={handleClose}
      className="fixed inset-[-10%] m-auto backdrop-blur-sm bg-black bg-opacity-60 sm:h-full shadow-custom z-30 flex justify-center items-center ease-in-out"
    >
      <div className=" flex flex-col h-3/4 gap-1 bg-white rounded-lg shadow-custom-light p-4">
        <div className="w-full flex justify-end items-center px-0 py-2 ">
          <button
            onClick={onClose}
            className="rounded-full bg-slate-200 p-2 hover:bg-red-600 hover:text-white"
          >
            <MdClose size={20} />
          </button>
        </div>
        <div className="w-full h-screen flex flex-col gap-2 p-2">
          <h3 className="w-full text-center text-3xl font-bold text-orange-500">
            Ajouter un nouvel utilisateur
          </h3>
          <form
            onSubmit={handleSubmit}
            className="w-full h-full flex flex-col justify-start gap-8 items-start px-1 py-4"
          >
            <div className="w-full flex justify-between items-center gap-1">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 border outline-none focus:border-orange-500"
                placeholder="Nom d'utilisateur"
                required
              />
            </div>
            <div className="w-full flex justify-between items-center gap-1">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-1/3 p-2 border outline-none focus:border-orange-500"
                placeholder="Nom de l'utilisateur"
                required
              />
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className="w-1/3 p-2 border outline-none focus:border-orange-500"
                placeholder="Post-nom de l'utilisateur"
                required
              />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-1/3 p-2 border outline-none focus:border-orange-500"
                placeholder="Prénom de l'utilisateur"
                required
              />
            </div>
            <div className="w-full flex justify-between items-center gap-1">
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-1/2 p-2 border outline-none focus:border-orange-500"
                required
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-1/2 p-2 border outline-none focus:border-orange-500 text-slate-600"
                required
              >
                <option value="">Choisir genre</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
              </select>
            </div>
            <div className="w-full flex justify-between items-center gap-1">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border outline-none focus:border-orange-500"
                placeholder="Adresse email de l'utilisateur"
                required
              />
            </div>
            <div className="w-full flex justify-between items-center gap-1">
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-1/2 p-2 border outline-none focus:border-orange-500 text-slate-600"
                required
              >
                <option value="">Service/Dept. de l'utilisateur</option>
                <option value="Outsourcing">Outsourcing</option>
                <option value="Payroll">Payroll</option>
                <option value="IT">IT</option>
                <option value="Direction Générale">Direction Générale</option>
                <option value="Co-Dir">Co-Dir</option>
              </select>
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-1/2 p-2 border outline-none focus:border-orange-500 text-slate-600"
                required
              >
                <option value="">Poste de l'utilisateur</option>
                <option value="OD">OD</option>
                <option value="OM">OM</option>
                <option value="DG">DG</option>
                <option value="HRBP_HQ">HRBP HQ</option>
                <option value="HRBP_OUT">HRBP OUT</option>
                <option value="PAYROLL">Payroll</option>
                <option value="IT">IT</option>
                <option value="CODIR">Co-Dir</option>
                <option value="AUTRE">Autre</option>
              </select>
            </div>
            <div className="w-full flex justify-between items-center gap-1">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-1/2 p-2 border outline-none focus:border-orange-500 text-slate-600"
                required
              >
                <option value="">Rôle</option>
                <option value="admin">Administrateur</option>
                <option value="utilisateur">Utilisateur</option>
              </select>
              <select
                name="workLocation"
                value={formData.workLocation}
                onChange={handleChange}
                className="w-1/2 p-2 border outline-none focus:border-orange-500 text-slate-600"
                required
              >
                <option value="">Lieu de travail</option>
                <option value="HQ">HQ</option>
                <option value="Out-Office">Out-Office</option>
              </select>
            </div>
            <div className="w-full flex justify-between items-center gap-1">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-1/2 p-2 border outline-none focus:border-orange-500"
                placeholder="Créer un mot de passe"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-1/2 p-2 border outline-none focus:border-orange-500"
                placeholder="Confirmer mot de passe"
                required
              />
            </div>
            <div className="w-full flex justify-center items-center gap-4">
              <button
                type="submit"
                className="px-4 py-2 border border-slate-400 bg-slate-500 hover:bg-slate-600 ease-in-out hover:ease-in-out delay-100 text-white font-semibold w-1/3 rounded-lg"
              >
                Créer
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-100 hover:bg-gray-200 bg-gray-50 text-slate-500 font-semibold w-1/3 ease-in-out hover:ease-in-out delay-100 hover:delay-100 rounded-lg"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalAddUser;
