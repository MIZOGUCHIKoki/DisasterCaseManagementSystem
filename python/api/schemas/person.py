from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class PersonBase(BaseModel):
    id: str
    nick_name: str
    group_id: Optional[int] = None  # group_idはオプション（None許容）
    age: int
    allergy: int
    remarks_food: str
    remarks_other: str
    created_at: datetime  # 日時フィールド


class PersonResponse(BaseModel):
    id: str
    nick_name: str


class PersonGroupMember(BaseModel):
    personInfo: PersonResponse  # その人物の基本情報
    groupMember: List[PersonResponse]  # グループメンバーのリスト


class Person(PersonBase):
    pass

class PersonList(BaseModel):
    persons: List[PersonBase]  # 人物のリスト