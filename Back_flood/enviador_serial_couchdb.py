import serial
import json
import requests
from datetime import datetime
from dotenv import load_dotenv
import os

# Carregar variáveis de ambiente
load_dotenv()

SERIAL_PORT = os.getenv("SERIAL_PORT", "COM4")
BAUD_RATE = int(os.getenv("BAUD_RATE", "9600"))
COUCHDB_URL = os.getenv("COUCHDB_URL")
COUCHDB_USER = os.getenv("COUCHDB_USER")
COUCHDB_PASS = os.getenv("COUCHDB_PASS")

ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=2)
print(f"✅ Conectado na porta {SERIAL_PORT}")

while True:
    try:
        raw_line = ser.readline().decode('utf-8', errors='ignore').strip()
        if not raw_line or not raw_line.startswith("{") or not raw_line.endswith("}"):
            print("⚠️ Dado inválido recebido:", raw_line)
            continue

        print(f"Recebido: {raw_line}")
        data = json.loads(raw_line)

        dados_formatados = {
            "nivelAgua": data.get("nivelAgua", 0),
            "chuva": data.get("chuva", 0),
            "timestamp": datetime.now().isoformat()
        }

        response = requests.post(
            COUCHDB_URL,
            json=dados_formatados,
            auth=(COUCHDB_USER, COUCHDB_PASS)
        )

        if response.status_code == 201:
            print("✅ Dados enviados com sucesso!")
        else:
            print(f"❌ Erro ao enviar dados: {response.status_code} - {response.text}")

    except json.JSONDecodeError as e:
        print(f"❌ Erro ao decodificar JSON: {e}")
        continue

    except Exception as e:
        print(f"❌ Erro geral: {e}")
        continue

