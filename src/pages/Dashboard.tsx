import InfoCard from "../components/InfoCard";
import { Droplet, CloudRain, CheckCircle, Thermometer } from "lucide-react";
import styles from "./Dashboard.module.css";
import WaterLevelChart from "../components/WaterLevelChart";
import AlertStatus from "../components/AlertStatus";
import WeatherForecast from "../components/WeatherForecast";

function Dashboard() {
  return (
    <div className={styles.container}>
      <div className={styles.cardsGrid}>
        <InfoCard
          title="Nível da água"
          value="32 cm"
          description="+30% em relação ao mês anterior"
          highlightColor="#FB923C" // laranja
          icon={<Droplet />}
        />
        <InfoCard
          title="Volume de chuva"
          value="42 mm/h"
          description="+15% em relação ao mês anterior"
          highlightColor="#84CC16" // verde
          icon={<CloudRain />}
        />
        <InfoCard
          title="Status da estação"
          value="Online"
          description="Operacional há 20 dias"
          highlightColor="#22C55E" // verde escuro
          icon={<CheckCircle />}
        />
        <InfoCard
          title="Temperatura"
          value="28°C"
          description="+2°C em relação ao mês anterior"
          highlightColor="#EF4444" // vermelho
          icon={<Thermometer />}
        />
      </div>
      <div className={styles.graphAndAlert}>
        <WaterLevelChart />
        <div>
          <AlertStatus />
          <WeatherForecast />
        </div>
      </div>


    </div>
  );
}

export default Dashboard;
