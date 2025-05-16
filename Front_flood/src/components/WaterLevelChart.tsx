import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
  } from "recharts";
  
  const data = [
    { time: "08h", level: 24 },
    { time: "09h", level: 28 },
    { time: "10h", level: 30 },
    { time: "11h", level: 34 },
    { time: "12h", level: 32 },
    { time: "13h", level: 31 },
    { time: "14h", level: 35 },
  ];
  
  function WaterLevelChart() {
    return (
      <div style={{ background: "#fff", padding: "1rem", borderRadius: "10px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <h3 style={{ marginBottom: "1rem", fontSize: "16px", color: "#0D1622" }}>Nível da água (cm)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="time" />
            <YAxis unit=" cm" />
            <Tooltip />
            <Line type="monotone" dataKey="level" stroke="#00B4B2" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
  export default WaterLevelChart;
  