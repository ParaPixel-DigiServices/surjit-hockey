from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from app.core.config import settings
from app.api.v1 import tournaments, teams, content, news, additional, auth

# Create FastAPI application
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.API_VERSION,
    description="REST API for Surjit Hockey Tournament Management System",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Mount static files for uploads
uploads_path = Path(__file__).parent.parent / "uploads"
uploads_path.mkdir(exist_ok=True)
app.mount("/uploads", StaticFiles(directory=str(uploads_path)), name="uploads")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(
    tournaments.router,
    prefix="/api/v1/tournaments",
    tags=["Tournaments"]
)

app.include_router(
    teams.router,
    prefix="/api/v1/teams",
    tags=["Teams"]
)

app.include_router(
    content.router,
    prefix="/api/v1/content",
    tags=["Content"]
)

app.include_router(
    news.router,
    prefix="/api/v1",
    tags=["News & Info"]
)

app.include_router(
    additional.router,
    prefix="/api/v1/additional",
    tags=["Additional Features"]
)

app.include_router(
    auth.router,
    prefix="/api/v1/auth",
    tags=["Authentication"]
)


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "Welcome to Surjit Hockey API",
        "version": settings.API_VERSION,
        "docs": "/docs",
        "redoc": "/redoc"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "app": settings.APP_NAME,
        "version": settings.API_VERSION
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG
    )
