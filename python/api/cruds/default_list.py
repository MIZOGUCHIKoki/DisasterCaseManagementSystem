from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, update, insert
from sqlalchemy.engine import Result
from typing import Tuple, List

import models.default_list as default_list_model
import schemas.default_list as default_list_schema

import models.stock_list as stock_list_model

async def create_default_list(
            db: AsyncSession, 
            default_list: List[default_list_schema.DefaultListCreate]
        ) -> (
            List[default_list_schema.DefaultListCreateResponse]
        ):
    await db.execute(
        update(default_list_model.DefaultList)
        .where(default_list_model.DefaultList.isAccepted == True)
        .values(isAccepted=False)
    )
    await db.flush() # 変更を確定

    for item in default_list:
        new_default_list:default_list_model.DefaultList = default_list_model.DefaultList(
            stock_list_id=item.stock_list_id,
            amount=item.amount,
            isAccepted=True
        )
        new_default_list_dict = {
            k: v 
            for k, v in new_default_list.__dict__.items() if not k.startswith('_')
        }
        await db.execute(
            insert(default_list_model.DefaultList)
            .values(new_default_list_dict)
        )

    await db.commit()
    result: Result[Tuple[int, int, int]] = await db.execute(
        select(
            default_list_model.DefaultList.id,
            default_list_model.DefaultList.stock_list_id,
            default_list_model.DefaultList.amount
        )
        .where(default_list_model.DefaultList.isAccepted == True)
    )

    new_default_list_rows = result.all()  # (ORM)ここで取得されるのはオブジェクトのリスト

    result_list:List[default_list_schema.DefaultListCreateResponse] = [] 
    for item in new_default_list_rows:
        result_list.append(
            default_list_schema.DefaultListCreateResponse(
                id=item[0],
                stock_list_id=item[1],
                amount=item[2]
            )
        )
    
    

    return result_list

async def get_default_list(db: AsyncSession) -> List[default_list_schema.DefaultListGet]:
    result_stockList: Result[Tuple[int, str, str, str, int, int, int]] = await db.execute(
        select(
            stock_list_model.StockList.id,
            stock_list_model.StockList.name,
            stock_list_model.StockList.size,
            stock_list_model.StockList.unit,
            stock_list_model.StockList.allergy,
            stock_list_model.StockList.janure_id,
            func.coalesce(default_list_model.DefaultList.amount, 0).label('amount')  # amountがNULLの場合、0を返す
        ).outerjoin(
            default_list_model.DefaultList,
             (stock_list_model.StockList.id == default_list_model.DefaultList.stock_list_id) & (default_list_model.DefaultList.isAccepted == True), # join条件にisAccepted=Trueを追加
        )
    )
    
    stock_list = result_stockList.all()
    stock_list_all :List[default_list_schema.DefaultListGet] = []
    for item in stock_list:
        stock_list_all.append(
            default_list_schema.DefaultListGet(
                id=item[0],
                name=item[1],
                size=item[2],
                unit=item[3],
                allergy=item[4],
                janure_id=item[5],
                amount=item[6],
            )
        )
    
    return stock_list_all