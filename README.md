# Hydroponic IIOT 🌱💧  

**Hydroponic IIOT** is an **Internet of Things (IoT)** project designed to monitor and automate a hydroponic system using environmental sensors.

## 🚀 Features  
- **Sensor Monitoring**: Uses **DHT22, LDR, and TDS sensors** to measure temperature, humidity, and water conductivity.  
- **Real-time Data**: Displays real-time sensor data using **MQTT**.  
- **Pump Control**: Users can control water pumps via a web interface with **MQTT**.  
- **REST API**: Backend built with **Node.js & Express** for communication with ESP32.  

## 🏗️ Technologies Used  
- **ESP32** for sensor readings and data transmission.  
- **Node.js + Express** for backend API.  
- **React.js** for the user interface.  
- **MySQL** as the database to store historical sensor data.  
- **WebSocket** for real-time communication.  

## 📸 User Interface Preview  
![Dashboard Preview](https://via.placeholder.com/800x400.png?text=Dashboard+Screenshot)  

## 🔧 Installation  
1. **Clone this repository**  
   ```sh
   git clone https://github.com/AgielF/hydroponicIIOT.git
   cd hydroponicIIOT

cd backend

npm install

cd ../frontend

npm install
