from pydantic import BaseModel
from datetime import datetime

class QRRead(BaseModel):
    id: int
    person_id: str
    timestamp: datetime