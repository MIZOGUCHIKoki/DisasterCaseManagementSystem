from sqlalchemy import Column, Integer, DateTime, func, ForeignKey

from setting import Engine
from setting import Base
from stockList import StockList
from serveLog import ServeLog

class StockIO(Base):
    __tablename__ = 'stock_io'
    __table_args__ = {
        'comment': '在庫の出入りのテーブル'
    }
    
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    stock_list_id = Column('stock_list_id', Integer, ForeignKey('stock_list.id'), nullable=False)
    serve_log_id = Column('serve_log_id', Integer, ForeignKey('serve_log.id'), nullable=False)
    amount = Column('amount', Integer, nullable=False)
    created_at = Column('created_at', DateTime, default=func.now())

if __name__ == '__main__':
    Base.metadata.create_all(bind = Engine)