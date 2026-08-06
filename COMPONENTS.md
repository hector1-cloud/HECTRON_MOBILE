# HECTRON Components Documentation

## Login.js

```jsx
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    if (!email || !password) {
      return setError('Correo electrónico y contraseña son obligatorios');
    }
    try {
      const response = await axios.post('/login', { email, password });
      onLogin(email, password);
    } catch (error) {
      console.error(error);
      setError('Error de autenticación');
    }
  };

  return (
    <div className="flex h-screen justify-center items-center overflow-hidden bg-gray-100">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Inicio de sesión</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Correo electrónico
            </label>
            <input
              className="shadow appearance-none border rounded py-2 px-3 w-full justify-center items-center"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              className="shadow appearance-none border rounded py-2 px-3 w-full justify-center items-center"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            onClick={handleLogin}
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
```

## Dashboard.js

```jsx
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
```

## Reportes.js

```jsx
import React from 'react';

const Reportes = () => {
  return (
    <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Reportes</h2>
      <p>Este es un lugar donde se podrán ver reportes de la aplicación.</p>
    </div>
  );
};

export default Reportes;
```

## MonitoreoGnosis.js

```jsx
import React from 'react';

const MonitoreoGnosis = () => {
  return (
    <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Monitoreo de Gnosis</h2>
      <p>Este es un lugar donde se puede monitorear la salud y el estado del sistema.</p>
    </div>
  );
};

export default MonitoreoGnosis;
```

Estos componentes principales están implementados con Tailwind y se pueden personalizar de acuerdo a las necesidades específicas de HECTRON.
