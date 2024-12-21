import { PersonType } from './Person';

export type WaitingQueueType = {
    id: number,
    personInfo: PersonType,
    asGroup: boolean,
    complete: boolean,
    created_at: string
};