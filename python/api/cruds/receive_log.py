from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import update, select
from typing import Sequence, List

import models.receive_log as receive_log_model
import schemas.receive_log as receive_log_schema
import models.person as person_model
import models.stock_list as stock_list_model
import models.stock_io as stock_io_model

async def update_to_complete_receive_log(
    db: AsyncSession,
    id: receive_log_schema.ReceiveLogUpdate
) -> None:
    await db.execute(
        update(receive_log_model.ReceiveLog)
        .where(receive_log_model.ReceiveLog.id == id.id)
        .values(is_completed=True)
    )
    await db.flush()
    await db.commit()
    return None

async def get_receive_log_staff(db: AsyncSession) -> Sequence[receive_log_schema.ReceiveLogGet] | None:
    receive_log_query = await db.execute(
        select(
            receive_log_model.ReceiveLog.id,
            receive_log_model.ReceiveLog.person_id,
            receive_log_model.ReceiveLog.number_of_people
        ).filter(receive_log_model.ReceiveLog.is_completed == False)
    )
    
    # ReceiveLogと関連するPersonとStockIO情報を一度で取得
    receive_log_data = receive_log_query.fetchall()
    
    result: Sequence[receive_log_schema.ReceiveLogGet] = []
    for item in receive_log_data:
        # Person情報の取得
        person_info_query = await db.execute(
            select(person_model.Person.nick_name)
            .filter(person_model.Person.id == item.person_id)
        )
        person_info = person_info_query.scalars().first()
        if person_info is None:
            continue
        # StockIO情報の取得
        stock_io_query = await db.execute(
            select(
                stock_io_model.StockIO.stock_list_id,
                stock_io_model.StockIO.receive_log_id,
                stock_io_model.StockIO.amount,
            ).filter(stock_io_model.StockIO.receive_log_id == item.id)
        )
        stock_io_data = stock_io_query.fetchall()

        # StockList情報の取得
        SuppliesInfo:List[receive_log_schema.SuppliesInfo]= []
        for stock_io_item in stock_io_data:
            SuppliesInfo_query = await db.execute(
                select(
                    stock_list_model.StockList.name,
                    stock_list_model.StockList.size,
                    stock_list_model.StockList.unit
                ).filter(stock_list_model.StockList.id == stock_io_item.stock_list_id)
            )
            SuppliesInfo_item = SuppliesInfo_query.first()
            if SuppliesInfo_item is None:
                continue

            SuppliesInfo.append(
                receive_log_schema.SuppliesInfo(
                    name=SuppliesInfo_item[0],
                    size=SuppliesInfo_item[1],
                    unit=SuppliesInfo_item[2],
                    amount=stock_io_item[2]
                )
            )
        
        # 結果を構造化
        new_item = receive_log_schema.ReceiveLogGet(
            id=item.id,
            person=receive_log_schema.PersonInfo(nick_name=person_info),
            number_of_people=item.number_of_people,
            supplies=SuppliesInfo
        )
        result.append(new_item)

    return result