from pydantic import BaseModel
from typing import Optional

class StockListBase(BaseModel):
    id: int
    name: str
    size: str
    unit: str
    allergy: int
    genre_id: Optional[int]
    created_at: str

class StockList(StockListBase):
    pass