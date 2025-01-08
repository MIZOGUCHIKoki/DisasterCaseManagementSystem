from sqlalchemy import select
from sqlalchemy.engine import Result
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import and_

from typing import Tuple, Sequence
import models.person as person_model
import schemas.person as person_schema

async def get_person(db: AsyncSession) -> Sequence[person_schema.Person]:
    # データベースからPersonオブジェクトの全てを取得
    result:Result[Tuple[person_model.Person]] = await db.execute(select(person_model.Person))
    # PersonオブジェクトをPersonBaseに変換し、リストを作成
    return result.scalars().all()


async def get_person_group_member(db: AsyncSession, id: str) -> person_schema.PersonGroupMember | None:
    
    result: Result[Tuple[str, str, int]] = await db.execute(
        select(
            person_model.Person.id,
            person_model.Person.nick_name,
            person_model.Person.group_id
        ).filter(person_model.Person.id == id)
    )
    
    person = result.first()
    if person is None:
        return None # データがない場合はNoneを返す
    
    group_id = person[2]
    
    # グループに所属していない場合
    if group_id is None:
        person_dict = person_schema.PersonResponse(
            id=person[0],
            nick_name=person[1]
        )
        return person_schema.PersonGroupMember(
            person_info=person_dict,
            group_member=[]
        )

    result_group: Result[Tuple[str, str]] = await db.execute(
        select(
            person_model.Person.id,
            person_model.Person.nick_name
        )
        .filter(and_(person_model.Person.group_id == group_id, person_model.Person.id != person.id))
    )
    
    group_member = result_group.all()
    if not group_member:
        return None # グループメンバーがいない場合　→ データのエラーでNoneを返す
    
    group_member_list = [
        person_schema.PersonResponse(
            id=member[0],
            nick_name=member[1]
        )
        for member in group_member
    ]
    person_dict = person_schema.PersonResponse(
        id=person[0],
        nick_name=person[1]
    )
    return person_schema.PersonGroupMember(
        person_info=person_dict,
        group_member=group_member_list
    )