import { PersonType } from './Person';
export type WaitingQueueType = {
    id: number,
    personInfo: PersonType,
    numberOfMember: number,
    complete: boolean,
    created_at: string
};

export type DB_WaitingQueueType = {
    id: number,
    person_id: string,
    numberOfMember: number,
    complete: boolean,
    created_at: string
};