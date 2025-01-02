import pytest


forServeLog = {
    "person_id": "1147d50765e7bbf4aa732e3273113c85",
    "stockList_Amount": [
        {
            "stockList_id": 100,
            "amount":10
        },{
            "stockList_id": 2,
            "amount":20
        }
    ],
    "numberOfPerson": 2
}


class TestWaitingQueue:
    @pytest.mark.asyncio
    async def test_post_waitingQueue(self, client):
        response = client.post("/waitingQueue/", json=forServeLog)
        assert response.status_code == 200