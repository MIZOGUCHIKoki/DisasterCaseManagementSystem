from sqlalchemy import Column, Integer, DateTime, func, ForeignKey

from setting import Engine
from setting import Base
from stockList import StockList

class DefaultList(Base):
    __tablename__ = 'default_list'
    __table_args__ = {
        'comment': 'デフォルトリストのテーブル'
    }
    
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    stock_list_id = Column('stock_list_id', Integer, ForeignKey('stock_list.id'), nullable=False)
    amount = Column('amount', Integer, nullable=False)
    created_at = Column('created_at', DateTime, default=func.now())

if __name__ == '__main__':
    Base.metadata.create_all(bind = Engine)