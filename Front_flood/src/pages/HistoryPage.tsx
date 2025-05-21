import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { CalendarDays, Download } from "lucide-react";
import styles from "./HistoryPage.module.css";

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

function exportToCSV() {
  const header = "Data,Hora,Nível da água,Volume de chuva,Temperatura,Status de alerta\n";
  const rows = tableData
    .map(d => `${d.date},${d.time},${d.waterLevel},${d.rain},${d.temp},${d.alert}`)
    .join("\n");

  const blob = new Blob([header + rows], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "historico.csv";
  link.click();
}


function HistoryPage() {
  const [activeTab, setActiveTab] = useState("grafico");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Histórico de Dados</h2>
        <div className={styles.actions}>
          <button className={styles.dateFilterButton}>
            <CalendarDays size={16} /> Filtrar por data
          </button>
          <button onClick={exportToCSV} className={styles.exportButton}>
            <Download size={16} /> Exportar dados
          </button>
        </div>
      </div>

      <div className={styles.tabsContainer}>
        <div className={styles.tabsList}>
          <button
            className={styles.tabButton}
            data-state={activeTab === "tabela" ? "active" : "inactive"}
            onClick={() => setActiveTab("tabela")}
          >
            Tabela
          </button>
          <button
            className={styles.tabButton}
            data-state={activeTab === "grafico" ? "active" : "inactive"}
            onClick={() => setActiveTab("grafico")}
          >
            Gráfico
          </button>
        </div>
      </div>

      {activeTab === "grafico" ? (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Histórico de nível da água</h3>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="level" stroke="#0EA5E9" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Registros históricos</h3>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead className={styles.tableHeader}>
                  <tr>
                    <th className={styles.tableHead}>Data</th>
                    <th className={styles.tableHead}>Hora</th>
                    <th className={styles.tableHead}>Nível da água</th>
                    <th className={styles.tableHead}>Volume de chuva</th>
                    <th className={styles.tableHead}>Temperatura</th>
                    <th className={styles.tableHead}>Status de alerta</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((entry, index) => (
                    <tr key={index} className={styles.tableRow}>
                      <td className={styles.tableCell}>{entry.date}</td>
                      <td className={styles.tableCell}>{entry.time}</td>
                      <td className={styles.tableCell}>{entry.waterLevel}</td>
                      <td className={styles.tableCell}>{entry.rain}</td>
                      <td className={styles.tableCell}>{entry.temp}</td>
                      <td className={styles.tableCell}>{entry.alert}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HistoryPage;
