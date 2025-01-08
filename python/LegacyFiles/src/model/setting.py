from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session

DATA_BASE = 'sqlite:///dataBase.db'
Engine = create_engine(
    DATA_BASE,
    # encoding = 'utf-8',
    echo=True
)

Session = scoped_session(
    sessionmaker(
        bind=Engine,
        autocommit=False,
        autoflush=False # False にすると、commit() が必要になる
    )
)

Base = declarative_base()