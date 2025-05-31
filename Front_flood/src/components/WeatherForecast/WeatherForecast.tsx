// src/components/WeatherForecast.tsx
import { useEffect, useState } from "react";
import styles from "./WeatherForecast.module.css";
import { Sun, CloudRain, Cloud, ThermometerSun } from "lucide-react";

interface ForecastDay {
  date: string;
  icon: JSX.Element;
  max: number;
  min: number;
}

const WeatherForecast = () => {
  const [forecast, setForecast] = useState<ForecastDay[]>([]);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=Sorocaba,BR&appid=768fbe3a06b08b21e4e4f23d2a924f47&units=metric&cnt=40`
        );
        const data = await response.json();

        const dailyMap = new Map<string, ForecastDay>();

        for (const item of data.list) {
          const date = item.dt_txt.split(" ")[0];
          const tempMax = item.main.temp_max;
          const tempMin = item.main.temp_min;
          const condition = item.weather[0].main.toLowerCase();

          let icon = <Sun />;
          if (condition.includes("rain")) icon = <CloudRain />;
          else if (condition.includes("cloud")) icon = <Cloud />;
          else if (condition.includes("clear")) icon = <Sun />;

          if (!dailyMap.has(date)) {
            dailyMap.set(date, {
              date,
              icon,
              max: tempMax,
              min: tempMin,
            });
          } else {
            const prev = dailyMap.get(date)!;
            prev.max = Math.max(prev.max, tempMax);
            prev.min = Math.min(prev.min, tempMin);
          }
        }

        const result = Array.from(dailyMap.values()).slice(0, 5);
        setForecast(result);
      } catch (error) {
        console.error("Erro ao buscar previsão do tempo:", error);
      }
    };

    fetchForecast();
  }, []);

  return (
    <div className={styles.forecastBox}>
      <h3>Previsão do tempo</h3>
      <div className={styles.gridForecast}>
        {forecast.map((day) => (
          <div key={day.date} className={styles.dayBox}>
            <div className={styles.icon}>{day.icon}</div>
            <strong>{new Date(day.date).toLocaleDateString("pt-BR", { weekday: "short" }).toUpperCase()}</strong>
            <span>{Math.round(day.max)}°C</span>
            <small>{Math.round(day.min)}°C</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
