import { useState } from "react";
import styles from "./AlertsPage.module.css";
import { AlertCircle, Bell, Filter, Plus } from "lucide-react";
import CreateAlertModal from "../components/CreateAlertModal";

type AlertStatus = "Ativo" | "Resolvido";

interface Alert {
  date: string;
  time: string;
  type: string;
  level: "Amarelo" | "Vermelho";
  message: string;
  status: AlertStatus;
}

function AlertasPage() {
  const [alertData, setAlertData] = useState<Alert[]>([
    {
      date: "2025-05-09",
      time: "12:30",
      type: "Nível de água",
      level: "Amarelo",
      message: "Nível da água acima de 30cm. Monitoramento contínuo necessário.",
      status: "Ativo",
    },
    {
      date: "2025-05-09",
      time: "08:15",
      type: "Volume de chuva",
      level: "Amarelo",
      message: "Precipitação acima de 40mm/h nas últimas 2 horas.",
      status: "Ativo",
    },
    {
      date: "2025-05-08",
      time: "22:45",
      type: "Volume de chuva",
      level: "Vermelho",
      message: "Precipitação crítica acima de 60mm/h por mais de 3 horas.",
      status: "Resolvido",
    },
    {
      date: "2025-05-07",
      time: "16:20",
      type: "Nível de água",
      level: "Vermelho",
      message: "Nível crítico alcançado. Risco de inundação iminente.",
      status: "Resolvido",
    },
    {
      date: "2025-05-06",
      time: "10:05",
      type: "Falha de estação",
      level: "Amarelo",
      message: "Estação Centro offline por mais de 30 minutos.",
      status: "Resolvido",
    },
  ]);

  const [showActive, setShowActive] = useState(true);
  const [showResolved, setShowResolved] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateAlert = (newAlert: Alert) => {
    setAlertData((prev) => [newAlert, ...prev]);
  };

  const filteredAlerts = alertData.filter((alert) => {
    if (alert.status === "Ativo" && showActive) return true;
    if (alert.status === "Resolvido" && showResolved) return true;
    return false;
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Alertas</h2>

      <div className={styles.filterSection}>
        <label>
          <input
            type="checkbox"
            checked={showActive}
            onChange={() => setShowActive((prev) => !prev)}
          />{" "}
          Alertas ativos
        </label>
        <label>
          <input
            type="checkbox"
            checked={showResolved}
            onChange={() => setShowResolved((prev) => !prev)}
          />{" "}
          Alertas resolvidos
        </label>


        <button className={styles.newAlertButton} onClick={() => setIsModalOpen(true)}>
          <Plus size={16} /> Novo alerta
        </button>
      </div>

      {alertData.some((a) => a.status === "Ativo") && (
        <div className={styles.alertCard}>
          <AlertCircle className={styles.icon} />
          <div>
            <strong>Alerta ativo</strong>
            <p>Há alertas ativos que exigem atenção</p>
          </div>
        </div>
      )}

      <div className={styles.historyCard}>
        <div className={styles.cardHeader}>
          <Bell size={18} />
          <h3>Histórico de alertas</h3>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Data</th>
              <th>Hora</th>
              <th>Tipo</th>
              <th>Nível</th>
              <th>Mensagem</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlerts.map((item, i) => (
              <tr key={i}>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>{item.type}</td>
                <td>
                  <span className={`${styles.levelTag} ${styles[item.level.toLowerCase()]}`}>
                    {item.level}
                  </span>
                </td>
                <td>{item.message}</td>
                <td>
                  <span className={`${styles.statusTag} ${styles[item.status.toLowerCase()]}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <CreateAlertModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateAlert}
        />
      )}
    </div>
  );
}

export default AlertasPage;
