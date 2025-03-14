from services.api_service import APIService


api_service = APIService()

async def fetch_sensor_data_dht22():
    """
    Ambil data dari endpoint API.
    """
    try:
        return await api_service.get("sensor-dht22")  # Sesuaikan endpoint
    except Exception as e:
        print(f"Error fetching sensor data: {e}")
        return None

async def fetch_sensor_data_ldr():
    """
    Ambil data dari endpoint API.
    """
    try:
        return await api_service.get("sensor-ldr")  # Sesuaikan endpoint
    except Exception as e:
        print(f"Error fetching sensor data: {e}")
        return None
async def fetch_sensor_data_ec():
    """
    Ambil data dari endpoint API.
    """
    try:
        return await api_service.get("sensor-ec")  # Sesuaikan endpoint
    except Exception as e:
        print(f"Error fetching sensor data: {e}")
        return None
async def fetch_sensor_data_ph():
    """
    Ambil data dari endpoint API.
    """
    try:
        return await api_service.get("sensor-ph")  # Sesuaikan endpoint
    except Exception as e:
        print(f"Error fetching sensor data: {e}")
        return None
    
