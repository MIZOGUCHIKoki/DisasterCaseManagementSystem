import pytest # type: ignore
from pytest_asyncio import fixture # type: ignore
from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from ..db import get_db, Base
from ..main import app

ASYNC_DB_URL = "sqlite+aiosqlite:///:memory:"

@fixture(scope="session", autouse=True) # type: ignore
async def async_client() -> AsyncClient: # type: ignore
    # Async用のengineとsessionを作成
    async_engine = create_async_engine(ASYNC_DB_URL, echo=True)
    async_session = async_sessionmaker(
        autocommit=False, autoflush=False, bind=async_engine, class_=AsyncSession
    )

    # テスト用にオンメモリのSQLiteテーブルを初期化（関数ごとにリセット）
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)

    # DIを使ってFastAPIのDBの向き先をテスト用DBに変更
    async def get_test_db():
        async with async_session() as session:
            yield session

    app.dependency_overrides[get_db] = get_test_db

    # テスト用に非同期HTTPクライアントを返却
    async with AsyncClient(
        base_url="http://test",
        transport=ASGITransport(app=app)
    ) as client:
        yield client # type: ignore

    app.dependency_overrides.clear()