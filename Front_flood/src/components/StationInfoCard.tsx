import styles from "./StationInfoCard.module.css";
import { MapPin } from "lucide-react";

function StationInfoCard() {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Estação Principal</h3>
      <span className={styles.status}>● Online</span>

      <div className={styles.location}>
        <MapPin size={16} />
        <span className={styles.subtitle}>Localização</span>
        <span className={styles.coords}>-23.5505, -47.4558</span>
      </div>
      <p className={styles.timestamp}>Última atualização: 10 minutos atrás</p>
    </div>
  );
}

export default StationInfoCard;
