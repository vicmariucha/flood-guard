import styles from "./WeatherForecast.module.css";
import { Sun, CloudRain, CloudSun, Cloud } from "lucide-react";

const forecastData = [
  { day: "TER", icon: <Sun />, max: "28°C", min: "19°C" },
  { day: "QUA", icon: <Sun />, max: "26°C", min: "16°C" },
  { day: "QUI", icon: <Cloud />, max: "23°C", min: "15°C" },
  { day: "SEX", icon: <CloudSun />, max: "22°C", min: "12°C" },
  { day: "SAB", icon: <Cloud />, max: "25°C", min: "17°C" },
  { day: "DOM", icon: <Sun />, max: "24°C", min: "18°C" },
];

function WeatherForecast() {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Previsão do tempo</h3>
      <div className={styles.grid}>
        {forecastData.map((item) => (
          <div key={item.day} className={styles.dayCard}>
            <span className={styles.day}>{item.day}</span>
            <div className={styles.icon}>{item.icon}</div>
            <span className={styles.temp}>{item.max}</span>
            <span className={styles.tempMin}>{item.min}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherForecast;
