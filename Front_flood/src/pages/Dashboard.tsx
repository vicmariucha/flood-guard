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

// 🧠 Função utilitária para classificar o status da chuva (baseado em 0 a 4095 convertido para %)
function getChuvaStatus(nivel: number) {
  if (nivel > 4000) return "Sem chuva";
  if (nivel > 3000) return "Chuva fraca";
  if (nivel > 2000) return "Chuva moderada";
  if (nivel > 1000) return "Chuva forte";
  return "Chuva muito forte";
}


// 📦 Tipagem dos dados do banco
type DadosMonitoramento = {
  chuva: number;       // Sensor de chuva (0 a 4095)
  nivelAgua: number;   // Nível da água no recipiente (cm)
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
    }, 10000); // Atualiza a cada 10 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.cardsGrid}>
        <InfoCard
          title="Status da chuva"
          value={dados ? getChuvaStatus(dados.chuva) : "Carregando..."}
          description="Última medição em tempo real"
          highlightColor="#0EA5E9"
          icon={<Droplet />}
        />
        <InfoCard
          title="Volume de chuva"
          value={dados ? `${dados.nivelAgua.toFixed(2)} cm` : "0.00 cm"}
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
