from pydantic import BaseModel
from pydantic import ConfigDict
from typing import Optional
from datetime import datetime

class StockListBase(BaseModel):
    name: str
    size: Optional[str]
    unit: str
    allergy: int
    janure_id: Optional[int]
    
    # model_config = ConfigDict(from_attributes=True)
    model_config = ConfigDict(from_attributes=True)

class StockListGet(StockListBase):
    id: int

class StockList(StockListBase):
    id: int
    created_at: datetime
