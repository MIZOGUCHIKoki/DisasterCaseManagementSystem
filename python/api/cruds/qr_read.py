from sqlalchemy import select

from sqlalchemy.ext.asyncio import AsyncSession

from datetime import datetime

import models.qr_read as qr_read_model
import models.person as person_model

import schemas.qr_read as qr_read_schema

async def qr_read(db: AsyncSession, id: str) -> qr_read_schema.QRRead | None:
    result = await db.execute(
        select(
            person_model.Person.id
        ).filter(person_model.Person.id == id)
    )
    if not result.first():
        return None
    
    qr_read = qr_read_model.QRRead(
        person_id=id,
        timestamp=datetime.now()
    )
    db.add(qr_read)
    await db.commit()
    await db.refresh(qr_read)
    return qr_read