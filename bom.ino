#include <WiFi.h>
#include <PubSubClient.h>

// Wi-Fi
const char* ssid = "ROBE_2G";
const char* password = "Gugu2903";
const char* mqtt_server = "192.168.0.242";

WiFiClient espClient;
PubSubClient client(espClient);

// Pinos dos sensores
#define SENSOR_CHUVA 33
#define TRIG_PIN 34
#define ECHO_PIN 35
#define LED_STATUS 2

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Conectando ao Wi-Fi: ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);
  int tentativas = 0;
  while (WiFi.status() != WL_CONNECTED && tentativas < 20) {
    delay(500);
    Serial.print(".");
    tentativas++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n✅ Wi-Fi conectado!");
    Serial.print("IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\n❌ Falha ao conectar no Wi-Fi.");
  }
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Tentando conectar ao MQTT...");
    if (client.connect("ESP32SensorNode")) {
      Serial.println("Conectado ao MQTT!");
    } else {
      Serial.print("Erro, rc=");
      Serial.print(client.state());
      Serial.println(" Tentando novamente em 5 segundos...");
      delay(5000);
    }
  }
}


float medirDistancia() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  long duracao = pulseIn(ECHO_PIN, HIGH, 30000); 

  if (duracao == 0) {
    Serial.println("⚠️  Nenhum eco recebido (timeout).");
    return -1; 
  }

  float distancia_cm = duracao * 0.034 / 2.0;
  return distancia_cm;
}

void setup() {
  Serial.begin(115200);
  pinMode(SENSOR_CHUVA, INPUT);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(LED_STATUS, OUTPUT);

  setup_wifi();
  client.setServer(mqtt_server, 1883);

  Serial.println("🟢 Sistema iniciado");
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  int chuva = analogRead(SENSOR_CHUVA);
  float nivel = medirDistancia();

  Serial.print("🌧️ Chuva (analog): ");
  Serial.println(chuva);

  if (nivel >= 0) {
    Serial.print("📏 Nível da água: ");
    Serial.print(nivel);
    Serial.println(" cm");
  } else {
    Serial.println("📏 Nível da água: ERRO");
  }

  // Publica os dados no MQTT
  bool pub1 = client.publish("Sensor/Chuva", String(chuva).c_str());
  bool pub2 = client.publish("Sensor/NivelAgua", nivel >= 0 ? String(nivel).c_str() : "erro");

  digitalWrite(LED_STATUS, pub1 && pub2 ? HIGH : LOW);

  delay(2000);
}
