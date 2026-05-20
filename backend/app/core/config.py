from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "DClaw Mail"
    app_env: str = "dev"
    debug: bool = True

    # Local dev uses the shared dclaw-postgres Docker container exposed on host port 5435.
    # CI / docker-compose backend service overrides this via DATABASE_URL env var.
    database_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5435/dclaw_email"

    secret_key: str = "change-me-in-production"
    access_token_expire_minutes: int = 60

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=False,
        extra="ignore",
    )


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
