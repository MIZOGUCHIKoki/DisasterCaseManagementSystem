from pydantic import BaseModel
import schemas.stock_list as stock_list

class DefaultListBase(BaseModel):
    amount: int

class DefaultListOperationBase(DefaultListBase):
    stock_list_id: int

class DefaultListCreate(DefaultListOperationBase):
    pass

class DefaultListCreateResponse(DefaultListOperationBase):
    id: int

class DefaultList(DefaultListOperationBase):
    id: int
    isAccepted: bool
    created_at: str

class DefaultListGet(DefaultListBase, stock_list.StockListGet):
    pass