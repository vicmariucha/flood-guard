import styles from "./FloodAlertCard.module.css";
import { Waves } from "lucide-react";

function FloodAlertCard() {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Alerta de enchente</h3>
      <div className={styles.alert}>
        <Waves size={24} className={styles.icon} />
        <div className={styles.texts}>
          <p className={styles.alertTitle}>Risco de enchente moderado</p>
          <p className={styles.alertDescription}>
            Precipitação acima da média nos últimos 3 dias. Monitoramento ativo em andamento
          </p>
        </div>
      </div>
    </div>
  );
}

export default FloodAlertCard;
