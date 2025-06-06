//  Pinos dos sensores
#define SENSOR_CHUVA 33
#define TRIG_PIN 25
#define ECHO_PIN 35
#define LED_STATUS 2

//  Altura do recipiente (em cm)
const float ALTURA_TOTAL_CM = 40.0;

void setup() {
  Serial.begin(9600);
  pinMode(SENSOR_CHUVA, INPUT);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(LED_STATUS, OUTPUT);

  digitalWrite(LED_STATUS, HIGH);
  Serial.println("Sistema de monitoramento iniciado");
}

//  Função para medir o nível de água (em cm)
float medirNivelAgua() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  long duracao = pulseIn(ECHO_PIN, HIGH, 1000000);
  if (duracao == 0) {
    return 0;
  }

  float distancia = duracao * 0.034 / 2.0;
  float nivel = ALTURA_TOTAL_CM - distancia;

  // Garante que não ultrapasse os limites
  if (nivel < 0) nivel = 0;
  if (nivel > ALTURA_TOTAL_CM) nivel = ALTURA_TOTAL_CM;

  return nivel;
}

//  Função para medir a umidade do sensor de chuva (0 a 4095)
float medirChuva() {
  int leitura = analogRead(SENSOR_CHUVA);
  return leitura; // Mantemos o valor bruto para avaliação no frontend
}

void loop() {
  float nivel = medirNivelAgua();
  float chuva = medirChuva();

  // Enviar via Serial em formato JSON
  String json = "{";
  json += "\"nivelAgua\":" + String(nivel, 2) + ",";
  json += "\"chuva\":" + String(chuva, 0);
  json += "}";

  Serial.println(json);

  // Intervalo de leitura (a cada 1 minuto)
  delay(60000);
}
