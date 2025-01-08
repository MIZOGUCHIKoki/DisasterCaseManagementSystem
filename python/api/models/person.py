from sqlalchemy import Column, Integer, String

from db import Base

class Person(Base):
    __tablename__ = "person"
    id = Column(String, primary_key=True)
    nick_name = Column(String, nullable=False)
    group_id = Column(Integer, nullable=True, default=None)
    age = Column(Integer, nullable=True, default=None)
    allergy = Column(Integer, nullable=True, default=0)
    remarks_food = Column(String, nullable=False, default="")
    remarks_other = Column(String, nullable=False, default="")
    created_at = Column(String, nullable=False)