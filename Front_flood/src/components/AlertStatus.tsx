import styles from "./AlertStatus.module.css";
import { AlertTriangle } from "lucide-react";

function AlertStatus() {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.iconCircle}>
          <AlertTriangle size={20} color="#EF6C00" />
        </div>
        <span className={styles.title}>Status de alerta</span>
        <div className={styles.badge}>Alerta</div>
      </div>
      <div className={styles.progressWrapper}>
        <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: "75%" }}></div>
        </div>
        <span className={styles.progressValue}>75%</span>
    </div>

      <p className={styles.description}>
        Nível de água próximo ao limite crítico. <br />
        Monitoramento contínuo necessário
      </p>
    </div>
  );
}

export default AlertStatus;
