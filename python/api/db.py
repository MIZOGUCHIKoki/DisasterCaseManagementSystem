from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, AsyncEngine, async_sessionmaker
from sqlalchemy.orm import  declarative_base
from typing import AsyncGenerator

ASYNC_DB_URL = "sqlite+aiosqlite:///./test.db"

async_engine: AsyncEngine = create_async_engine(
    ASYNC_DB_URL, 
    echo=True
)

async_session_factory = async_sessionmaker(
    bind=async_engine,  # エンジンの指定
    autoflush=False,  # 自動フラッシュを無効
    expire_on_commit=False,  # コミット時にオブジェクトの有効期限を切らない
)

Base = declarative_base()

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_factory() as session:  
        from sqlalchemy import text
        await session.execute(text("PRAGMA foreign_keys = ON;"))
        yield session