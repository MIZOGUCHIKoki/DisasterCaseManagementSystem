from typing import List, Dict, Any
import subprocess
import sqlite3
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # 許可するオリジンを設定
    allow_credentials=True,
    allow_methods=["*"],  # 許可するHTTPメソッド
    allow_headers=["*"],  # 許可するHTTPヘッダー
)

async def get_serveLog_stockIO_stockList(person_id:str, asGroup:bool = False):
    if asGroup:
        query_serveLog:str = "SELECT * FROM serveLog WHERE asGroup = True and person_id = :person_id"
    else:
        query_serveLog:str = "SELECT * FROM serveLog WHERE person_id = :person_id"
    query_stockIO:str = "SELECT * FROM stockIO WHERE serveLog_id = :serveLog_id"
    query_stockList:str = "SELECT * FROM stockList WHERE id = :stockList_id"
    serveLog = await database.fetch_all(query=query_serveLog, values={"person_id": person_id})
    for log in serveLog:
        log_dict:dict = dict(log)
        stockIO = await database.fetch_all(query=query_stockIO, values={"serveLog_id": log["id"]})
        log_dict["stockIO"] = [] # Initialize stockIO list
        for io in stockIO:
            io_dict:dict = dict(io)
            stockList = await database.fetch_one(query=query_stockList, values={"stockList_id": io["stockList_id"]})
            io_dict["stockList"] = stockList
            log_dict["stockIO"].append(io_dict) # stockIOのリストに追加
        serveLog[serveLog.index(log)] = log_dict # serveLogのリストに追加
    return serveLog


@app.get('/person/{person_id}')
async def get_person(person_id: str):
    query_personInfo:str = "SELECT * FROM person WHERE id = :person_id"
    person = await database.fetch_one(query=query_personInfo, values={"person_id": person_id})
    if not person:
        raise HTTPException(status_code=404, detail="Person not found")
    
    serveLog = await get_serveLog_stockIO_stockList(person_id)
    group_id = person["group_id"]
    if group_id is not None:
        query_groupInfo:str = "SELECT id, nickName FROM person WHERE group_id = :group_id"
        person_sameGroup = await database.fetch_all(query=query_groupInfo, values={"group_id": group_id})
        serveLog_sameGroup_List = []
        for p in person_sameGroup:
            serveLog_sameGroup = await get_serveLog_stockIO_stockList(p["id"], asGroup=True)
            if serveLog_sameGroup:
                serveLog_sameGroup_List.append(serveLog_sameGroup)
        return {"person": person, "serveLog": serveLog, "person_sameGroup": person_sameGroup, "serveLog_sameGroup": serveLog_sameGroup_List}
    else:
        return {"person": person, "serveLog": serveLog}

@app.get("/person", response_model=List[Person])
async def get_persons():
    query: str = "SELECT * FROM person ORDER BY id DESC"
    person = await database.fetch_all(query=query)
    return person
@app.get("/stocklist/{janureID}", response_model=List[StockList])
async def get_stockList(janureID: int = None):
    if janureID == 0:
        query: str = "SELECT * FROM stockList"
        values = {}
    else:    
        query: str = "SELECT * FROM stockList WHERE janureID = :janureID"
        values = {"janureID": janureID}
    stockList = await database.fetch_all(query=query, values=values)
    return stockList
@app.get("/serveLog", response_model=List[ServeLog])
async def get_serveLog():
    query: str = "SELECT * FROM serveLog"
    serveLog = await database.fetch_all(query=query)
    return serveLog
@app.get("/stockIO", response_model=List[StockIO])
async def get_stockIO():
    query: str = "SELECT * FROM stockIO"
    stockIO = await database.fetch_all(query=query)
    return stockIO

async def create_serveLog(serveLog: ServeLog) -> int|None:
    query:str = "INSERT INTO serveLog (person_id, asGroup, receiveClassID) VALUES (:person_id, :asGroup, :receiveClassID)"
    values = {"person_id": serveLog.person_id, "asGroup": serveLog.asGroup, "receiveClassID": serveLog.receiveClassID}
    print("called create_serveLog()")
    try:
        # Execute the insert query
        id = await database.execute(query=query, values=values)
        return id
    except Exception as e:
        # Return an error response if something goes wrong
        return None

async def create_stockIO(stockIO: StockIO) -> int|None:
    query:str = "INSERT INTO stockIO (stockList_id, serveLog_id, amount) VALUES (:stockList_id, :serveLog_id, :amount)"
    values = {"stockList_id": stockIO.stockList_id, "serveLog_id": stockIO.serveLog_id, "amount": stockIO.amount}
    try:
        # Execute the insert query
        id = await database.execute(query=query, values=values)
        return id
    except Exception as e:
        # Return an error response if something goes wrong
        return None

@app.post('/serveLog')
async def pickUpSupplies(serveLog: ServeLog, stockIO: List[StockIO]) -> None:
    print('called pickUpSupplies()')
    serveLogid = await create_serveLog(serveLog)
    if not serveLogid:
        raise HTTPException(status_code=500, detail="Failed to create serveLog")
    for io in stockIO:
        io.serveLog_id = serveLogid
        if io.stockList_id is not None:
            io.amount = -1 * int(io.amount)
        stockIOid = await create_stockIO(io)
        if not stockIOid:
            raise HTTPException(status_code=500, detail="Failed to create stockIO")

if __name__ == "__main__":
    subprocess.run(["rm", database_path])
    conn:sqlite3.Connection = open_db(database_path)
    setup_db_person(conn)
    setup_db_stockList(conn)
    setup_db_serveLog(conn)
    setup_db_stockIO(conn)
    conn.close()

    uvicorn.run("main:app", host="0.0.0.0", port=4000,log_level="info",reload = True)