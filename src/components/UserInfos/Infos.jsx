import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import placeholder from '../../../uploads/placeholder.png';
import { createNotification } from '../../../services/notificationService'; // Importer le service de notification
import { UserContext } from '../../UserContext'; // Importer le contexte utilisateur

const Infos = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [modalField, setModalField] = useState('');
  const [modalValue, setModalValue] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [agent, setAgent] = useState(null);
  const { user, email, firstName, lastName } = useContext(UserContext); // Utiliser les informations de l'utilisateur depuis le contexte

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/entries`);
        const foundAgent = response.data.find((agent) => agent.name === name);
        setAgent(foundAgent);
      } catch (error) {
        console.error("Erreur lors du chargement des données de l'agent:", error);
      }
    };
    fetchAgent();
  }, [name]);

  const handleOpenModal = (field, value) => {
    setModalField(field);
    setModalValue(value);
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSaveField = async () => {
    if (!agent) return;

    let updatedAgent;

    if (modalField === 'userProfile.image' && selectedFile) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');

        updatedAgent = {
          ...agent,
          userProfile: {
            ...agent.userProfile,
            image: `data:image/png;base64,${base64String}`,
          },
        };

        try {
          await axios.put(`http://localhost:3000/entries/${agent.id}`, updatedAgent, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          setAgent(updatedAgent);
          setShowModal(false);
          await createNotification({
            message: `Photo de profil mise à jour pour ${agent.name}.`,
            action: 'Mettre à jour',
            entity: 'Agent',
            entityId: agent.id,
            date: new Date().toLocaleString(),
            userId: user.id,
          });
        } catch (error) {
          console.error("Erreur lors de la mise à jour de l'image:", error);
        }
      };
      reader.readAsDataURL(selectedFile);
    } else {
      updatedAgent = { ...agent, [modalField]: modalValue };

      try {
        await axios.put(`http://localhost:3000/entries/${agent.id}`, updatedAgent, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setAgent(updatedAgent);
        setShowModal(false);

        if (modalField === 'name') {
          navigate(`/${modalValue}`);
        }

        await createNotification({
          message: `Information "${modalField}" mise à jour pour ${agent.name}.`,
          action: 'Mettre à jour',
          entity: 'Agent',
          entityId: agent.id,
          date: new Date().toLocaleString(),
          userId: user.id,
        });
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'information:", error);
      }
    }
  };

  const handleArchiveAgent = async () => {
    if (!agent) return;

    try {
      // Ajouter l'agent dans la section "archive"
      await axios.post(`http://localhost:3000/archives`, agent, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Supprimer l'agent de la section "entries"
      await axios.delete(`http://localhost:3000/entries/${agent.id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Créer une notification pour l'archivage de l'agent
      await createNotification({
        message: `Agent ${agent.name} archivé.`,
        action: 'Archiver',
        entity: 'Agent',
        entityId: agent.id,
        date: new Date().toLocaleString(),
        userId: user.id,
      });

      // Rediriger vers "/global-tracking"
      navigate('/global-tracking');
    } catch (error) {
      console.error("Erreur lors de l'archivage de l'agent:", error);
    }
  };

  if (!agent) {
    return <div>Chargement des informations...</div>;
  }

  return (
    <div className='w-full flex px-2 py-2 bg-white'>
      <div className="w-1/6 flex flex-col justify-start items-center gap-4 py-7">
        <img src={agent.userProfile?.image || placeholder} alt="" className="w-40 h-40 rounded-xl opacity-75" />
        <button onClick={() => handleOpenModal('userProfile.image', agent.userProfile?.image)} className="px-4 py-1 bg-orange-500 font-semibold text-white rounded-2xl">Modifier photo</button>
      </div>
      <div className="w-4/6 px-8 py-1 flex flex-col justify-start items-start gap-10 divide-y">
        {/* Identité Section */}
        <div className="w-full flex flex-col gap-1 py-4">
          <div className="w-full flex justify-between items-center">
            <div className="w-2/3">
              <h4 className="font-semibold text-orange-500 text-lg">Identité</h4>
              <p className="text-zinc-400/75">Toutes les informations concernant l'identité de l'agent mises à disposition</p>
            </div>
            <button onClick={() => setShowArchiveModal(true)} className="px-4 py-2 bg-red-400 font-semibold text-white rounded-2xl">Archiver</button>
          </div>
        </div>
        
        {/* Affichage des informations */}
        {/* Nom complet */}
        <div className="w-full flex flex-col py-2 text-[14px]">
          <div className="flex justify-between items-center pr-2">
            <div className="w-2/3 flex justify-start gap-8 items-center py-2">
              <p className="w-1/2 font-semibold text-slate-600">Nom complet</p>
              <p className="w-1/2 text-slate-500">{agent.name}</p>
            </div>
            <button onClick={() => handleOpenModal('name', agent.name)} className='text-orange-500 font-semibold'>Modifier</button>
          </div>
        </div>
        {/* Genre */}
        <div className="w-full flex flex-col py-2 text-[14px]">
          <div className="flex justify-between items-center pr-2">
            <div className="w-2/3 flex justify-start gap-8 items-center py-2">
              <p className="w-1/2 font-semibold text-slate-600">Genre</p>
              <p className="w-1/2 text-slate-500">{agent.gender}</p>
            </div>
            <button onClick={() => handleOpenModal('gender', agent.gender)} className='text-orange-500 font-semibold'>Modifier</button>
          </div>
        </div>
        {/* Lieu et date de naissance */}
        <div className="w-full flex flex-col py-2 text-[14px]">
          <div className="flex justify-between items-center pr-2">
            <div className="w-2/3 flex justify-start gap-8 items-center py-2">
              <p className="w-1/2 font-semibold text-slate-600">Lieu et date de naissance</p>
              <p className="w-1/2 text-slate-500">{agent.placeOfBirth}, {agent.dateOfBirth}</p>
            </div>
            <button onClick={() => handleOpenModal('placeOfBirth', agent.placeOfBirth)} className='text-orange-500 font-semibold'>Modifier</button>
          </div>
        </div>
        {/* État Civil */}
        <div className="w-full flex flex-col py-2 text-[14px]">
          <div className="flex justify-between items-center pr-2">
            <div className="w-2/3 flex justify-start gap-8 items-center py-2">
              <p className="w-1/2 font-semibold text-slate-600">État Civil</p>
              <p className="w-1/2 text-slate-500">{agent.matrimonial}</p>
            </div>
            <button onClick={() => handleOpenModal('matrimonial', agent.matrimonial)} className='text-orange-500 font-semibold'>Modifier</button>
          </div>
        </div>
        {/* Nombre d'enfants */}
        <div className="w-full flex flex-col py-2 text-[14px]">
          <div className="flex justify-between items-center pr-2">
            <div className="w-2/3 flex justify-start gap-8 items-center py-2">
              <p className="w-1/2 font-semibold text-slate-600">Nombre d'enfants</p>
              <p className="w-1/2 text-slate-500">{agent.children}</p>
            </div>
            <button onClick={() => handleOpenModal('children', agent.children)} className='text-orange-500 font-semibold'>Modifier</button>
          </div>
        </div>
        {/* Adresse Domicile */}
        <div className="w-full flex flex-col py-2 text-[14px]">
          <div className="flex justify-between items-center pr-2">
            <div className="w-2/3 flex justify-start gap-8 items-center py-2">
              <p className="w-1/2 font-semibold text-slate-600">Adresse Domicile</p>
              <p className="w-1/2 text-slate-500">{agent.adress}</p>
            </div>
            <button onClick={() => handleOpenModal('adress', agent.adress)} className='text-orange-500 font-semibold'>Modifier</button>
          </div>
        </div>
        {/* Voir contrat */}
        <div className="w-full flex flex-col py-2 text-[14px]">
          <div className="flex justify-end items-center pr-2">
            <Link to={`/${agent.name}/contract`} className='bg-slate-400 text-white font-semibold px-4 py-2 rounded-lg'>Voir son contrat</Link>
          </div>
        </div>
      </div>

      {/* Modal pour mise à jour d'une information */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Modifier {modalField === 'userProfile.image' ? 'la photo' : modalField}</h2>
            {modalField === 'userProfile.image' ? (
              <input type="file" accept="image/*" onChange={handleFileChange} />
            ) : (
              <input
                type="text"
                value={modalValue}
                onChange={(e) => setModalValue(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            )}
            <div className="flex justify-end gap-4 mt-4">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded-lg">Annuler</button>
              <button onClick={handleSaveField} className="px-4 py-2 bg-orange-500 text-white rounded-lg">Sauvegarder</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal pour confirmation d'archivage */}
      {showArchiveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirmer l'archivage</h2>
            <p>Voulez-vous vraiment archiver cet agent ? Cette action est irréversible.</p>
            <div className="flex justify-end gap-4 mt-4">
              <button onClick={() => setShowArchiveModal(false)} className="px-4 py-2 bg-gray-300 rounded-lg">Annuler</button>
              <button onClick={handleArchiveAgent} className="px-4 py-2 bg-red-500 text-white rounded-lg">Archiver</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Infos;
