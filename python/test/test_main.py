from fastapi.testclient import TestClient
from model import SuppliesRequest
from main import app  # FastAPIアプリケーションが定義されているファイルをインポート
import pytest
import subprocess
import sqlite3
from db_setup import setup_db_person, setup_db_stockList, setup_db_serveLog, setup_db_stockIO, open_db, setup_db_defaultList

database = "dataBase.db"

client = TestClient(app)
@pytest.fixture(scope="module", autouse=True)
def setup_db():
    conn = open_db(database)
    setup_db_person(conn)
    setup_db_stockList(conn)
    setup_db_serveLog(conn)
    setup_db_stockIO(conn)
    setup_db_defaultList(conn)
    conn.close()
    yield
    subprocess.run(["rm", "dataBase.db"], text=True)

# テスト用データ
person_id_Group = "1147d50765e7bbf4aa732e3273113c85" # has group id
person_id_nonGroup = "c51ce410c124a10e0db5e4b97fc2af39" # has no group id


forServeLog = {
    "person_id": "1147d50765e7bbf4aa732e3273113c85",
    "stockList_Amount": [
        {
            "stockList_id": 1,
            "amount":10
        },{
            "stockList_id": 2,
            "amount":20
        }
    ],
    "numberOfPerson": 2
}



def test_create_serveLog():
    response = client.post("/request/", json=forServeLog)
    print(response.json())
    # ステータスコードが200（成功）であることを確認
    assert response.status_code == 200
    # レスポンスの内容が正しいことを確認


def test_get_person_Group():
    response = client.get(f"/person/{person_id_Group}")
    
    assert response.status_code == 200
    assert response.json() == {
        "personInfo": {
          "id": "1147d50765e7bbf4aa732e3273113c85",
          "nickName": "おみおみー",
        },
        "groupMember": [
          {
            "id": "1679091c5a880faf6fb5e6087eb1b2dc",
            "nickName": "武蔵"
          },
          {
            "id": "c81e728d9d4c2f636f067f89cc14862c",
            "nickName": "愛美"
          },
          {
            "id": "c9f0f895fb98ab9159f51fd0297e236d",
            "nickName": "さく"
          }
        ]
    }
def test_get_person_nonGroup():
    response = client.get(f"/person/{person_id_nonGroup}")
    
    assert response.status_code == 200
    assert response.json() == {
        "person": {
          "id": "c51ce410c124a10e0db5e4b97fc2af39",
          "nickName": "三上",
        },
        "groupMember": []
    }