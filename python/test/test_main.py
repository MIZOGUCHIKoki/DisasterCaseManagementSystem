from fastapi.testclient import TestClient
from main import app  # FastAPIアプリケーションが定義されているファイルをインポート
import pytest
import subprocess

client = TestClient(app)

# テスト用データ
person_id = "c4ca4238a0b923820dcc509a6f75849b"
asGroup = False
receiveClassID = 1
forServeLog = {
    "person_id": person_id,
    "asGroup": asGroup,
    "receiveClassID": receiveClassID,
    "created_at": ""
}
forStockIO = [
    {
        "serveLog_id": None,
        "stockList_id": 1,
        "amount": 1,
        "created_at": ""
    },
    {
        "serveLog_id": None,
        "stockList_id": 2,
        "amount": 2,
        "created_at": ""
    },
    {
        "serveLog_id": None,
        "stockList_id": 3,
        "amount": 3,
        "created_at": ""
    },
    {
        "serveLog_id": None,
        "stockList_id": 9,
        "amount": 100,
        "created_at": ""
    }
]



def test_create_serveLog():
    response = client.post("/serveLog/", json={"serveLog": forServeLog, "stockIO": forStockIO})
    print(response.json())
    # ステータスコードが200（成功）であることを確認
    assert response.status_code == 200
    # レスポンスの内容が正しいことを確認

# POSTリクエストを送信して、レスポンスを検証
def test_get_person():
    response = client.get(f"/person/{person_id}")
    print(response.json())
    # ステータスコードが200（成功）であることを確認
    assert response.status_code == 200
    # レスポンスの内容が正しいことを確認