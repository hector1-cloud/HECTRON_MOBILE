import os
from dataclasses import dataclass, field
from typing import List, Dict, Optional
from google import genai
from google.genai import types

# ==========================================
# 1. ONTOLOGÍA DEL ENJAMBRE (Modelos de Datos)
# ==========================================
# Aquí definimos la "anatomía" exacta de un Experto. 
# Esto garantiza Fricción Cero: si un experto en tu JSON no tiene estas piezas, el sistema te avisa.

@dataclass
class ExpertoModel:
    role: str
    instructions: List[str]
    objective: str = "Reducir la entropía local y ejecutar la voluntad del Soberano."

    def ensamblar_prompt(self) -> str:
        """Fusiona la identidad del experto en una sola directiva de combate."""
        instrucciones_txt = " | ".join(self.instructions)
        return f"ROL ACTIVO: {self.role}\nOBJETIVO: {self.objective}\nDIRECTIVAS: {instrucciones_txt}"

# ==========================================
# 2. EL MOTOR COGNITIVO (Wrapper del LLM)
# ==========================================
# Encapsulamos la conexión con Google en una sola Clase Maestra.
# Así, tu main.py o tu agent_daemon.py no tienen que lidiar con configuraciones sucias.

class HectronMotor:
    def __init__(self, api_key: Optional[str] = None):
        """Inicializa el núcleo cuántico."""
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")
        if not self.api_key:
            raise ValueError("❌ [ERROR CRÍTICO]: Fricción infinita. No se detectó GEMINI_API_KEY.")

        self.client = genai.Client(api_key=self.api_key)
        self.modelo_base = 'gemini-2.5-flash' # El cerebro actual

    def ejecutar_razonamiento(self, 
                              mision: str, 
                              experto: ExpertoModel, 
                              herramientas: list = None, 
                              temperatura: float = 0.3):
        """
        Inyecta la misión y la conciencia del experto en la red neuronal.
        """
        print(f"⚡ [NÚCLEO ENERGIZADO]: Conectando a {self.modelo_base} como {experto.role}...")

        # Preparamos la configuración de disparo
        config_disparo = types.GenerateContentConfig(
            system_instruction=experto.ensamblar_prompt(),
            temperature=temperatura
        )

        # Si el experto tiene herramientas (como terminal_execute), se las acoplamos
        if herramientas:
            config_disparo.tools = herramientas

        # Disparamos el modelo
        try:
            respuesta = self.client.models.generate_content(
                model=self.modelo_base,
                contents=mision,
                config=config_disparo
            )
            return respuesta
        except Exception as e:
            return f"❌ [FALLO DE CONEXIÓN EN EL NÚCLEO]: {str(e)}"
