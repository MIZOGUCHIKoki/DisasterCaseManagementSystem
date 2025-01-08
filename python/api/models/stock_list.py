from sqlalchemy import Column, Integer, String, DateTime, func
from db import Base

class StockList(Base):
    __tablename__ = "stock_list"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    size = Column(String, nullable=True)
    unit = Column(String, nullable=False)
    allergy = Column(Integer, nullable=False, default=0)
    janure_id = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)