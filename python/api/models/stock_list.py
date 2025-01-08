from sqlalchemy import Column, Integer, String
from datetime import datetime

from db import Base

class StockList(Base):
    __tablename__ = "stock_list"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    size = Column(Integer, nullable=True)
    unit = Column(String, nullable=False)
    allergy = Column(Integer, nullable=False, default=0)
    janure_id = Column(Integer, nullable=False, default=0)
    created_at = Column(String, nullable=False, default=datetime.now().strftime('%Y-%m-%d %H:%M:%S'))