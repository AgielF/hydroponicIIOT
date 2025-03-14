1. #include <Wire.h>
2. #include <LiquidCrystal_I2C.h>
3. #include <WiFi.h>
4. #include <WiFiClientSecure.h>
5. #include <PubSubClient.h>
6. #include <DHT.h>
7. #include <OneWire.h>
8. #include <DallasTemperature.h>
9. #include <HTTPClient.h>
10.
11. // 🔧 Konfigurasi WiFi
12. const char* ssid = "testiot"; // Ganti dengan SSID WiFi Anda
13. const char* password = "12345678"; // Ganti dengan password WiFi Anda
14.
15. // 🔐 Konfigurasi HiveMQ Cloud (MQTT)
16. const char* mqttServer = "59f50390d66445d5a41d5b65371a1085.s1.eu.hivemq.cloud";
17. const int mqttPort = 8883;
18. const char* mqttUser = "plantsociety";
19. const char* mqttPassword = "Timhura2025";
20.
21. // 🌐 Base URL REST API (ganti dengan URL ngrok Anda)
22. const String baseURL = "https://872c-114-124-215-162.ngrok-free.app/api";
23.
24. // 🔄 Timer untuk mengirim data ke REST API setiap 5 menit
25. unsigned long lastRestApiPostTime = 0;
26. const unsigned long restApiInterval = 300000; // 5 menit dalam milidetik
27.
28. // 🖥 Konfigurasi DHT22
29. #define DHTPIN 32
30. #define DHTTYPE DHT22
31. DHT dht(DHTPIN, DHTTYPE);
32.
33. // 🖥 Konfigurasi TDS Sensor
34. #define TdsSensorPin 34
35. #define VREF 3.3 // Reference voltage for ESP32 ADC
36. #define SCOUNT 30 // Number of sample points for TDS
37. int analogBuffer[SCOUNT];
38. int analogBufferTemp[SCOUNT];
39. int analogBufferIndex = 0, copyIndex = 0;
40. float averageVoltage = 0, tdsValue = 0;
41.
42. // 🖥 Konfigurasi DS18B20 untuk Suhu Air
43. #define ONE_WIRE_BUS 27
44. OneWire oneWire(ONE_WIRE_BUS);
45. DallasTemperature sensors(&oneWire);
46. float waterTemperature = 0;
47.
48. // 📊 Konfigurasi PH Sensor
49. const int ph_pin = 33;
50. float Po = 0;
51. float PH_step;
52. int nilai_analog_PH;
53. double TeganganPh;
54. float PH4 = 3.68;
55. float PH7 = 3.35;
56.
57. //Konfigurasi LDR sensor (kecerahan)
58. const int LDR_PIN = 35;
59.
60. // 🖲 Konfigurasi pin relay
61. #define RELAY1 16
62. #define RELAY2 5
63. #define RELAY3 18
64. #define RELAY4 19
65.
66. // 📡 MQTT Client
67. WiFiClientSecure espClient;
68. PubSubClient client(espClient);
69.
70. // 🔤 LCD I2C
71. LiquidCrystal_I2C lcd(0x27, 16, 2); // Alamat I2C biasanya 0x27
72.
73. void setup() {
74. // 🔌 Serial untuk debugging
75. Serial.begin(9600);
76.
77. // 🔤 Inisialisasi I2C dengan pin SDA dan SCL
78. Wire.begin(21, 22);
79.
80. // 🔤 Inisialisasi LCD
81. lcd.init();
82. lcd.backlight();
83. lcd.setCursor(0, 0);
84. lcd.print("WiFi Connecting...");
85.
86. // 🔌 Koneksi WiFi
87. Serial.println("Connecting to WiFi...");
88. WiFi.begin(ssid, password);
89. while (WiFi.status() != WL_CONNECTED) {
90. delay(1000);
91. Serial.print(".");
92. lcd.setCursor(0, 1);
93. lcd.print("WiFi: Connecting");
94. }
95. Serial.println("\nConnected to WiFi!");
96. lcd.setCursor(0, 0);
97. lcd.print("WiFi Connected ");
98.
99. // 🔐 Konfigurasi TLS untuk MQTT
100. espClient.setInsecure();
101. client.setServer(mqttServer, mqttPort);
102. client.setCallback(mqttCallback);
103.
104. connectToMQTT();
105.
106. // 🔧 Inisialisasi sensor
107. dht.begin();
108. sensors.begin();
109.
110. // 🔧 Inisialisasi relay
111. pinMode(RELAY1, OUTPUT);
112. pinMode(RELAY2, OUTPUT);
113. pinMode(RELAY3, OUTPUT);
114. pinMode(RELAY4, OUTPUT);
115.
116. // Innisialisasi LDR Sensor
117. pinMode(LDR_PIN, INPUT);
118. // 🔧 Inisialisasi PH Sensor
119. pinMode(ph_pin, INPUT);
120. }
121.
122. void loop() {
123. if (!client.connected()) {
124. connectToMQTT();
125. }
126. client.loop();
127.
128. // ⏱ Kirim data ke REST API setiap 5 menit
129. if (millis() - lastRestApiPostTime >= restApiInterval) {
130. lastRestApiPostTime = millis();
131.
132. // 📊 Ambil data sensor
133. float suhuUdara = dht.readTemperature();
134. float kelembabanUdara = dht.readHumidity();
135. int ldrValue = analogRead(LDR_PIN);
136. float brightness = map(ldrValue, 0, 4095, 100, 0);
137.
138. // 🔧 Kirim data ke REST A
139. sendDataToRestAPI("/sensor-dht22", "{\"suhuUdara\":" + String(suhuUdara) +
",\"kelembabanUdara\":" + String(kelembabanUdara) + "}");
140. sendDataToRestAPI("/sensor-ldr", "{\"ldrValue\":" + String(brightness) + "}");
141. sendDataToRestAPI("/sensor-air-temperature", "{\"suhuAir\":" +
String(waterTemperature) + "}");
142. sendDataToRestAPI("/sensor-ec", "{\"tdsValue\":" + String(tdsValue) + "}");
143. sendDataToRestAPI("/sensor-ph", "{\"phValue\":" + String(Po) + "}");
144.
145. Serial.println("[REST API] Data sensor dikirim!");
146. }
147.
148. // 📡 Kirim data realtime ke MQTT setiap 1 detik
149. static unsigned long lastRealtimePublishTime = 0;
150. if (millis() - lastRealtimePublishTime >= 1000) {
151. lastRealtimePublishTime = millis();
152. sendRealtimeSensorDataToMQTT();
153. }
154.
155. // 🔧 Baca data dari sensor lainnya
156. readTDSSensor();
157. readWaterTemperature();
158. readPHSensor();
159.
160.
161. }
162.
163. void connectToMQTT() {
164. while (!client.connected()) {
165. Serial.println("Connecting to MQTT...");
166. lcd.setCursor(0, 1);
167. lcd.print("MQTT: Connecting ");
168. if (client.connect("ESP32Client", mqttUser, mqttPassword)) {
169. Serial.println("Connected to MQTT!");
170. lcd.setCursor(0, 1);
171. lcd.print("MQTT: Connected ");
172. client.subscribe("hidroponik/relay1");
173. client.subscribe("hidroponik/relay2");
174. client.subscribe("hidroponik/relay3");
175. client.subscribe("hidroponik/relay4");
176. } else {
177. Serial.print("Failed to connect to MQTT. State: ");
178. Serial.println(client.state());
179. lcd.setCursor(0, 1);
180. lcd.print("MQTT: Failed ");
181. delay(5000);
182. }
183. }
184. }
185.
186. void mqttCallback(char* topic, byte* payload, unsigned int length) {
187. String message;
188. for (int i = 0; i < length; i++) {
189. message += (char)payload[i];
190. }
191.
192. Serial.print("Message arrived on topic: ");
193. Serial.println(topic);
194. Serial.print("Message: ");
195. Serial.println(message);
196.
197. // Kontrol relay berdasarkan pesan
198. if (String(topic) == "hidroponik/relay1") {
199. if (message == "ON") {
200. digitalWrite(RELAY1, HIGH);
201. Serial.println("Relay 1 ON");
202. lcd.setCursor(0, 1);
203. lcd.print("Relay1: ON ");
204. } else if (message == "OFF") {
205. digitalWrite(RELAY1, LOW);
206. Serial.println("Relay 1 OFF");
207. lcd.setCursor(0, 1);
208. lcd.print("Relay1: OFF ");
209. }
210. } else if (String(topic) == "hidroponik/relay2") {
211. if (message == "ON") {
212. digitalWrite(RELAY2, HIGH);
213. Serial.println("Relay 2 ON");
214. lcd.setCursor(0, 1);
215. lcd.print("Relay2: ON ");
216. delay(7100);
217. digitalWrite(RELAY2, LOW);
218. Serial.println("Relay 2 OFF");
219. lcd.setCursor(0, 1);
220. lcd.print("Relay2: OFF ");
221. }
222. } else if (String(topic) == "hidroponik/relay3") {
223. if (message == "ON") {
224. digitalWrite(RELAY3, HIGH);
225. Serial.println("Relay 3 ON");
226. lcd.setCursor(0, 1);
227. lcd.print("Relay3: ON ");
228. delay(3550);
229. digitalWrite(RELAY3, LOW);
230. Serial.println("Relay 3 OFF");
231. lcd.setCursor(0, 1);
232. lcd.print("Relay3: OFF ");
233. }
234. } else if (String(topic) == "hidroponik/relay4") {
235. if (message == "ON") {
236. digitalWrite(RELAY4, HIGH);
237. Serial.println("Relay 4 ON");
238. lcd.setCursor(0, 1);
239. lcd.print("Relay4: ON ");
240. delay(3550);
241. digitalWrite(RELAY4, LOW);
242. Serial.println("Relay 4 OFF");
243. lcd.setCursor(0, 1);
244. lcd.print("Relay4: OFF ");
245. }
246. }
247. }
248.
249. void sendRealtimeSensorDataToMQTT() {
250. float suhuUdara = dht.readTemperature();
251. float kelembabanUdara = dht.readHumidity();
252. int ldrValue = analogRead(LDR_PIN);
253. float brightness = map(ldrValue, 0, 4095, 100, 0);
254.
255. if (isnan(suhuUdara) || isnan(kelembabanUdara)) {
256. Serial.println("[ERROR] Failed to read from DHT sensor!");
257. return;
258. }
259.
260. String payload = "{";
261. payload += "\"suhuUdara\":" + String(suhuUdara) + ",";
262. payload += "\"kelembabanUdara\":" + String(kelembabanUdara) + ",";
263. payload += "\"suhuAir\":" + String(waterTemperature) + ",";
264. payload += "\"tdsValue\":" + String(tdsValue) + ",";
265. payload += "\"phValue\":" + String(Po) + ",";
266. payload += "\"ldrValue\":" + String(brightness);
267. payload += "}";
268.
269. client.publish("hidroponik/realtimeSensorData", payload.c_str());
270. Serial.println("[MQTT] Realtime data sensor dikirim!");
271. }
272.
273. void sendDataToRestAPI(String endpoint, String jsonData) {
274. HTTPClient http;
275. String url = baseURL + endpoint;
276.
277. http.begin(url);
278. http.addHeader("Content-Type", "application/json");
279.
280. int httpResponseCode = http.POST(jsonData);
281. if (httpResponseCode > 0) {
282. Serial.print("[HTTP] Response code: ");
283. Serial.println(httpResponseCode);
284. } else {
285. Serial.print("[HTTP] Error: ");
286. Serial.println(httpResponseCode);
287. }
288.
289. http.end();
290. }
291.
292. void readTDSSensor() {
293. static unsigned long analogSampleTimepoint = millis();
294. if (millis() - analogSampleTimepoint > 40U) {
295. analogSampleTimepoint = millis();
296. analogBuffer[analogBufferIndex] = analogRead(TdsSensorPin);
297. analogBufferIndex++;
298. if (analogBufferIndex == SCOUNT) analogBufferIndex = 0;
299. }
300.
301. static unsigned long printTimepoint = millis();
302. if (millis() - printTimepoint > 800U) {
303. printTimepoint = millis();
304. for (copyIndex = 0; copyIndex < SCOUNT; copyIndex++) {
305. analogBufferTemp[copyIndex] = analogBuffer[copyIndex];
306. }
307.
308. averageVoltage = getMedianNum(analogBufferTemp, SCOUNT) * (float)VREF /
4096.0;
309. float compensationCoefficient = 1.0 + 0.02 * (waterTemperature - 25.0);
310. float compensationVoltage = averageVoltage / compensationCoefficient;
311. tdsValue = (133.42 * compensationVoltage * compensationVoltage *
compensationVoltage) -
312. (255.86 * compensationVoltage * compensationVoltage) + (857.39 *
compensationVoltage);
313.
314. Serial.print("Water Temperature: ");
315. Serial.print(waterTemperature);
316. Serial.print(" °C, TDS Value: ");
317. Serial.print(tdsValue, 0);
318. Serial.println(" ppm");
319.
320. lcd.setCursor(0, 0);
321. lcd.print("TDS: ");
322. lcd.print(tdsValue, 0);
323. lcd.print(" ppm ");
324. }
325. }
326.
327. void readWaterTemperature() {
328. sensors.requestTemperatures();
329. waterTemperature = sensors.getTempCByIndex(0);
330.
331. if (waterTemperature == DEVICE_DISCONNECTED_C) {
332. Serial.println("[ERROR] Sensor suhu air tidak terdeteksi!");
333. } else {
334. Serial.print("Suhu Air: ");
335. Serial.print(waterTemperature);
336. Serial.println(" °C");
337. lcd.setCursor(0, 0);
338. lcd.print("Water Temp: ");
339. lcd.print(waterTemperature);
340. lcd.print(" C ");
341. }
342. }
343.
344. void readPHSensor() {
345. nilai_analog_PH = analogRead(ph_pin);
346. TeganganPh = 3.3 / 4096.0 * nilai_analog_PH;
347.
348. PH_step = (PH4 - PH7) / 2.5;
349. Po = 0 + ((PH7 - TeganganPh) / PH_step);
350.
351. Serial.print("Nilai ADC PH: ");
352. Serial.println(nilai_analog_PH);
353. Serial.print("Tegangan PH: ");
354. Serial.println(TeganganPh, 3);
355. Serial.print("Nilai PH: ");
356. Serial.println(Po, 2);
357.
358. lcd.setCursor(0, 1);
359. lcd.print("PH: ");
360. lcd.print(Po, 2);
361. lcd.print(" ");
362. }
363.
364. int getMedianNum(int bArray[], int iFilterLen) {
365. int bTab[iFilterLen];
366. for (byte i = 0; i < iFilterLen; i++) bTab[i] = bArray[i];
367.
368. int i, j, bTemp;
369. for (j = 0; j < iFilterLen - 1; j++) {
370. for (i = 0; i < iFilterLen - j - 1; i++) {
371. if (bTab[i] > bTab[i + 1]) {
372. bTemp = bTab[i];
373. bTab[i] = bTab[i + 1];
374. bTab[i + 1] = bTemp;
375. }
376. }
377. }
378.
379. if ((iFilterLen & 1) > 0)
380. bTemp = bTab[(iFilterLen - 1) / 2];
381. else
382. bTemp = (bTab[iFilterLen / 2] + bTab[iFilterLen / 2 - 1]) / 2;
383.
384. return bTemp;
385. }