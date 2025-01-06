from sqlalchemy import Column, Integer, String, DateTime, func, ForeignKey

from setting import Engine
from setting import Base

from person import Person

class ServeLog(Base):
    __tablename__ = 'serve_log'
    __table_args__ = {
        'comment': '提供ログのテーブル'
    }
    
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    person_id = Column('user_id', String, ForeignKey('person.id'), nullable=False)
    number_of_person = Column('number_of_person', Integer, nullable=False)
    receive_class_id = Column('receive_class_id', Integer, nullable=False, default=0)
    created_at = Column('created_at', DateTime, default=func.now())

if __name__ == '__main__':
    Base.metadata.create_all(bind = Engine)