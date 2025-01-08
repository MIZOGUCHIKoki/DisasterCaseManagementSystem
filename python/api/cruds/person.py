from sqlalchemy import select
from sqlalchemy.engine import Result
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import and_

from typing import Tuple, List
import models.person as person_model
import schemas.person as person_schema

async def get_person(db: AsyncSession) -> person_schema.PersonList | None:
    # データベースからPersonオブジェクトの全てを取得
    result = await db.execute(select(person_model.Person))
    persons = result.all()  # 全てのPersonレコードを取得

    if not persons:
        return None  # PersonがいなければNoneを返す

    # PersonオブジェクトをPersonBaseに変換し、リストを作成
    person_list:List[person_schema.PersonBase]  = [
        person_schema.PersonBase(
            id=person[0].id,  # person[0] は Person オブジェクト
            nick_name=person[0].nick_name,
            group_id=person[0].group_id,
            age=person[0].age,
            allergy=person[0].allergy,
            remarks_food=person[0].remarks_food,
            remarks_other=person[0].remarks_other,
            created_at=person[0].created_at
        )
        for person in persons  # 各レコードに対して処理
    ]
    
    # PersonListとして返す
    return person_schema.PersonList(persons=person_list)

async def get_person_group_member(db: AsyncSession, id: str) -> person_schema.PersonGroupMember | None:
    # GroupMemberのエイリアスを作成
    # group_member_alias = aliased(Person)
    
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
            personInfo=person_dict,
            groupMember=[]
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
        personInfo=person_dict,
        groupMember=group_member_list
    )