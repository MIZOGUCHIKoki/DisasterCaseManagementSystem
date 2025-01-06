from sqlalchemy import Column, Integer, String, DateTime, func

from setting import Engine
from setting import Base

class StockList(Base):
    __tablename__ = 'stock_list'
    __table_args__ = {
        'comment': '在庫リストのテーブル'
    }
    
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    name = Column('name', String, nullable=True)
    size = Column('size', String, default=None)
    unit = Column('unit', String, nullable=True)
    allergy = Column('allergy', Integer, default=0, nullable=True)
    janure_id = Column('janure_id', Integer, nullable=True, default=0)
    created_at = Column('created_at', DateTime, default=func.now())

if __name__ == '__main__':
    Base.metadata.create_all(bind = Engine)