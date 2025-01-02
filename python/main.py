import sqlite3
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uvicorn
from model import SuppliesRequest, ServeLog, StockIO, StockList
from db_setup import setup_database
from databases import Database
import os

@asynccontextmanager
async def lifespan(app: FastAPI):
    await database.connect()
    print("Database connected")
    setup_database(sqlite3.connect(database_path))

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


@app.get('/person/{person_id}')
async def get_person(person_id: str):
    query_personInfo:str = "SELECT id, nickName, group_id FROM person WHERE id = :person_id"
    person = await database.fetch_one(query=query_personInfo, values={"person_id": person_id})
    if not person:
        raise HTTPException(status_code=404, detail="Person not found")
    dict_person = dict(person)

    group_id = dict_person["group_id"]
    if group_id is not None:
        query_groupInfo:str = "SELECT id, nickName FROM person WHERE group_id = :group_id"
        person_sameGroup = await database.fetch_all(query=query_groupInfo, values={"group_id": group_id})
        dict_sameGroup = [
            dict(person) for person in person_sameGroup
        ]
        if (len(dict_sameGroup) == 1):
            raise HTTPException(status_code=550, detail="DATA INVALID") # グループ番号があるのにグループメンバーがいない場合
        dict_person_sameGroup = [person for person in dict_sameGroup if person["id"] != person_id]
        del dict_person["group_id"]
        return {"personInfo": dict_person, "groupMember": dict_person_sameGroup}
    else:
        del dict_person["group_id"]
        return {"person": dict_person, "groupMember": []}

@app.get('/stockList')
async def get_stockList():
    query_stockList:str = "SELECT id, name, size, unit FROM stockList"
    stockList = await database.fetch_all(query=query_stockList)
    dict_stockList = [
        dict(stock) for stock in stockList
    ]
    return dict_stockList

@app.get('/defaultList/')
async def get_defaultList():
    query_defaultList:str = "SELECT stockList_id, amount FROM defaultList"
    defaultList = await database.fetch_all(query=query_defaultList)
    dict_defaultList = [
        dict(default) for default in defaultList
    ]
    if len(dict_defaultList) == 0:
        return []
    return dict_defaultList

@app.post('/request')
async def request_stock(suppliesRequest: SuppliesRequest) -> None:
    serveLog: ServeLog = ServeLog(
        person_id = suppliesRequest.person_id,
        receiveClassID = 0
    )
    query_insertServeLog:str = "INSERT INTO serveLog (person_id, numberOfPerson) VALUES (:person_id, :numberOfPerson)"
    serveLog_id = await database.execute(query = query_insertServeLog, values = {
        "person_id": serveLog.person_id, 
        "numberOfPerson": suppliesRequest.numberOfPerson,
    })
    
    for i in suppliesRequest.stockList_Amount:
        stockIO: StockIO = StockIO(
            stockList_id = i.stockList_id,
            serveLog_id = serveLog_id,
            amount = i.amount
        )
        query_insertStockIO:str = "INSERT INTO stockIO (stockList_id, serveLog_id, amount) VALUES (:stockList_id, :serveLog_id, :amount)"
        await database.execute(query = query_insertStockIO, values = dict(stockIO))

if __name__ == "__main__":
    # os.remove("dataBase.db")
    uvicorn.run("main:app", host="0.0.0.0", port=4000,log_level="info",reload = True)