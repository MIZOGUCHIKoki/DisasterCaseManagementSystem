from fastapi import APIRouter,Depends
from db import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Sequence

import schemas.stock_list as stock_list_schema
from cruds.stock_list import get_stock_list


router = APIRouter()

@router.get("/stockList", response_model=Sequence[stock_list_schema.StockList])
async def read_stock_list(db: AsyncSession = Depends(get_db)):
    return await get_stock_list(db)