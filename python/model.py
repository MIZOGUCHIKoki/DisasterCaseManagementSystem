from pydantic import BaseModel
from typing import Optional

class Person(BaseModel):
    id: str
    nickName: str
    group_id: Optional[int]
    age: int
    allergy: int
    remarks_food: Optional[str]
    remarks_other: Optional[str]
    created_at: Optional[str]
    updated_at: Optional[str]

class ServeLog(BaseModel):
    person_id: str
    asGroup: bool
    receiveClassID: int
    created_at: Optional[str]

class StockList(BaseModel):
    name: str
    size: Optional[str]
    unit: str
    allergy: int
    janureID: int
    created_at: str

class StockIO(BaseModel):
    stockList_id: int
    serveLog_id: Optional[int]
    amount: int
    created_at: str
