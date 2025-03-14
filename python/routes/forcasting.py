#routes/cluster.py
from fastapi import APIRouter, HTTPException
from fetchingData.fetch import fetch_sensor_data_dht22
from analytics.forcastingAnalytics import arima_forecast
router = APIRouter()

@router.get("/forecast-temp-dht22")
async def get_forecast_dht22_temp():
    """
    Endpoint untuk melakukan forecasting suhu pada data sensor DHT22.
    """
    try:
        data = await fetch_sensor_data_dht22()
        if not data:
            raise HTTPException(status_code=404, detail="No data found")

        forecast = arima_forecast(data, column="temp", order=(1, 1, 1), steps=10)
        return {"status": "success", "forecast": forecast}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/forecast-humid-dht22")
async def get_forecast_dht22_humid():
    """
    Endpoint untuk melakukan forecasting kelembapan pada data sensor DHT22.
    """
    try:
        data = await fetch_sensor_data_dht22()
        if not data:
            raise HTTPException(status_code=404, detail="No data found")

        forecast = arima_forecast(data, column="humid", order=(1, 1, 1), steps=10)
        return {"status": "success", "forecast": forecast}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
