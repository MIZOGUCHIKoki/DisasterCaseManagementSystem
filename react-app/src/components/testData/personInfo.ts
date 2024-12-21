import { PersonType } from '../type/Person';

export const personInfo: PersonType = {
    id: '1',
    nickName: 'Alice',
    group_id: 1,
    age: 20,
    allergy: 0,
    remarks_food: 'なし',
    remarks_other: 'なし',
    created_at: '2021-09-01T00:00:00.000Z'
}

export const groupMembers: PersonType[] = [
    {
        id: '2',
        nickName: 'Bob',
        group_id: 1,
        age: 25,
        allergy: 0,
        remarks_food: 'なし',
        remarks_other: 'なし',
        created_at: '2021-09-01T00:00:00.000Z'
    },
    {
        id: '3',
        nickName: 'Charlie',
        group_id: 1,
        age: 30,
        allergy: 0,
        remarks_food: 'なし',
        remarks_other: 'なし',
        created_at: '2021-09-01T00:00:00.000Z'
    },
    {
        id: '4',
        nickName: 'David',
        group_id: 1,
        age: 35,
        allergy: 0,
        remarks_food: 'なし',
        remarks_other: 'なし',
        created_at: '2021-09-01T00:00:00.000Z'
    }
]