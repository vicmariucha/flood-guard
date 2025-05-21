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
    const header =
      "Data,Hora,Nível da água (cm),Volume de chuva (mm/h)\n";
    const rows = dados
      .map((d) => {
        const data = new Date(d.timestamp);
        const date = data.toLocaleDateString();
        const time = data.toLocaleTimeString();
        return `${date},${time},${d.nivelAgua},${d.chuva}`;
      })
      .join("\n");

    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "historico.csv";
    link.click();
  };

  const chartData = dados.map((item) => ({
    time: new Date(item.timestamp).toLocaleTimeString(),
    nivelAgua: item.nivelAgua,
    chuva: item.chuva,
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
                  <Line
                    type="monotone"
                    dataKey="chuva"
                    stroke="#84CC16"
                    strokeWidth={2}
                    name="Volume de Chuva (mm/h)"
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
                    <th>Volume de chuva (mm/h)</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((entry, index) => {
                    const date = new Date(entry.timestamp);
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
                        <td className={styles.tableCell}>
                          {entry.chuva} mm/h
                        </td>
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
