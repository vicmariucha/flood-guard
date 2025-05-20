import InfoCard from "../components/InfoCard";
import { Droplet, CloudRain, CheckCircle, Thermometer } from "lucide-react";
import styles from "./Dashboard.module.css";
import WaterLevelChart from "../components/WaterLevelChart";
import AlertStatus from "../components/AlertStatus";
import WeatherForecast from "../components/WeatherForecast";
import { useEffect, useState } from "react";
import StationInfoCard from "../components/StationInfoCard";
import WaterLevelAnalysisCard from "../components/WaterLevelAnalysisCard";
import FloodAlertCard from "../components/FloodAlertCard";

type DadosMonitoramento = {
  nivelAgua: number;
  chuva: number;
  timestamp: string;
};

function Dashboard() {
  const [dados, setDados] = useState<DadosMonitoramento | null>(null);
  const [temperatura, setTemperatura] = useState<string>("...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5984/monitoramento/_all_docs?include_docs=true", {
          headers: {
            Authorization: "Basic QXJnb3plOjI1MjgyOQ==",
          },
        });
        const json = await res.json();
        const docs = json.rows;
        const ultimo = docs[docs.length - 1].doc;
        setDados(ultimo);
      } catch (err) {
        console.error("Erro ao buscar dados do CouchDB", err);
      }
    };

    const fetchTemperatura = async () => {
      try {
        const response = await fetch(
          "https://api.openweathermap.org/data/2.5/weather?q=Sorocaba,BR&units=metric&appid=768fbe3a06b08b21e4e4f23d2a924f47"
        );
        const data = await response.json();
        const tempAtual = Math.round(data.main.temp);
        setTemperatura(`${tempAtual}°C`);
      } catch (error) {
        console.error("Erro ao buscar temperatura:", error);
      }
    };

    fetchData();
    fetchTemperatura();

    const interval = setInterval(() => {
      fetchData();
      fetchTemperatura();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.cardsGrid}>
        <InfoCard
          title="Nível da água"
          value={dados ? `${dados.nivelAgua} cm` : "..."}
          description="+30% em relação ao mês anterior"
          highlightColor="#FB923C"
          icon={<Droplet />}
        />
        <InfoCard
          title="Volume de chuva"
          value={dados ? `${dados.chuva} mm/h` : "..."}
          description="+15% em relação ao mês anterior"
          highlightColor="#84CC16"
          icon={<CloudRain />}
        />
        <InfoCard
          title="Status da estação"
          value="Online"
          description="Operacional há 20 dias"
          highlightColor="#22C55E"
          icon={<CheckCircle />}
        />
        <InfoCard
          title="Temperatura"
          value={temperatura}
          description="+2°C em relação ao mês anterior"
          highlightColor="#EF4444"
          icon={<Thermometer />}
        />
      </div>
      <div className={styles.graphAndAlert}>
        <WaterLevelChart />
        <div>
          <AlertStatus nivelAgua={dados?.nivelAgua ?? 0} />
          <WeatherForecast />
        </div>
      </div>
      <div className={styles.bottomGrid}>
        <StationInfoCard />
        <FloodAlertCard />
        <WaterLevelAnalysisCard />
      </div>
    </div>
  );
}

export default Dashboard;