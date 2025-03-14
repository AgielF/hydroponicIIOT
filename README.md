# Hydroponic IIOT 🌱💧  

**Hydroponic IIOT** adalah proyek berbasis **Internet of Things (IoT)** yang menghubungkan sensor lingkungan dengan sistem hidroponik untuk pemantauan dan otomatisasi.

## 🚀 Fitur  
- **Monitoring Sensor**: Menggunakan **DHT22, LDR, dan TDS sensor** untuk membaca suhu, kelembaban, dan tingkat konduktivitas air.  
- **Real-time Data**: Data ditampilkan secara real-time menggunakan **MQTT**.  
- **Kendali Pompa**: Pengguna dapat mengontrol pompa air melalui antarmuka web.  
- **REST API**: Backend dibangun dengan **Node.js & Express** untuk komunikasi dengan ESP32.  

## 🏗️ Teknologi yang Digunakan  
- **ESP32** untuk membaca sensor dan mengirim data.  
- **Node.js + Express** untuk backend API.  
- **React.js** untuk frontend antarmuka pengguna.  
- **MySQL** sebagai database untuk menyimpan data historis sensor.  


## 📸 Tampilan Antarmuka  
![Dashboard Preview](https://via.placeholder.com/800x400.png?text=Screenshot+Dashboard)  

## 🔧 Instalasi  
1. **Clone repository ini**  
   ```sh
   git clone https://github.com/AgielF/hydroponicIIOT.git
   cd hydroponicIIOT
cd backend

npm install

cd ../frontend

npm install
