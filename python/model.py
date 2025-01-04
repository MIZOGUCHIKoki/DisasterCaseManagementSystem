from pydantic import BaseModel
from typing import Optional, List, Dict

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
    receiveClassID: int

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


class StockList(BaseModel):
    stockList_id: int
    amount: int

class SuppliesRequest(BaseModel):
    person_id: str
    stockList_Amount: List[StockList]
    numberOfPerson: int

class DefualtList(BaseModel):
    stockList_id: int
    amount: int