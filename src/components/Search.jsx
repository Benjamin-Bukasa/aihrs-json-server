import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import FiSearch from 'FiSearch/fi'

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const results = [];
      const arrays = ['users', 'admin', 'employee', 'global-tracking'];
      for (const array of arrays) {
        const response = await axios.get(`http://localhost:5000/${array}?q=${searchTerm}`);
        results.push(...response.data);
      }
      console.log(results);
      navigate('/search-results', { state: { results } });
    } catch (error) {
      console.error('Error searching data', error);
    }
  };

  return (
    <form className="relative md:w-65">
                <span className="relative md:absolute inset-y-0 left-0 flex items-center pl-2">
                    <button className="p-1 focus:outline-none" onClick={handleSearch}><FiSearch size={20} color='gray'/></button>
                </span>
                <input type="search" className="w-full px-4 py-2 pl-12 rounded shadow outline-none hidden md:block text-slate-600" placeholder='Recherche' onChange={(e)=>setSearchTerm(e.target.value)}/>
    </form>
  );
}

export default Search;
