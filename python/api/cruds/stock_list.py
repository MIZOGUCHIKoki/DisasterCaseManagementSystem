from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.engine import Result
from typing import Sequence, Tuple
import models.stock_list as stock_list_model
import schemas.stock_list as stock_list_schema

async def get_stock_list(db: AsyncSession) -> Sequence[stock_list_schema.StockList]:
    result: Result[Tuple[stock_list_model.StockList]] = await db.execute(
        select(stock_list_model.StockList)
    )
    
    return result.scalars().all()