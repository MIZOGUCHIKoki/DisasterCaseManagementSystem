import pytest
import sqlite3
from fastapi.testclient import TestClient
from databases import Database
from main import app
from db_setup import setup_db_person


@pytest.fixture(scope="module")
async def setup_db():

    yield 

@pytest.fixture(scope="module")
def client():
    client = TestClient(app)
    yield client

