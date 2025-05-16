import styles from "./InfoCard.module.css";
import { ReactNode } from "react";

interface InfoCardProps {
  title: string;
  value: string;
  icon?: ReactNode;
  description?: string;
  highlightColor?: string; // exemplo: "#F97316"
}

function InfoCard({ title, value, icon, description, highlightColor }: InfoCardProps) {
  return (
    <div className={styles.card} style={{ borderLeftColor: highlightColor || "#E5E7EB" }}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {icon && <div className={styles.icon}>{icon}</div>}
      </div>
      <div className={styles.value}>{value}</div>
      {description && <div className={styles.description}>{description}</div>}
    </div>
  );
}

export default InfoCard;
