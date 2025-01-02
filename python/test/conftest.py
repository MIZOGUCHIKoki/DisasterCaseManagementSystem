import pytest
import sqlite3
from fastapi.testclient import TestClient
from databases import Database
from main import app
from db_setup import setup_database
import os

db_path = "dataBase_test.db"

@pytest.fixture(scope="module", autouse=True)
async def setup_db():
    database = Database("sqlite:///${db_path}")
    await database.connect()

    conn = sqlite3.connect(db_path)
    setup_database(conn)
    conn.close()

    yield

    await database.disconnect()
    os.remove(db_path)

@pytest.fixture(scope="module")
def client():
    client = TestClient(app)
    yield client