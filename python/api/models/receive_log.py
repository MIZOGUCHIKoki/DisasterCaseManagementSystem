from sqlalchemy import Column, Integer, String, DateTime, func, ForeignKey, Boolean
from db import Base

class ReceiveLog(Base):
    __tablename__ = "receive_log"
    id = Column(Integer, primary_key=True, autoincrement=True)
    person_id = Column(String, ForeignKey("person.id"), nullable=False)
    receive_class = Column(Integer, nullable=False, default=0)
    number_of_people = Column(Integer, nullable=False)
    is_completed = Column(Boolean, nullable=False, default=False)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)