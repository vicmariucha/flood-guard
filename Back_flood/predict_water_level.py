import pandas as pd
import numpy as np
import datetime
import json
import couchdb
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

# Conexão com o CouchDB
COUCHDB_URL = "http://admin:admin@localhost:5984/"
DATABASE_NAME = "leituras_sensor"

couch = couchdb.Server(COUCHDB_URL)
db = couch[DATABASE_NAME]

# Função para carregar dados históricos do banco
def carregar_dados():
    dados = []
    for doc_id in db:
        doc = db[doc_id]
        try:
            datahora = doc.get("timestamp")  # Ex: "2025-05-09T14:30:00"
            nivel_agua = float(doc.get("nivel_agua", 0))
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
    # Features (entrada) e target (saida)
    X = df[["hora", "dia_semana", "chuva"]]
    y = df["nivel_agua"]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

    modelo = RandomForestRegressor(n_estimators=100, random_state=42)
    modelo.fit(X_train, y_train)

    # Previsão para as próximas 24 horas (de hora em hora)
    agora = datetime.datetime.now()
    previsoes = []

    for i in range(9):  # de 0 até +24h em intervalos de 3h
        futuro = agora + datetime.timedelta(hours=i*3)
        entrada = pd.DataFrame([{
            "hora": futuro.hour,
            "dia_semana": futuro.weekday(),
            "chuva": np.mean(df["chuva"])  # usa chuva média como aproximação
        }])
        pred = modelo.predict(entrada)[0]
        previsoes.append({
            "time": "Agora" if i == 0 else f"+{i*3}h",
            "level": round(pred, 2)
        })

    return previsoes

# Função principal
def main():
    df = carregar_dados()
    if df.empty:
        print("Nenhum dado disponível para previsão.")
        return

    previsoes = gerar_previsao(df)

    # Exportar para JSON (pode ser salvo ou enviado por API)
    with open("previsao_24h.json", "w") as f:
        json.dump(previsoes, f, indent=2)

    print("Previsão gerada com sucesso! Veja o arquivo previsao_24h.json.")

if __name__ == "__main__":
    main()
