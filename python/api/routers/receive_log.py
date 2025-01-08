from fastapi import APIRouter,Depends
from db import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Sequence


from cruds.receive_log import update_to_complete_receive_log, get_receive_log_staff
from schemas.receive_log import ReceiveLogUpdate, ReceiveLogGet

router = APIRouter()

@router.put("/receive_log/", response_model=None)
async def create_stock_io(id: ReceiveLogUpdate, db: AsyncSession = Depends(get_db)):
    return await update_to_complete_receive_log(db, id)


@router.get("/receive_log/", response_model=Sequence[ReceiveLogGet])
async def get_receive_log(db: AsyncSession = Depends(get_db)):
    return await get_receive_log_staff(db)