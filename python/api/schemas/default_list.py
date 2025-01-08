from pydantic import BaseModel

class DefaultListBase(BaseModel):
    stock_list_id: int
    amount: int

    class Config:
        from_attribute = True

class DefaultListCreate(DefaultListBase):
    pass

class DefaultListCreateResponse(DefaultListBase):
    id: int

class DefaultList(DefaultListBase):
    id: int
    created_at: str