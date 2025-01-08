from pydantic import BaseModel
from typing import List, Optional

class ReceiveLogBase(BaseModel):
    person_id: str
    receive_class: int
    number_of_people: int

class ReceiveLog(ReceiveLogBase):
    id: int
    is_complete: bool
    created_at: str

class ReceiveLogCreate(ReceiveLogBase):
    pass

class ReceiveLogCreateResponse(ReceiveLogBase):
    id: int

class ReceiveLogUpdate(BaseModel):
    id: int

class PersonInfo(BaseModel):
    nick_name: str

class SuppliesInfo(BaseModel):
    name: str
    size: Optional[str]
    unit: str
    amount: int

class ReceiveLogGet(BaseModel):
    id: int
    person: PersonInfo  # person_info → person
    number_of_people: int
    supplies: List[SuppliesInfo]  # supplies_info → supplies