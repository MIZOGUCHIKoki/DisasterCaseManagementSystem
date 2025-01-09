from fastapi import APIRouter,Depends
from db import get_db
from sqlalchemy.ext.asyncio import AsyncSession

import cruds.qr_read as qr_read_crud
import schemas.qr_read as qr_read_schema

router = APIRouter()

@router.post("/qr_read/{id}", response_model=qr_read_schema.QRRead)
async def read_qr_code(
        id: str,
        db: AsyncSession = Depends(get_db)
    ):
    return await qr_read_crud.qr_read(db=db, id=id)
