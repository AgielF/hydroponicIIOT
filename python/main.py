from fastapi import FastAPI
from routes.analysis import router as analysis_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ubah sesuai kebutuhan
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Menyertakan router untuk endpoint analisis
app.include_router(analysis_router, prefix="/analysis", tags=["Analysis"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI IoT Data Analysis Project"}
