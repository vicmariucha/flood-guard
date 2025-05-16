const DB_URL = import.meta.env.VITE_COUCHDB_URL;
const DB_NAME = import.meta.env.VITE_COUCHDB_DB;
const USER = import.meta.env.VITE_COUCHDB_USER;
const PASS = import.meta.env.VITE_COUCHDB_PASS;

const BASIC_AUTH = btoa(`${USER}:${PASS}`);

export async function fetchMonitoramento() {
  const res = await fetch(`${DB_URL}/${DB_NAME}/_all_docs?include_docs=true`, {
    headers: {
      Authorization: `Basic ${BASIC_AUTH}`,
    },
  });
  const data = await res.json();
  return data.rows.map((row: any) => row.doc);
}