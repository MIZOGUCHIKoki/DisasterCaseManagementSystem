from pydantic import BaseModel

from typing import Optional
# import schemas.receive_log as receive_log_schema
from typing import List

class StockIOBase(BaseModel):
    stock_list_id: int
    amount: int

class StockIO(StockIOBase):
    receive_log_id: Optional[int]
    id: int
    created_at: str


class StockIOCreate(StockIOBase):
    pass

# class StockIOCreateWITHReceiveLog(StockIOBase, receive_log_schema.ReceiveLogBase):
#     pass

class StockIOCreateWITHReceiveLog(BaseModel):
    person_id: str
    stockList_Amount: List[StockIOBase]
    number_of_people: int

"""
{
    "person_id": "1147d50765e7bbf4aa732e3273113c85",
    "stockList_Amount": [
        {
            "stock_list_id": 1,
            "amount": 4
        },
        {
            "stock_list_id": 2,
            "amount": 8
        },
        {
            "stock_list_id": 3,
            "amount": 12
        }
    ],
    "numberOfPerson": 4
}
"""