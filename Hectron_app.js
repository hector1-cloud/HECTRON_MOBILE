import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Toggler from './components/Toggler';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import Reportes from './screens/Reportes';
import MonitoreoGnosis from './screens/MonitoreoGnosis';

function HectronApp() {
  const [logged, setLogged] = useState(false);
  const [sintonizado, setSintonizado] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLogged(true);
    }
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setLogged(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLogged(false);
  };

  const handleSintonizar = () => {
    setSintonizado(!sintonizado);
  };

  return (
    <div className="flex h-screen justify-center items-center overflow-hidden">
      {logged ? (
        <div className="relative flex w-full items-center justify-between py-4">
          <div className="hidden lg:block">
            <img src="/hectron-logo.png" alt="Hectron logo" className="w-32" />
          </div>
          <div className="lg:hidden">
            <Toggler
              checked={sintonizado}
              onChange={handleSintonizar}
              label="Sintonizar"
            />
          </div>
          <div className="hidden lg:flex">
            <Toggler
              checked={sintonizado}
              onChange={handleSintonizar}
              label="Sintonizar"
              className="ml-auto"
            />
          </div>
          <div className="lg:hidden">
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
            >
              Desconectar
            </button>
          </div>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
      {logged && (
        <main className="flex-1 max-w-7xl mx-auto p-4">
          <div className="flex w-full lg:h-screen">
            <div className="w-24 lg:w-64 fixed top-24 hidden lg:block left-4 bg-white shadow-md rounded p-4">
              <ul>
                <li>
                  <a
                    href="#"
                    className="flex justify-between items-center py-2 text-gray-600 hover:text-gray-900"
                  >
                    <span>Monitoreo de Gnosis</span>
                    <span className="ml-2">
                      <i className="fas fa-tachometer-alt" />
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex justify-between items-center py-2 text-gray-600 hover:text-gray-900"
                  >
                    <span>Configuración de alertas</span>
                    <span className="ml-2">
                      <i className="fas fa-bell" />
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex justify-between items-center py-2 text-gray-600 hover:text-gray-900"
                  >
                    <span>Acceso a reportes</span>
                    <span className="ml-2">
                      <i className="fas fa-file" />
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex justify-between items-center py-2 text-gray-600 hover:text-gray-900"
                  >
                    <span>Desplegar agentes y ejecutar tareas</span>
                    <span className="ml-2">
                      <i className="fas fa-robot" />
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full lg:w-7xl mx-auto p-4">
              {sintonizado && <Dashboard />}
              {!sintonizado && (
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
                  <p>Pulse el botón para sintonizar</p>
                  <button
                    onClick={handleSintonizar}
                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                  >
                    Sintonizar
                  </button>
                </div>
              )}
              {!logged && <Reportes />}
              {logged && !sintonizado && (
                <MonitoreoGnosis />
              )}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default HectronApp;
