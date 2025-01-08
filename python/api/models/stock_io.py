from sqlalchemy import Column, Integer, DateTime, func, ForeignKey
from db import Base

class StockIO(Base):
    __tablename__ = "stock_io"
    id = Column(Integer, primary_key=True, autoincrement=True)
    stock_list_id = Column(Integer,ForeignKey("stock_list.id") ,nullable=False)
    receive_log_id = Column(Integer, ForeignKey("receive_log.id"), nullable=True)
    amount = Column(Integer, nullable=False) # NULL = 物資搬入による増加
    created_at = Column(DateTime, server_default=func.now(), nullable=False)

