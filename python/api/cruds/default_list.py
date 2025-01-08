from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.engine import Result
from typing import Tuple, List

import models.default_list as default_list_model
import schemas.default_list as default_list_schema

async def create_default_list(db: AsyncSession, default_list: default_list_schema.DefaultListCreate) -> default_list_schema.DefaultListCreateResponse:
    new_default_list = default_list_model.DefaultList(
        **default_list.model_dump()
    )
    db.add(new_default_list)
    await db.commit()
    await db.refresh(new_default_list)

    return new_default_list

async def get_default_list(db: AsyncSession) -> List[default_list_schema.DefaultListBase]:
    result:Result[Tuple[int, int]] = await db.execute(select(
        default_list_model.DefaultList.stock_list_id,
        default_list_model.DefaultList.amount
    ))

    default_list = result.all()
    if not default_list:
        return []
    
    default_list_all: list[default_list_schema.DefaultListBase] = [
        default_list_schema.DefaultListBase(
            stock_list_id=item[0],
            amount=item[1]
        )
        for item in default_list
    ]
    return default_list_all