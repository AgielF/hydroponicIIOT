#routes/cluster.py
from fastapi import APIRouter, HTTPException
from fetchingData.fetch import fetch_sensor_data_dht22
from fetchingData.fetch import fetch_sensor_data_ec
from fetchingData.fetch import fetch_sensor_data_ldr
from analytics.clusterAnalytics import calculate_cluster_ldr
from analytics.clusterAnalytics import calculate_cluster_dht22
from analytics.clusterAnalytics import calculate_cluster_ec
router = APIRouter()

@router.get("/cluster-dht22")
async def get_cluster_dht22():
    """
    Endpoint untuk melakukan clustering pada data sensor DHT22.
    """
    try:
        data = await fetch_sensor_data_dht22()
        if not data:
            raise HTTPException(status_code=404, detail="No data found")
        
        # Lakukan clustering dengan kolom "temp" dan "humid"
        cluster = calculate_cluster_dht22(data, columns=["temp", "humid"], n_clusters=3)
        return {"status": "success", "cluster": cluster}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/cluster-ec")
async def get_cluster_ec():
    """
    Endpoint untuk melakukan clustering pada data sensor EC.
    """
    try:
        data = await fetch_sensor_data_ec()
        if not data:
            raise HTTPException(status_code=404, detail="No data found")
        
        # Lakukan clustering dengan kolom khusus untuk EC sesuai dengan REST API
        cluster = calculate_cluster_ec(data, columns=["ec_value"], n_clusters=3)
        return {"status": "success", "cluster": cluster}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/cluster-ldr")
async def get_cluster_ldr():
    """
    Endpoint untuk melakukan clustering pada data sensor LDR.
    """
    try:
        data = await fetch_sensor_data_ldr()
        if not data:
            raise HTTPException(status_code=404, detail="No data found")
        
        # Lakukan clustering dengan kolom "ldr_value"
        cluster = calculate_cluster_ldr(data, columns=["ldr_value"], n_clusters=4)
        
        return {"status": "success", "cluster": cluster}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
