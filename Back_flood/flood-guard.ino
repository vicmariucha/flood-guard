// Pinos e sensores
#define SENSOR_CHUVA 33
#define TRIG_PIN 25
#define ECHO_PIN 35
#define LED_STATUS 2

// Altura do pote
const float ALTURA_TOTAL_CM = 10.0;

void setup() {
  Serial.begin(9600); // Comunicação com o computador
  pinMode(SENSOR_CHUVA, INPUT);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(LED_STATUS, OUTPUT);
  
  digitalWrite(LED_STATUS, HIGH);
  Serial.println("🟢 Sistema de monitoramento via serial iniciado");
}

float medirNivelAgua() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  long duracao = pulseIn(ECHO_PIN, HIGH, 1000000);
  if (duracao == 0) {
    return -1;
  }

  float distancia = duracao * 0.034 / 2.0;
  float nivel = ALTURA_TOTAL_CM - distancia;
  return nivel < 0 ? 0 : nivel;
}

void loop() {
  int chuva = analogRead(SENSOR_CHUVA);
  float nivel = medirNivelAgua();

  // Enviar via Serial em formato JSON
  Serial.print("{\"chuva\":");
  Serial.print(chuva);
  Serial.print(",\"nivelAgua\":");
  Serial.print(nivel >= 0 ? nivel : 0);
  Serial.println("}");

  delay(5000); // a cada 5 segundos
}
