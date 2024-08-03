import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';



function Employee() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get('http://localhost:5000/entries')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous supprimer cet élément?")) {
      axios.delete(`http://localhost:500/entries/${id}`)
        .then(response => {
          setData(data.filter(item => item.id !== id));
        })
        .catch(error => {
          console.error('There was an error deleting the item!', error);
        });
    }
  };

  const handleEdit = (entries) => {
    // Implémenter la logique d'édition ici
    console.log('Edit:', entries);
  };

  const filteredData = data
    .filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
    .filter(item => category === "" || item.gender === category);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const currentData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="App bg-white text-slate-500 p-4">
      <div className="flex flex-col md:flex-row mb-4 space-y-2 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Recherche..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-1/4 p-2 border border-gray-300 rounded"
        />
        <select onChange={(e) => setCategory(e.target.value)} value={category} className="p-2 border border-gray-300 rounded">
          <option value="">Toute les catégories</option>
          <option value="cdd">CDD</option>
          <option value="cdi">CDI</option>
          <option value="prestation">PRESTATION</option>
          {/* Ajoutez d'autres catégories ici */}
        </select>
        <select onChange={(e) => setPageSize(Number(e.target.value))} value={pageSize} className="p-2 border border-gray-300 rounded">
          <option value={5}>5</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={200}>200</option>
          <option value={500}>500</option>
          <option value={data.length}>All</option>
        </select>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-slate-400 text-white text-left sticky top-0 z-20">
            <th className="p-2">ID</th>
            <th className="p-2">Nom</th>
            <th className="p-2">Postnom</th>
            <th className="p-2">Prénom</th>
            <th className="p-2">gender</th>
            <th className="p-2">Manager</th>
            <th className="p-2">Superviseur</th>
            <th className="p-2">Lieu d'affectation</th>
            <th className="p-2">Status</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id} className="hover:bg-gray-100 ">
              <td className="p-2 border-b">{item.id}</td>
              <td className="p-2 border-b">{item.name}</td>
              <td className="p-2 border-b">{item.postnom}</td>
              <td className="p-2 border-b">{item.prenom}</td>
              <td className="p-2 border-b">{item.gender}</td>
              <td className="p-2 border-b">{item.manager}</td>
              <td className="p-2 border-b">{item.superviseur}</td>
              <td className="p-2 border-b">{item.location}</td>
              <td className="p-2 border-b">
                {item.status ? (
                  <span className="px-4 py-1 bg-green-400 rounded-xl text-white font-semibold">Actif</span>
                ) : (
                  <span className="px-4 py-1 bg-red-400 rounded-xl text-white font-semibold">Inactif</span>
                )}
              </td>
              <td className="flex justify-around p-4 border-b">
                <FaEdit className="text-green-500 hover:text-orange-500 cursor-pointer mr-2" onClick={() => handleEdit(item)} />
                <FaTrash className="text-red-500 hover:text-orange-500 cursor-pointer" onClick={() => handleDelete(item.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between sticky bottom-0 z-20 bg-slate-400 text-white py-3 px-1 font-semibold w-full">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Précédent
        </button>
        <span>
          Page{' '}
          <strong>
            {currentPage} de {totalPages}
          </strong>
        </span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Suivant
        </button>
      </div>
    </div>
  );
}

export default Employee;
