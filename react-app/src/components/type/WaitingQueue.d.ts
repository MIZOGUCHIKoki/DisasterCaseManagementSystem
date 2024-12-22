import { PersonType } from './Person';
export type WaitingQueueType = {
    id: number,
    personInfo: PersonType,
    asGroup: boolean,
    complete: boolean,
    created_at: string
};

export type DB_WaitingQueueType = {
    id: number,
    person_id: string,
    asGroup: boolean,
    complete: boolean,
    created_at: string
};