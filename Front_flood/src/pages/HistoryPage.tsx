import styles from "./HistoryPage.module.css";
import { useState } from "react";
import { Download, Calendar } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const tableData = [
  { date: "19/05/2025", time: "14:00", waterLevel: "32 cm", rain: "20 mm/h", temp: "28°C", alert: "Moderado" },
  { date: "18/05/2025", time: "14:00", waterLevel: "28 cm", rain: "12 mm/h", temp: "26°C", alert: "Baixo" },
  { date: "17/05/2025", time: "14:00", waterLevel: "35 cm", rain: "30 mm/h", temp: "29°C", alert: "Alto" },
  { date: "16/05/2025", time: "14:00", waterLevel: "22 cm", rain: "10 mm/h", temp: "25°C", alert: "Baixo" },
];

const chartData = [
  { time: "00:00", level: 10 },
  { time: "02:00", level: 12 },
  { time: "04:00", level: 15 },
  { time: "06:00", level: 13 },
  { time: "08:00", level: 16 },
  { time: "10:00", level: 18 },
  { time: "12:00", level: 19 },
  { time: "14:00", level: 23 },
  { time: "16:00", level: 25 },
  { time: "18:00", level: 27 },
  { time: "20:00", level: 29 },
  { time: "22:00", level: 27 },
];

function HistoryPage() {
  const [activeTab, setActiveTab] = useState("grafico");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Histórico de dados</h2>
        <div className={styles.actions}>
          <button className={styles.filterBtn}>
            <Calendar size={16} />
            Filtrar por data
          </button>
          <button className={styles.exportBtn}>
            <Download size={16} />
            Exportar dados
          </button>
        </div>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "tabela" ? styles.active : ""}`}
          onClick={() => setActiveTab("tabela")}
        >
          Tabela
        </button>
        <button
          className={`${styles.tab} ${activeTab === "grafico" ? styles.active : ""}`}
          onClick={() => setActiveTab("grafico")}
        >
          Gráfico
        </button>
      </div>

      {activeTab === "grafico" && (
        <div className={styles.chartCard}>
          <h3 className={styles.cardTitle}>Histórico de nível da água</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="level" stroke="#00b4b2" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeTab === "tabela" && (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Data</th>
                <th>Hora</th>
                <th>Nível da água</th>
                <th>Volume de chuva</th>
                <th>Temperatura</th>
                <th>Status de alerta</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.date}</td>
                  <td>{entry.time}</td>
                  <td>{entry.waterLevel}</td>
                  <td>{entry.rain}</td>
                  <td>{entry.temp}</td>
                  <td>{entry.alert}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default HistoryPage;
