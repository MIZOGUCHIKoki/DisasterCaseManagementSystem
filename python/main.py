from typing import Dict, List
import sqlite3
from fastapi import FastAPI, HTTPException
from contextlib import asynccontextmanager
import uvicorn
from model import Person, StockList, ServeLog, StockIO
from db_setup import setup_db_person, setup_db_stockList, setup_db_serveLog, setup_db_stockIO, open_db
from databases import Database

@asynccontextmanager
async def lifespan(app: FastAPI):
    await database.connect()
    print("Database connected")
    yield
    await database.disconnect()
    print("Database disconnected")


app:FastAPI = FastAPI(lifespan = lifespan)
database = Database("sqlite:///dataBase.db")
database_path = "dataBase.db"

@app.get('/person/{person_id}', response_model = Person)
async def get_person(person_id: str):
    query:str = "SELECT * FROM person WHERE id = :person_id"
    values: Dict[str, str] = {"person_id": person_id}
    person = await database.fetch_one(query=query, values=values) # type: ignore
    if not person:
        raise HTTPException(status_code=404, detail="Person not found")
    # Personモデルにマッピングして返す
    return person

@app.get("/person/", response_model=List[Person])
async def get_persons():
    query: str = "SELECT * FROM person ORDER BY id DESC"
    persons = await database.fetch_all(query=query)
    return persons

@app.get("/stocklist/", response_model=List[StockList])
async def get_stockList():
    query: str = "SELECT * FROM stockList"
    stockList = await database.fetch_all(query=query)
    return stockList


if __name__ == "__main__":
    conn:sqlite3.Connection = open_db(database_path)
    setup_db_person(conn)
    setup_db_stockList(conn)
    setup_db_serveLog(conn)
    setup_db_stockIO(conn)
    conn.close()

    uvicorn.run("main:app", host="0.0.0.0", port=4000,log_level="info",reload = True)