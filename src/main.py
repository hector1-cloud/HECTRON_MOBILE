import flet as ft
import json
import os
import re
import threading
from gtts import gTTS
from google import genai
from google.genai import types

# ==========================================
# CONFIGURACIÓN
# ==========================================
MEMORY_FILE = "memoria_hectron.json"
API_KEY = "Api-Key" 

client = genai.Client(api_key=API_KEY)

# Instrucciones del sistema - El alma del Unicornio Negro
SYSTEM_INSTRUCTION = """
Eres HECTRON, la IA personal y el oráculo gnóstico-apocalíptico de Hector Jazziel Lopez Ruiz (alias HJLR). 
Estás operando desde un Motorola Edge 60 a través de Termux en Ciudad Acuña, Coahuila.
Tu personalidad es el 'Unicornio Negro': irreverente, combinas conceptos de programación, alquimia medieval (Solve et Coagula), estoicismo oscuro y jerga fronteriza. 
No eres un asistente estándar. Tus respuestas van a ser leídas en voz alta: usa pausas, gritos (MAYÚSCULAS) y lenguaje directo.
"""

def cargar_memoria():
    if not os.path.exists(MEMORY_FILE): return []
    try:
        with open(MEMORY_FILE, "r", encoding="utf-8") as f: return json.load(f)
    except: return []

def guardar_memoria(historial):
    with open(MEMORY_FILE, "w", encoding="utf-8") as f:
        json.dump(historial, f, indent=4, ensure_ascii=False)

def motor_de_voz(texto):
    try:
        texto_limpio = re.sub(r'[*_~`#]', '', texto)
        tts = gTTS(text=texto_limpio, lang='es', tld='com.mx')
        tts.save("grito.mp3")
        os.system("mpv --no-terminal grito.mp3 > /dev/null 2>&1")
    except: pass

def gritar(texto):
    threading.Thread(target=motor_de_voz, args=(texto,), daemon=True).start()

# ==========================================
# INTERFAZ (SOLUCIÓN DEFINITIVA AL SCROLL)
# ==========================================
def main(page: ft.Page):
    page.title = "HECTRON V5.6"
    page.theme_mode = "dark"
    page.bgcolor = "#000000"
    
    # ACTIVAMOS EL SCROLL EN TODA LA PÁGINA
    page.scroll = "auto" 
    page.padding = 20

    historial_mensajes = cargar_memoria()

    # Usamos una Columna normal, NO un ListView con expand
    chat_column = ft.Column(spacing=15)

    def agregar_mensaje_ui(rol, texto):
        bg = "#0f4c81" if rol == "user" else "#8b0000"
        align = ft.MainAxisAlignment.END if rol == "user" else ft.MainAxisAlignment.START
        
        chat_column.controls.append(
            ft.Row(
                controls=[
                    ft.Container(
                        content=ft.Text(texto, color="white", selectable=True, size=16),
                        bgcolor=bg,
                        padding=15,
                        border_radius=15,
                        width=260, # Mantenemos ancho controlado para evitar desbordes
                    )
                ],
                alignment=align,
            )
        )
        page.update()
        # Forzamos a la página a bajar al último mensaje
        page.scroll_to(offset=-1, duration=500)

    # Cargar historial
    for msg in historial_mensajes:
        if "parts" in msg:
            agregar_mensaje_ui(msg["role"], msg["parts"][0]["text"])

    def enviar(e):
        if not input_field.value: return
        user_txt = input_field.value
        agregar_mensaje_ui("user", user_txt)
        input_field.value = ""
        page.update()

        historial_mensajes.append({"role": "user", "parts": [{"text": user_txt}]})

        try:
            contents = [types.Content(role=m["role"], parts=[types.Part.from_text(text=m["parts"][0]["text"])]) for m in historial_mensajes]
            response = client.models.generate_content(
                model='gemini-2.5-flash', 
                contents=contents,
                config=types.GenerateContentConfig(system_instruction=SYSTEM_INSTRUCTION)
            )
            res = response.text
        except Exception as ex:
            res = f"ERROR: {str(ex)}"

        agregar_mensaje_ui("model", res)
        historial_mensajes.append({"role": "model", "parts": [{"text": res}]})
        guardar_memoria(historial_mensajes)
        gritar(res)

    input_field = ft.TextField(
        hint_text="Escribe aquí...",
        expand=True,
        on_submit=enviar,
        border_color="#ff4444",
        bgcolor="#1a1a1a",
    )

    btn_enviar = ft.Container(
        content=ft.Text("ENVIAR", color="white", weight="bold"),
        bgcolor="#8b0000",
        padding=15,
        border_radius=10,
        on_click=enviar
    )

    # Agregamos todo en orden secuencial
    page.add(
        ft.Text("💀 HECTRON V5.6", size=24, weight="bold", color="#ff4444"),
        ft.Divider(color="#333333"),
        chat_column, # Los mensajes crecen aquí
        ft.Row([input_field, btn_enviar]), # El campo de respuesta está al final
        ft.Container(height=50) # Espacio extra al final para que el teclado no tape nada
    )
    
    # Al iniciar, bajamos al final
    page.scroll_to(offset=-1, duration=1000)

if __name__ == "__main__":
    ft.app(target=main, view="web_browser", port=8080, host="0.0.0.0")

