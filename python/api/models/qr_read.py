from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, func

from db import Base

class QRRead(Base):
    __tablename__ = "qr_read"
    id = Column(Integer, primary_key=True,autoincrement=True)
    person_id = Column(String, ForeignKey('person.id') , nullable=False)
    timestamp = Column(DateTime, nullable=False, server_default=func.now())
