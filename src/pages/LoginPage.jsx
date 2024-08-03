import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(`Attempting to log in with username: ${username} and password: ${password}`);
      // Obtenez l'utilisateur par nom d'utilisateur
      const response = await axios.get(`http://localhost:5000/users?username=${username}`);
      console.log('Response:', response);
      if (response.data.length > 0) {
        const user = response.data[0];
        // Vérifiez le mot de passe
        if (user.password !== password) {
          alert('Invalid credentials');
          return;
        }
        console.log('User found:', user);
        if (user.mustResetPassword) {
          loginUser(user, rememberMe);
          navigate('/first-time-password-reset');
        } else {
          loginUser(user, rememberMe);
          navigate(user.role === 'admin' ? '/admin-dashboard' : '/dashboard');
        }
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in', error);
      alert('An error occurred while logging in');
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
    <form onSubmit={handleSubmit} className="lg:w-1/4 lg:h-2/4 sm:w-2/4 sm:h-2/3 flex flex-col justify-around items-start gap-1 p-5 bg-white text-slate-600 font-semibold text-[16px] rounded-3xl shadow-custom-light border">
      <h3 className="text-orange-500 font-extrabold text-3xl">Connectez-vous</h3>
      <div className="w-full flex flex-col justify-start items-start gap-1 p-1">
        <label htmlFor="" className="">Nom d'utilisateur</label>
        <input value={username}
          onChange={(e) => setUsername(e.target.value)}
          required type="text" className="w-full h-12 outline outline-1 outline-slate-200 focus:outline-slate-400 hover:outline-1 px-2 py-1 rounded-md"/>
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-1 p-1">
        <label htmlFor="" className="">Mot de passe</label>
        <input value={password}
          onChange={(e) => setPassword(e.target.value)}
          required type="password" className="w-full h-12 outline outline-1 outline-slate-200 focus:outline-slate-400 hover:outline-1 px-2 py-1 rounded-md" />
      </div>
      <p className="w-full flex justify-start items-center gap-2 p-1 ">
        <input type="checkbox" className="" value="check" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}/>
        <label htmlFor="">Se souvenir de moi</label>
      </p>
      <div className="w-full flex justify-center items-center p-1">
        <button type="submit" className=" bg-slate-500 text-white px-8 py-2 rounded-md hover:bg-orange-500 transition ease-in-out">Se connecter</button>
      </div>
      <p className="w-full py-2 px-2 flex items-center justify-center gap-2">
        Mot de passe oublié ?
        <Link to="/reset-password">
        <span className="text-orange-500 font-medium underline underline-offset-1 cursor-pointer">Signaler</span>
        </Link> 
      </p>
    </form>
    </div>
  )
}

export default LoginPage;


