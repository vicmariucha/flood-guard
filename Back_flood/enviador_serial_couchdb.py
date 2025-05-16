import serial
import json
import requests
from datetime import datetime


SERIAL_PORT = 'COM4' 
BAUD_RATE = 9600
COUCHDB_URL = 'http://127.0.0.1:5984/monitoramento'
COUCHDB_USER = 'Argoze'
COUCHDB_PASS = '252829'


ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
print(f"Conectado à porta {SERIAL_PORT}...")

while True:
    try:
        
        raw_line = ser.readline().decode('utf-8').strip()

        
        if not raw_line:
            continue

        
        print(f"Recebido: {raw_line}")

       
        data = json.loads(raw_line)

        
        data["timestamp"] = datetime.now().isoformat()

       
        response = requests.post(
            COUCHDB_URL,
            json=data,
            auth=(COUCHDB_USER, COUCHDB_PASS)
        )

        if response.status_code == 201:
            print("✅ Dados enviados com sucesso!")
        else:
            print(f"⚠️ Falha ao enviar: {response.status_code} - {response.text}")

    except json.JSONDecodeError:
        print("❌ Erro ao decodificar JSON. Dados inválidos recebidos.")
    except Exception as e:
        print(f"❌ Erro inesperado: {e}")
