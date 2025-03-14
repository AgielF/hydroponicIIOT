from fastapi import APIRouter
from routes.forcasting import router as forcasting_cluster
from routes.cluster import router as cluster_router


router = APIRouter()

# Menyertakan semua router

router.include_router(cluster_router, prefix="/cluster", tags=["cluster"])
router.include_router(forcasting_cluster, prefix="/forcasting", tags=["forcasting"])