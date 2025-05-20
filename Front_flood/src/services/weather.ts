const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const CITY = import.meta.env.VITE_WEATHER_CITY;
const COUNTRY = import.meta.env.VITE_WEATHER_STATE;

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function getCurrentWeather() {
  const res = await fetch(`${BASE_URL}/weather?q=${CITY},${COUNTRY}&appid=${API_KEY}&units=metric&lang=pt_br`);
  if (!res.ok) throw new Error('Erro ao buscar clima atual');
  return await res.json();
}

export async function getForecast() {
  const res = await fetch(`${BASE_URL}/forecast?q=${CITY},${COUNTRY}&appid=${API_KEY}&units=metric&lang=pt_br`);
  if (!res.ok) throw new Error('Erro ao buscar previsão');
  return await res.json();
}
