from fastapi import APIRouter
import schemas.stock_list as stock_list_schema

router = APIRouter()

@router.get("/stockList", response_model=stock_list_schema.StockList)
async def read_stock_list():
    return stock_list_schema.StockList(
        id = 1,
        name="test",
        size="test",
        unit="test",
        allergie=1,
        genre_id=1,
        created_at="2021-01-01 00:00:00"
    )