import React, { useState } from 'react';

const SetupAbada = () => {
  const [setupVisible, setSetupVisible] = useState(false);
  const [userData, setUserData] = useState({ nombre: '', email: '', perfil: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const finalizarConfiguracion = () => {
    console.log("🦾 [DATOS_CAPTURADOS_AUTONOMOS]:", userData);
    alert(`ACCESO_CONCEDIDO: ${userData.nombre}`);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-zinc-900 border border-green-500/30 p-8 rounded-xl shadow-[0_0_40px_rgba(34,197,94,0.15)]">
        
        <h1 className="text-2xl font-black text-green-500 tracking-widest mb-6 text-center italic">
          HECTRON_SYSTEM_v1.0
        </h1>

        {!setupVisible ? (
          <button
            onClick={() => setSetupVisible(true)}
            className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-lg shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-300 uppercase tracking-widest"
          >
            Inicializar Protocolo
          </button>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-1">
              <label className="text-[10px] text-green-700 font-bold uppercase tracking-widest">ID_Credential</label>
              <input
                name="nombre"
                placeholder="Nombre de Operador..."
                className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded text-green-400 placeholder-zinc-700 focus:border-green-500 outline-none transition-all"
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-green-700 font-bold uppercase tracking-widest">Secure_Link</label>
              <input
                name="email"
                type="email"
                placeholder="Enlace de correo..."
                className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded text-green-400 placeholder-zinc-700 focus:border-green-500 outline-none transition-all"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setSetupVisible(false)} className="flex-1 bg-zinc-800 text-zinc-500 py-3 rounded font-bold hover:bg-zinc-700 transition-all">ABORTAR</button>
              <button onClick={finalizarConfiguracion} className="flex-2 bg-green-600 hover:bg-green-500 text-white py-3 px-6 rounded font-bold shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all">EJECUTAR</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SetupAbada;
