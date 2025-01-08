from fastapi import APIRouter,Depends
from db import get_db
from sqlalchemy.ext.asyncio import AsyncSession

import schemas.stock_io as stock_io_schema
from cruds.stock_io import post_stock_io_with_receive_log

router = APIRouter()

@router.post("/stock_io", response_model=None)
async def create_stock_io(stock_io: stock_io_schema.StockIOCreateWITHReceiveLog, db: AsyncSession = Depends(get_db)):
    return await post_stock_io_with_receive_log(db, stock_io)

