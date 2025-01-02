import pytest

class TestDefaultList:

    @pytest.mark.asyncio
    async def test_get_defaultList(self, client):
        response = client.get("/defaultList/")
        assert response.status_code == 200
        assert response.json() == [
        {
                "stockList_id": 1,
                "amount": 10
            },
            {
                "stockList_id": 2,
                "amount": 20
            }
        ]

        