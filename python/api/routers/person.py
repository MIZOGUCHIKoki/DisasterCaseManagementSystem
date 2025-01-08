from fastapi import APIRouter,Depends
from db import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Sequence

import schemas.person as person_schema
from cruds.person import get_person_group_member, get_person

router = APIRouter()

@router.get("/person/{id}", response_model=person_schema.PersonGroupMember)
async def read_person_with_group_member(
        id: str,
        db: AsyncSession = Depends(get_db)
    ):
    return await get_person_group_member(id=id, db=db)  

@router.get("/person", response_model=Sequence[person_schema.Person])
async def read_person(db: AsyncSession = Depends(get_db)):
    return await get_person(db)

