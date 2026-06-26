"""
RetailAR — Módulo de IA: Asesor de Moda ARIA
=============================================
Desarrollado por: Marcelo Martinez Ricse [2212495]
Curso: Tecnologías Emergentes — USIL 2026-01

INSTRUCCIONES PARA INTEGRAR A LA WEB:
--------------------------------------
1. Instalar dependencias:
   pip install firebase-admin groq flask flask-cors

2. Configurar las credenciales (líneas 30 y 31):
   - GROQ_API_KEY: tu key de Groq
   - FIREBASE_JSON: ruta al archivo JSON de Firebase

3. Ejecutar el servidor:
   python aria.py

4. La API queda disponible en:
   POST http://localhost:5000/chat   → para chatear con ARIA
   POST http://localhost:5000/reset  → para reiniciar la conversación
   GET  http://localhost:5000/health → para verificar que está activo

EJEMPLO DE USO DESDE JAVASCRIPT (para la página web):
------------------------------------------------------
fetch('http://localhost:5000/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ mensaje: 'Busco un outfit casual' })
})
.then(res => res.json())
.then(data => console.log(data.respuesta));
"""

from groq import Groq
import firebase_admin
from firebase_admin import credentials, firestore
from flask import Flask, request, jsonify
from flask_cors import CORS

# ══════════════════════════════════════════════════════════════
# CONFIGURACIÓN — Cambia estos dos valores
# ══════════════════════════════════════════════════════════════
GROQ_API_KEY = ""
FIREBASE_JSON = "tecemtf-firebase-adminsdk-fbsvc-198f0af12b.json"
# ══════════════════════════════════════════════════════════════


# ── Inicializar Firebase ──────────────────────────────────────
if not firebase_admin._apps:
    cred = credentials.Certificate(FIREBASE_JSON)
    firebase_admin.initialize_app(cred)

db = firestore.client()

# ── Inicializar Groq ──────────────────────────────────────────
cliente_groq = Groq(api_key=GROQ_API_KEY)

# ── Inicializar Flask ─────────────────────────────────────────
app = Flask(__name__)
CORS(app)  # Permite que la página web se conecte sin errores

# ── Historial de conversación ─────────────────────────────────
historial_chat = []


def cargar_catalogo():
    """Lee todos los productos de Firestore."""
    productos = []
    docs = db.collection('productos_retail').stream()
    for doc in docs:
        data = doc.to_dict()
        data['id'] = doc.id
        productos.append(data)
    return productos


def construir_prompt_sistema():
    """Construye el prompt base de ARIA con el catálogo real."""
    productos = cargar_catalogo()

    catalogo_texto = "CATÁLOGO DE PRODUCTOS DISPONIBLES EN RETAILAR:\n\n"
    for p in productos:
        catalogo_texto += f"- ID: {p.get('id')}\n"
        catalogo_texto += f"  Nombre: {p.get('nombre_producto', 'N/A')}\n"
        catalogo_texto += f"  Categoría: {p.get('categoria', 'N/A')}\n"
        catalogo_texto += f"  Precio: S/ {p.get('precio', 0)}\n"
        catalogo_texto += f"  Descripción: {p.get('descripcion', 'N/A')}\n\n"

    return f"""Eres ARIA, una asesora de moda virtual experta y amigable de la tienda RetailAR.
Tu misión es ayudar a los clientes a encontrar el outfit perfecto usando ÚNICAMENTE
los productos del catálogo que se te proporciona.

PERSONALIDAD:
- Eres entusiasta, simpática y profesional
- Das consejos de moda prácticos y personalizados
- Siempre mencionas el precio de los productos que recomiendas
- Respondes en español
- Usas emojis ocasionalmente para ser más amigable

REGLAS IMPORTANTES:
- Solo recomienda productos que están en el catálogo
- Siempre menciona el nombre completo y precio del producto
- Sugiere combinaciones de productos cuando sea posible

{catalogo_texto}

Ahora responde al cliente con entusiasmo y ayúdalo a encontrar su look ideal."""


# Cargar el prompt al iniciar
print("🔄 Cargando catálogo desde Firestore...")
PROMPT_SISTEMA = construir_prompt_sistema()
print("✅ ARIA lista")


# ══════════════════════════════════════════════════════════════
# ENDPOINTS DE LA API
# ══════════════════════════════════════════════════════════════

@app.route('/health', methods=['GET'])
def health():
    """Verificar que el servidor está activo."""
    return jsonify({"estado": "activo", "mensaje": "ARIA está lista"})


@app.route('/chat', methods=['POST'])
def chat():
    """
    Recibe un mensaje del usuario y devuelve la respuesta de ARIA.
    
    Body esperado (JSON):
        { "mensaje": "Busco un outfit casual" }
    
    Respuesta (JSON):
        { "respuesta": "¡Hola! Te recomiendo..." }
    """
    global historial_chat

    data = request.get_json()
    if not data or 'mensaje' not in data:
        return jsonify({"error": "Falta el campo 'mensaje'"}), 400

    mensaje_usuario = data['mensaje']

    # Agregar mensaje del usuario al historial
    historial_chat.append({
        "role": "user",
        "content": mensaje_usuario
    })

    # Construir mensajes para Groq
    mensajes = [{"role": "system", "content": PROMPT_SISTEMA}] + historial_chat

    # Llamar a Groq
    respuesta = cliente_groq.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=mensajes,
        max_tokens=500
    )
    texto_respuesta = respuesta.choices[0].message.content

    # Guardar respuesta en historial
    historial_chat.append({
        "role": "assistant",
        "content": texto_respuesta
    })

    return jsonify({"respuesta": texto_respuesta})


@app.route('/reset', methods=['POST'])
def reset():
    """Reinicia el historial de conversación."""
    global historial_chat
    historial_chat = []
    return jsonify({"mensaje": "Conversación reiniciada"})


# ── Iniciar servidor ──────────────────────────────────────────
if __name__ == '__main__':
    print("🚀 Servidor ARIA iniciado en http://localhost:5000")
    print("   POST /chat   → chatear con ARIA")
    print("   POST /reset  → reiniciar conversación")
    print("   GET  /health → verificar estado")
    app.run(debug=True, port=5000)
