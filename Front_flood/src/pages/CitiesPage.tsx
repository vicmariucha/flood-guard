import { useState } from "react";
import styles from "./CitiesPage.module.css";
import CreateLocationModal from "../components/CreateLocationModal";
import { Plus, RefreshCw } from "lucide-react";

const citiesData = [
  {
    name: "Sorocaba",
    region: "Centro",
    stations: 5,
    alerts: 2,
    mainStation: "Centro",
    status: "Online",
    lastUpdate: "22/05/2025 21:19",
  },
  {
    name: "Votorantim",
    region: "Leste",
    stations: 3,
    alerts: 0,
    mainStation: "Centro",
    status: "Online",
    lastUpdate: "22/05/2025 19:25",
  },
  {
    name: "Itu",
    region: "Norte",
    stations: 4,
    alerts: 1,
    mainStation: "Barragem",
    status: "Online",
    lastUpdate: "22/05/2025 09:56",
  },
  {
    name: "Salto",
    region: "Sul",
    stations: 3,
    alerts: 0,
    mainStation: "Centro",
    status: "Online",
    lastUpdate: "22/05/2025 20:28",
  },
  {
    name: "Porto Feliz",
    region: "Oeste",
    stations: 2,
    alerts: 0,
    mainStation: "Rio Tietê",
    status: "Offline",
    lastUpdate: "21/05/2025 23:37",
  },
];

const stationsData = [
  {
    name: "Centro",
    city: "Sorocaba",
    status: "Online",
    level: "32 cm",
    rain: "42 mm/h",
    coords: "-23.5505, -47.4558",
    updatedAt: "21/05/2025 23:37",
  },
  {
    name: "Vila Hortência",
    city: "Sorocaba",
    status: "Online",
    level: "28 cm",
    rain: "38 mm/h",
    coords: "-23.5420, -47.4498",
    updatedAt: "22/05/2025 20:28",
  },
  {
    name: "Jardim São Paulo",
    city: "Sorocaba",
    status: "Online",
    level: "25 cm",
    rain: "35 mm/h",
    coords: "-23.5350, -47.4600",
    updatedAt: "22/05/2025 09:56",
  },
  {
    name: "Barragem",
    city: "Itu",
    status: "Online",
    level: "45 cm",
    rain: "50 mm/h",
    coords: "-23.2642, -47.2995",
    updatedAt: "22/05/2025 14:29",
  },
  {
    name: "Centro",
    city: "Votorantim",
    status: "Online",
    level: "22 cm",
    rain: "30 mm/h",
    coords: "-23.5458, -47.4397",
    updatedAt: "20/05/2025 14:25",
  },
  {
    name: "Rio Tietê",
    city: "Porto Feliz",
    status: "Offline",
    level: "40 cm",
    rain: "0 mm/h",
    coords: "-23.2097, -47.5252",
    updatedAt: "22/05/2025 19:45",
  },
];

function CitiesPage() {
  const [activeTab, setActiveTab] = useState("cidades");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const filteredCities = citiesData.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredStations = stationsData.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cidades</h2>

      <div className={styles.topActions}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Buscar cidade ou estação..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className={styles.buttonsRight}>
          <button onClick={() => setShowModal(true)} className={styles.addButton}>
            <Plus size={16} /> Adicionar
          </button>
          <button className={styles.refreshButton}>
            <RefreshCw size={16} /> Atualizar
          </button>
        </div>
      </div>

      <div className={styles.tabsList}>
        <button
          className={activeTab === "cidades" ? styles.activeTab : styles.inactiveTab}
          onClick={() => setActiveTab("cidades")}
        >
          Cidades
        </button>
        <button
          className={activeTab === "estacoes" ? styles.activeTab : styles.inactiveTab}
          onClick={() => setActiveTab("estacoes")}
        >
          Estações
        </button>
      </div>

      {activeTab === "cidades" ? (
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Cidades monitoradas</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Região</th>
                <th>Estações</th>
                <th>Alertas ativos</th>
                <th>Estação principal</th>
                <th>Status</th>
                <th>Última atualização</th>
              </tr>
            </thead>
            <tbody>
              {filteredCities.map((city, i) => (
                <tr key={i}>
                  <td><strong>{city.name}</strong></td>
                  <td>{city.region}</td>
                  <td>{city.stations}</td>
                  <td>
                    <span className={
                      city.alerts > 0 ? styles.alertTag : styles.noneTag
                    }>
                      {city.alerts > 0 ? `${city.alerts} alerta${city.alerts > 1 ? 's' : ''}` : "Nenhum"}
                    </span>
                  </td>
                  <td>{city.mainStation}</td>
                  <td>
                    <span className={
                      city.status === "Online" ? styles.onlineTag : styles.offlineTag
                    }>
                      {city.status}
                    </span>
                  </td>
                  <td>{city.lastUpdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Estações de monitoramento</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Cidade</th>
                <th>Status</th>
                <th>Nível da água</th>
                <th>Volume de chuva</th>
                <th>Coordenadas</th>
                <th>Última atualização</th>
              </tr>
            </thead>
            <tbody>
              {filteredStations.map((station, i) => (
                <tr key={i}>
                  <td><strong>{station.name}</strong></td>
                  <td>{station.city}</td>
                  <td>
                    <span className={
                      station.status === "Online" ? styles.onlineTag : styles.offlineTag
                    }>
                      {station.status}
                    </span>
                  </td>
                  <td>{station.level}</td>
                  <td>{station.rain}</td>
                  <td>{station.coords}</td>
                  <td>{station.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && <CreateLocationModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default CitiesPage;
