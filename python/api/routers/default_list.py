from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
import schemas.default_list as default_list_schema
import cruds.default_list as default_list_crud
from typing import List

from db import get_db

router = APIRouter()

@router.get("/defaultList", response_model=List[default_list_schema.DefaultListBase])
async def read_default_list(db: AsyncSession = Depends(get_db)):
    return await default_list_crud.get_default_list(db)


@router.post("/defaultList", response_model=List[default_list_schema.DefaultListCreateResponse])
async def create_default_list(defaultList: List[default_list_schema.DefaultListCreate], db: AsyncSession = Depends(get_db)):
    result:List[default_list_schema.DefaultListCreateResponse] = []
    for default_list in defaultList:
        result.append(await default_list_crud.create_default_list(db, default_list))
    return result