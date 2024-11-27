from pydantic import BaseModel

class Person(BaseModel):
    id: str
    group_id: int
    age: int
    allergy: int
    remarks_food: str
    remarks_other: str

class ServeLog(BaseModel):
    person_id: str
    receiveClassID: int

class StockList(BaseModel):
    name: str
    size: str
    unit: str
    allergy: int
    janureID: int

class StockIO(BaseModel):
    stockList_id: int
    serveLog_id: int
    amount: int
