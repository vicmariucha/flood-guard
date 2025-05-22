import { useState, useEffect } from "react";
import styles from "./AlertsPage.module.css";
import { AlertCircle, Bell, Plus, Trash2 } from "lucide-react";
import CreateAlertModal from "../components/CreateAlertModal";
import { fetchAlertas, salvarAlerta, deletarAlerta } from "../services/couchdb";

type AlertStatus = "Ativo" | "Resolvido";

interface Alert {
  _id?: string;
  _rev?: string;
  date: string;
  time: string;
  type: string;
  level: "Amarelo" | "Vermelho";
  message: string;
  status: AlertStatus;
}

function AlertasPage() {
  const [alertData, setAlertData] = useState<Alert[]>([]);
  const [showActive, setShowActive] = useState(true);
  const [showResolved, setShowResolved] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const carregarAlertas = async () => {
      const data = await fetchAlertas();
      setAlertData(data.reverse());
    };
    carregarAlertas();
  }, []);

  const handleCreateAlert = async (newAlert: Alert) => {
    const res = await salvarAlerta(newAlert);
    const alertaComId = { ...newAlert, _id: res.id, _rev: res.rev };
    setAlertData((prev) => [alertaComId, ...prev]);
  };

  const handleDeleteAlert = async (id?: string, rev?: string) => {
    if (!id || !rev) return;

    const confirm = window.confirm("Tem certeza que deseja excluir este alerta?");
    if (!confirm) return;

    try {
      await deletarAlerta(id, rev);
      setAlertData((prev) => prev.filter((a) => a._id !== id));
    } catch (error) {
      console.error("Erro ao excluir alerta", error);
    }
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

        <button
          className={styles.newAlertButton}
          onClick={() => setIsModalOpen(true)}
        >
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
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlerts.map((item, i) => (
              <tr key={i}>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>{item.type}</td>
                <td>
                  <span
                    className={`${styles.levelTag} ${styles[item.level.toLowerCase()]}`}
                  >
                    {item.level}
                  </span>
                </td>
                <td>{item.message}</td>
                <td>
                  <span
                    className={`${styles.statusTag} ${styles[item.status.toLowerCase()]}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteAlert(item._id, item._rev)}
                    title="Excluir"
                  >
                    <Trash2 size={16} />
                  </button>
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
