import pytest
import sqlite3
from fastapi.testclient import TestClient
from databases import Database
from main import app
from db_setup import setup_db_person


@pytest.fixture(scope="module")
async def setup_db():
    database = Database("sqlite:///dataBase.db")
    await database.connect()
    conn = sqlite3.connect(database)
    setup_db_person(conn)
    print("Test database connected")

    yield

    conn.close()
    await database.disconnect()
    print("Test database disconnected")

@pytest.fixture(scope="module")
def client():
    client = TestClient(app)
    yield client