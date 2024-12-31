import { PersonType } from './Person';
import { StockListType } from './StockList';

export type WaitingQueueType = {
    id: number,
    person_info: PersonType,
    supplies_info: {
        stock_info: StockListType,
        amount: number
    }[],
    numberOfMember: number,
    complete: boolean,
    created_at: string
};

export type DB_WaitingQueueType = {
    id: number,
    person_id: string,
    receive_id: number,
    numberOfMember: number,
    complete: boolean,
    created_at: string
};