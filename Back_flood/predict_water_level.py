import pandas as pd
import numpy as np
import datetime
import json
import couchdb
import os
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from dotenv import load_dotenv

# Carrega variáveis do .env
load_dotenv()

COUCHDB_URL = os.getenv("COUCHDB_URL")  # Ex: http://127.0.0.1:5984/monitoramento
COUCHDB_USER = os.getenv("COUCHDB_USER")
COUCHDB_PASS = os.getenv("COUCHDB_PASS")

# 🔍 Extrair host e nome do banco da URL
url_parts = COUCHDB_URL.replace("http://", "").split("/")
host = url_parts[0]  # 127.0.0.1:5984
database_name = url_parts[1]  # monitoramento
full_url = f"http://{COUCHDB_USER}:{COUCHDB_PASS}@{host}"

# Conectar ao CouchDB
couch = couchdb.Server(full_url)

if database_name not in couch:
    print(f"❌ Banco de dados '{database_name}' não encontrado.")
    exit(1)

db = couch[database_name]

# Função para carregar dados históricos do banco
def carregar_dados():
    dados = []
    for doc_id in db:
        doc = db[doc_id]
        try:
            datahora = doc.get("timestamp")
            nivel_agua = float(doc.get("nivelAgua", 0))
            chuva = float(doc.get("chuva", 0))

            dt = datetime.datetime.fromisoformat(datahora)
            dados.append({
                "hora": dt.hour,
                "dia_semana": dt.weekday(),
                "chuva": chuva,
                "nivel_agua": nivel_agua
            })
        except Exception as e:
            print(f"Erro ao processar doc {doc_id}: {e}")
    return pd.DataFrame(dados)

# Função para treinar o modelo e prever os próximos 24h
def gerar_previsao(df):
    X = df[["hora", "dia_semana", "chuva"]]
    y = df["nivel_agua"]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

    modelo = RandomForestRegressor(n_estimators=100, random_state=42)
    modelo.fit(X_train, y_train)

    agora = datetime.datetime.now()
    previsoes = []

    for i in range(9):  # Previsões de 3 em 3h
        futuro = agora + datetime.timedelta(hours=i * 3)
        entrada = pd.DataFrame([{
            "hora": futuro.hour,
            "dia_semana": futuro.weekday(),
            "chuva": np.mean(df["chuva"])  # Usa chuva média como aproximação
        }])
        pred = modelo.predict(entrada)[0]
        previsoes.append({
            "time": "Agora" if i == 0 else f"+{i * 3}h",
            "level": round(pred, 2)
        })

    return previsoes

def main():
    df = carregar_dados()
    if df.empty:
        print("Nenhum dado disponível para previsão.")
        return

    previsoes = gerar_previsao(df)

    with open("previsao_24h.json", "w") as f:
        json.dump(previsoes, f, indent=2)

    print("✅ Previsão gerada com sucesso! Veja o arquivo previsao_24h.json.")

if __name__ == "__main__":
    main()
