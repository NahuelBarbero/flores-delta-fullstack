import requests
import random
from datetime import datetime, timedelta

# Configuración
API_URL = "http://localhost:8080/api"
ADMIN_LOGIN = {
    "username": "admin@delta.com",
    "password": "admin123"
}

# Login
def login():
    response = requests.post(f"{API_URL.replace('/api', '')}/login", json=ADMIN_LOGIN)
    if response.status_code == 200:
        token = response.json().get('token')
        return {"Authorization": f"Bearer {token}"}
    raise Exception("Login failed")

# Datos maestros
SALAS = [
    {"nombre": "Sala Madre", "descripcion": "Genéticas madre", "horasLuz": 18, "humedad": 60, "temperaturaAmbiente": 24},
    {"nombre": "Propagación", "descripcion": "Esquejes y clones", "horasLuz": 24, "humedad": 75, "temperaturaAmbiente": 25},
    {"nombre": "Vegetativo 1", "descripcion": "Crecimiento vegetativo", "horasLuz": 18, "humedad": 65, "temperaturaAmbiente": 26},
    {"nombre": "Vegetativo 2", "descripcion": "Crecimiento avanzado", "horasLuz": 18, "humedad": 60, "temperaturaAmbiente": 26},
    {"nombre": "Floración 1", "descripcion": "Inicio floración", "horasLuz": 12, "humedad": 50, "temperaturaAmbiente": 24},
    {"nombre": "Floración 2", "descripcion": "Floración avanzada", "horasLuz": 12, "humedad": 45, "temperaturaAmbiente": 22},
    {"nombre": "Secado/Curado", "descripcion": "Post-cosecha", "horasLuz": 0, "humedad": 55, "temperaturaAmbiente": 20},
]

GENETICAS = [
    {"geneticaParental": "OG Kush", "dominancia": "Híbrida", "thc": "20-24%", "cbd": "0.2%", "aromaSabor": "Terroso, pino, cítrico", "detalle": "Muy popular, efecto relajante"},
    {"geneticaParental": "White Widow", "dominancia": "Híbrida", "thc": "18-22%", "cbd": "0.1%", "aromaSabor": "Dulce, especiado", "detalle": "Clásico holandés"},
    {"geneticaParental": "Northern Lights", "dominancia": "Indica", "thc": "16-20%", "cbd": "0.1%", "aromaSabor": "Dulce, terroso", "detalle": "Efecto sedante, ideal noche"},
    {"geneticaParental": "Sour Diesel", "dominancia": "Sativa", "thc": "22-26%", "cbd": "0.2%", "aromaSabor": "Diesel, cítrico", "detalle": "Energético, creativo"},
    {"geneticaParental": "Gorilla Glue #4", "dominancia": "Híbrida", "thc": "25-30%", "cbd": "0.1%", "aromaSabor": "Chocolate, café", "detalle": "Muy potente, pegajoso"},
    {"geneticaParental": "Bruce Banner", "dominancia": "Híbrida", "thc": "27-29%", "cbd": "0.1%", "aromaSabor": "Sweet, diesel", "detalle": "Una de las más potentes"},
    {"geneticaParental": "Girl Scout Cookies", "dominancia": "Híbrida", "thc": "20-23%", "cbd": "0.2%", "aromaSabor": "Dulce, menta", "detalle": "Efecto eufórico"},
    {"geneticaParental": "AK-47", "dominancia": "Híbrida", "thc": "19-22%", "cbd": "0.1%", "aromaSabor": "Floral, terroso", "detalle": "Efecto equilibrado"},
]

NUTRIENTES = [
    {"titulo": "Top Veg", "descripcion": "Fertilizante vegetativo base"},
    {"titulo": "Top Bloom", "descripcion": "Fertilizante floración"},
    {"titulo": "Cal-Mag", "descripcion": "Calcio y magnesio"},
    {"titulo": "Microvita", "descripcion": "Micronutrientes"},
    {"titulo": "Root Booster", "descripcion": "Estimulador raíces"},
    {"titulo": "Bloom Booster", "descripcion": "Estimulador floración"},
]

ETAPAS = ["PLANTIN", "VEGETACION", "FLORACION"]
UBICACIONES = ["Estante Superior", "Estante Medio", "Estante Inferior", "Mesa 1", "Mesa 2", "Piso"]

def crear_salas(headers):
    sala_ids = []
    for sala in SALAS:
        response = requests.post(f"{API_URL}/salas", json=sala, headers=headers)
        if response.status_code in [200, 201]:
            sala_ids.append(response.json()['id'])
            print(f"✅ Sala creada: {sala['nombre']}")
    return sala_ids

def crear_geneticas(headers):
    cepa_ids = []
    for gen in GENETICAS:
        response = requests.post(f"{API_URL}/cepas", json=gen, headers=headers)
        if response.status_code in [200, 201]:
            cepa_ids.append(response.json()['id'])
            print(f"✅ Genética creada: {gen['geneticaParental']}")
    return cepa_ids

def crear_nutrientes(headers):
    nutriente_ids = []
    for nut in NUTRIENTES:
        response = requests.post(f"{API_URL}/nutrientes", json=nut, headers=headers)
        if response.status_code in [200, 201]:
            nutriente_ids.append(response.json()['id'])
            print(f"✅ Nutriente creado: {nut['titulo']}")
    return nutriente_ids

def crear_plantas(headers, sala_ids, cepa_ids, cantidad=500):
    planta_ids = []
    for i in range(1, cantidad + 1):
        planta = {
            "nombre": f"PLT-{i:04d}",
            "etapa": random.choice(ETAPAS),
            "salaId": random.choice(sala_ids),
            "cepaId": random.choice(cepa_ids),
            "ubicacion": random.choice(UBICACIONES),
            "produccion": random.randint(50, 300),
            "isPublic": random.choice([True, False]),
        }
        response = requests.post(f"{API_URL}/plantas", json=planta, headers=headers)
        if response.status_code in [200, 201]:
            planta_ids.append(response.json()['id'])
            if i % 50 == 0:
                print(f"✅ Plantas creadas: {i}/{cantidad}")
    return planta_ids

def crear_eventos_masivos(headers, planta_ids, nutriente_ids):
    print("📝 Creando eventos masivos...")
    eventos_creados = 0
    
    for planta_id in random.sample(planta_ids, min(100, len(planta_ids))):  # 100 plantas con eventos
        fecha_base = datetime.now() - timedelta(days=random.randint(1, 60))
        
        # 2-5 riegos por planta
        for _ in range(random.randint(2, 5)):
            evento_riego = {
                "plantaIds": [planta_id],
                "fecha": (fecha_base + timedelta(days=random.randint(0, 30))).strftime("%Y-%m-%d"),
                "phAgua": round(random.uniform(5.5, 6.5), 1),
                "ecAgua": round(random.uniform(0.8, 2.0), 2),
            }
            requests.post(f"{API_URL}/events/watering", json=evento_riego, headers=headers)
            eventos_creados += 1
        
        # 1-2 podas
        for _ in range(random.randint(0, 2)):
            evento_poda = {
                "plantaIds": [planta_id],
                "fecha": (fecha_base + timedelta(days=random.randint(0, 40))).strftime("%Y-%m-%d"),
                "tipoPoda": random.choice(["Apical", "LST", "Defoliación", "Bajos"]),
            }
            requests.post(f"{API_URL}/events/pruning", json=evento_poda, headers=headers)
            eventos_creados += 1
        
        # 1-3 nutrientes
        for _ in range(random.randint(1, 3)):
            evento_nutriente = {
                "plantaIds": [planta_id],
                "fecha": (fecha_base + timedelta(days=random.randint(0, 35))).strftime("%Y-%m-%d"),
                "nutriente": {"id": random.choice(nutriente_ids)},
            }
            requests.post(f"{API_URL}/events/nutrient", json=evento_nutriente, headers=headers)
            eventos_creados += 1
    
    print(f"✅ Eventos creados: {eventos_creados}")

if __name__ == "__main__":
    print("🚀 Iniciando población masiva de base de datos...")
    
    try:
        headers = login()
        print("✅ Login exitoso")
        
        sala_ids = crear_salas(headers)
        cepa_ids = crear_geneticas(headers)
        nutriente_ids = crear_nutrientes(headers)
        
        planta_ids = crear_plantas(headers, sala_ids, cepa_ids, cantidad=500)
        print(f"✅ Total plantas creadas: {len(planta_ids)}")
        
        crear_eventos_masivos(headers, planta_ids, nutriente_ids)
        
        print("\n🎉 ¡Población masiva completada!")
        print(f"   - {len(sala_ids)} salas")
        print(f"   - {len(cepa_ids)} genéticas")
        print(f"   - {len(nutriente_ids)} nutrientes")
        print(f"   - {len(planta_ids)} plantas")
        
    except Exception as e:
        print(f"❌ Error: {e}")
