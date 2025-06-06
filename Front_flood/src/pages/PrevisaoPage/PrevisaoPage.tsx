import styles from "./PrevisaoPage.module.css";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { BrainCog, BarChart3 } from "lucide-react";

const chartData = [
  { time: "Agora", level: 32 },
  { time: "+3h", level: 34 },
  { time: "+6h", level: 36 },
  { time: "+9h", level: 37 },
  { time: "+12h", level: 38 },
  { time: "+15h", level: 36 },
  { time: "+18h", level: 34 },
  { time: "+21h", level: 32 },
  { time: "+24h", level: 30 },
];

function PrevisaoPage() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Previsão</h2>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>Previsão de nível da água (próximas 24h)</h3>
          <p className={styles.cardSubtitle}>Dados atualizados em 09/05/2025 às 14:30</p>
        </div>

        <div className={styles.chartArea}>
          <h4 className={styles.chartLabel}>Nível da Água (cm)</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="level" stroke="#0EA5E9" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.bottomCards}>
        <div className={styles.analysisCard}>
          <div className={styles.analysisHeader}>
            <BrainCog size={18} />
            <span className={styles.analysisTitle}>Análise preditiva</span>
          </div>
          <p className={styles.analysisText}>
            Baseado nos dados de precipitação recentes e previsões meteorológicas, o modelo de IA projeta um aumento moderado no nível da água nas próximas 12 horas, com pico previsto para ocorrer às 03:00 de amanhã.
          </p>
          <div className={styles.alertBox}>
            Possibilidade de alerta amarelo nas próximas 9–12 horas.
          </div>
        </div>

        <div className={styles.accuracyCard}>
          <div className={styles.analysisHeader}>
            <BarChart3 size={18} />
            <span className={styles.analysisTitle}>Precisão do modelo</span>
          </div>

          <div className={styles.accuracyRow}>
            <span>Precisão 24h</span>
            <div className={styles.progressBar}><div style={{ width: "92%" }} /></div>
            <span>92%</span>
          </div>
          <div className={styles.accuracyRow}>
            <span>Precisão 48h</span>
            <div className={styles.progressBar}><div style={{ width: "87%" }} /></div>
            <span>87%</span>
          </div>
          <div className={styles.accuracyRow}>
            <span>Precisão 72h</span>
            <div className={styles.progressBar}><div style={{ width: "81%" }} /></div>
            <span>81%</span>
          </div>

          <p className={styles.timestamp}>Última atualização do modelo: 09/05/2025 às 12:00</p>
        </div>
      </div>
    </div>
  );
}

export default PrevisaoPage;
