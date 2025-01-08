from sqlalchemy.ext.asyncio import AsyncSession
import models.stock_io as stock_io_model

import models.receive_log as receive_log_model
import schemas.stock_io as stock_io_schema

async def post_stock_io_with_receive_log(
            db: AsyncSession, 
            stock_io: stock_io_schema.StockIOCreateWITHReceiveLog
        ) -> None:
    # ReceiveLogの新規作成
    new_receive_log = receive_log_model.ReceiveLog(
        person_id=stock_io.person_id,
        number_of_people=stock_io.number_of_people,
        receive_class=0,
    )
    db.add(new_receive_log)  # 新しいReceiveLogを追加

    # フラッシュしてDBに反映させ、IDを設定
    await db.flush()  # ここでデータベースに反映され、IDが取得される

    # 追加したReceiveLogのIDを確定させる
    await db.refresh(new_receive_log)  # IDが確実に取得される

    # StockIOの新規作成
    for item in stock_io.stockList_Amount:
        new_stock_io = stock_io_model.StockIO(
            stock_list_id=item.stock_list_id,
            receive_log_id=new_receive_log.id,  # 先ほど作成したReceiveLogのIDを使用
            amount=item.amount
        )
        db.add(new_stock_io)  # StockIOを追加

    # コミットしてトランザクションを確定
    await db.commit()
    return None