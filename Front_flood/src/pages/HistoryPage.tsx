import styles from "./HistoryPage.module.css";

function HistoryPage() {
  const data = [
    { date: "19/05/2025", time: "14:00", waterLevel: "32 cm", rain: "20 mm/h", temp: "28°C", alert: "Moderado" },
    { date: "18/05/2025", time: "14:00", waterLevel: "28 cm", rain: "12 mm/h", temp: "26°C", alert: "Baixo" },
    { date: "17/05/2025", time: "14:00", waterLevel: "35 cm", rain: "30 mm/h", temp: "29°C", alert: "Alto" },
    { date: "16/05/2025", time: "14:00", waterLevel: "22 cm", rain: "10 mm/h", temp: "25°C", alert: "Baixo" },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Histórico de Leituras</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Data</th>
            <th>Hora</th>
            <th>Nível da água</th>
            <th>Volume de chuva</th>
            <th>Temperatura</th>
            <th>Status de alerta</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>{entry.time}</td>
              <td>{entry.waterLevel}</td>
              <td>{entry.rain}</td>
              <td>{entry.temp}</td>
              <td>{entry.alert}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryPage;
