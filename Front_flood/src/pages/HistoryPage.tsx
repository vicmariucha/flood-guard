import { useState, useRef, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CalendarDays, Download } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./HistoryPage.module.css";
import { createPortal } from "react-dom";
import { fetchMonitoramento } from "../services/couchdb";

// 🧠 Classificação da chuva
function getChuvaStatus(nivel: number) {
  if (nivel > 4000) return "Sem chuva";
  if (nivel > 3000) return "Chuva fraca";
  if (nivel > 2000) return "Chuva moderada";
  if (nivel > 1000) return "Chuva forte";
  return "Chuva muito forte";
}

type DadosMonitoramento = {
  nivelAgua: number;
  chuva: number;
  timestamp: string;
};

function HistoryPage() {
  const [activeTab, setActiveTab] = useState("grafico");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [dados, setDados] = useState<DadosMonitoramento[]>([]);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const carregarDados = async () => {
      const historico = await fetchMonitoramento();
      setDados(
        historico.sort(
          (a: DadosMonitoramento, b: DadosMonitoramento) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        )
      );
    };
    carregarDados();
  }, []);

  const exportToCSV = () => {
    const header = "Data,Hora,Nível da água (cm),Status da chuva\n";
    const rows = filteredData
      .map((d) => {
        const data = new Date(d.timestamp);
        const date = data.toLocaleDateString();
        const time = data.toLocaleTimeString();
        const statusChuva = getChuvaStatus(d.chuva);
        return `${date},${time},${d.nivelAgua},${statusChuva}`;
      })
      .join("\n");

    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "historico.csv";
    link.click();
  };

  // 🧠 Filtra os dados com base na data selecionada
  const filteredData = startDate
    ? dados.filter((item) => {
        const itemDate = new Date(item.timestamp);
        return (
          itemDate.getDate() === startDate.getDate() &&
          itemDate.getMonth() === startDate.getMonth() &&
          itemDate.getFullYear() === startDate.getFullYear()
        );
      })
    : dados;

  const chartData = filteredData.map((item) => ({
    time: new Date(item.timestamp).toLocaleTimeString(),
    nivelAgua: item.nivelAgua,
  }));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Histórico de Dados</h2>
        <div className={styles.actions}>
          <button
            ref={buttonRef}
            className={styles.dateFilterButton}
            onClick={() => setOpen(!open)}
          >
            <CalendarDays size={16} /> Filtrar por data
          </button>

          {open &&
            createPortal(
              <div
                style={{
                  position: "absolute",
                  top:
                    buttonRef.current!.getBoundingClientRect().bottom +
                    window.scrollY +
                    8,
                  left:
                    buttonRef.current!.getBoundingClientRect().left +
                    window.scrollX,
                  zIndex: 9999,
                }}
              >
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    setOpen(false);
                  }}
                  inline
                  calendarClassName={styles.customDatepicker}
                  dateFormat="dd/MM/yyyy"
                />
              </div>,
              document.body
            )}

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
                  <Line
                    type="monotone"
                    dataKey="nivelAgua"
                    stroke="#0EA5E9"
                    strokeWidth={2}
                    name="Nível da Água (cm)"
                  />
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
                    <th>Data</th>
                    <th>Hora</th>
                    <th>Nível da água (cm)</th>
                    <th>Status da chuva</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((entry, index) => {
                    const date = new Date(entry.timestamp);
                    const statusChuva = getChuvaStatus(entry.chuva);
                    return (
                      <tr key={index} className={styles.tableRow}>
                        <td className={styles.tableCell}>
                          {date.toLocaleDateString()}
                        </td>
                        <td className={styles.tableCell}>
                          {date.toLocaleTimeString()}
                        </td>
                        <td className={styles.tableCell}>
                          {entry.nivelAgua} cm
                        </td>
                        <td className={styles.tableCell}>{statusChuva}</td>
                      </tr>
                    );
                  })}
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
