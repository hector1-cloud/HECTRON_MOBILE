import React from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('/dashboard');
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <ul>
        <li>
          <span className="text-gray-700 text-sm font-bold mb-2">Monitoreo de Gnosis</span>
          <span className="ml-2">{data.monitoreoGnosis}</span>
        </li>
        <li>
          <span className="text-gray-700 text-sm font-bold mb-2">Configuración de alertas</span>
          <span className="ml-2">{data.configuracionAlertas}</span>
        </li>
        <li>
          <span className="text-gray-700 text-sm font-bold mb-2">Acceso a reportes</span>
          <span className="ml-2">{data.accesoReportes}</span>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;