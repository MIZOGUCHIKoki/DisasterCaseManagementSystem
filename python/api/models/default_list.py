from sqlalchemy import Column, Integer, ForeignKey, DateTime, Boolean
from sqlalchemy.sql import func

from db import Base

class DefaultList(Base):
    __tablename__ = "default_list"
    id = Column(Integer, primary_key=True,autoincrement=True)
    stock_list_id = Column(Integer,ForeignKey("stock_list.id") ,nullable=False)
    amount = Column(Integer, nullable=False, default=0)
    isAccept = Column(Boolean, nullable=False, default=False)
    created_at = Column(DateTime, server_default=func.now())