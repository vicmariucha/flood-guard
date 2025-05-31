import styles from "./AlertStatus.module.css";
import { AlertTriangle } from "lucide-react";

interface AlertStatusProps {
  nivelAgua: number;
}

function AlertStatus({ nivelAgua }: AlertStatusProps) {
  // Exemplo simples: se nível for maior que 30cm, alertar mais forte
  const progress = Math.min((nivelAgua / 40) * 100, 100); // Assume 40cm como o máximo
  const alerta = progress >= 75;

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.iconCircle}>
          <AlertTriangle size={20} color="#EF6C00" />
        </div>
        <span className={styles.title}>Status de alerta</span>
        <div className={styles.badge}>{alerta ? "Alerta" : "Normal"}</div>
      </div>

      <div className={styles.progressWrapper}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className={styles.progressValue}>{Math.round(progress)}%</span>
      </div>

      <p className={styles.description}>
        {alerta
          ? "Nível de água próximo ao limite crítico.\nMonitoramento contínuo necessário"
          : "Nível de água dentro da normalidade."}
      </p>
    </div>
  );
}

export default AlertStatus;
