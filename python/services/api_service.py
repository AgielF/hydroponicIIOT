import httpx

BASE_URL = "http://localhost:3000/api"  # URL REST API Anda

class APIService:
    """
    API Service untuk menangani koneksi ke REST API.
    """
    def __init__(self, base_url=BASE_URL):
        self.base_url = base_url

    async def get(self, endpoint):
        """
        Mengirim permintaan GET ke endpoint tertentu.
        """
        url = f"{self.base_url}/{endpoint}"
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            response.raise_for_status()  # Raise error jika status bukan 2xx
            return response.json()

    async def post(self, endpoint, data):
        """
        Mengirim permintaan POST ke endpoint tertentu.
        """
        url = f"{self.base_url}/{endpoint}"
        async with httpx.AsyncClient() as client:
            response = await client.post(url, json=data)
            response.raise_for_status()
            return response.json()
