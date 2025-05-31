import styles from "./WaterLevelAnalysisCard.module.css";
import { CheckCircle } from "lucide-react";

function WaterLevelAnalysisCard() {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Análise nível da água</h3>
      <div className={styles.list}>
        <div className={styles.item}>
          <CheckCircle size={14} />
          <span>
            <strong>Média mensal esperada:</strong> 22cm
          </span>
        </div>
        <div className={styles.item}>
          <CheckCircle size={14} />
          <span>
            <strong>Média mensal observada:</strong> 32cm
          </span>
        </div>
      </div>
      <p className={styles.alert}>+45% acima da média histórica</p>
    </div>
  );
}

export default WaterLevelAnalysisCard;
