import pytest
import httpx

class TestDefaultList:

    @pytest.mark.asyncio
    async def test_get_defaultList(self, async_client: httpx.AsyncClient):
        response = await async_client.get("/defaultList/", follow_redirects=True)
        assert response.status_code == 200

        