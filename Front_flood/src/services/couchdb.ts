const DB_URL = import.meta.env.VITE_COUCHDB_URL;
const DB_MONITORAMENTO = "monitoramento";
const DB_ALERTAS = "alertas";
const USER = import.meta.env.VITE_COUCHDB_USER;
const PASS = import.meta.env.VITE_COUCHDB_PASS;

const BASIC_AUTH = btoa(`${USER}:${PASS}`);

// dados de monitoramento
export async function fetchMonitoramento() {
  const res = await fetch(`${DB_URL}/${DB_MONITORAMENTO}/_all_docs?include_docs=true`, {
    headers: {
      Authorization: `Basic ${BASIC_AUTH}`,
    },
  });
  const data = await res.json();
  return data.rows.map((row: any) => row.doc);
}

//  alertas
export async function fetchAlertas() {
  const res = await fetch(`${DB_URL}/${DB_ALERTAS}/_all_docs?include_docs=true`, {
    headers: {
      Authorization: `Basic ${BASIC_AUTH}`,
    },
  });
  const data = await res.json();
  return data.rows.map((row: any) => row.doc);
}

// Salvar alerta no banco
export async function salvarAlerta(alerta: any) {
  const res = await fetch(`${DB_URL}/${DB_ALERTAS}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${BASIC_AUTH}`,
    },
    body: JSON.stringify(alerta),
  });

  if (!res.ok) {
    console.error("Erro ao salvar alerta", await res.text());
  }

  return await res.json();
}

//  deletar alerta
export async function deletarAlerta(id: string, rev: string) {
  const res = await fetch(`${DB_URL}/${DB_ALERTAS}/${id}?rev=${rev}`, {
    method: "DELETE",
    headers: {
      Authorization: `Basic ${BASIC_AUTH}`,
    },
  });

  if (!res.ok) {
    console.error("Erro ao deletar alerta", await res.text());
    throw new Error("Erro ao deletar alerta");
  }

  return await res.json();
}
