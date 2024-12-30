import { PersonType } from './Person';
import { StockIOType } from './StockIO';

export type WaitingQueueType = {
    id: number,
    personInfo: PersonType,
    numberOfMember: number,
    serveLog: {
        stockIO: StockIOType[],
        amount: number,
    }[],
    complete: boolean,
    created_at: string
};

export type DB_WaitingQueueType = {
    id: number,
    person_id: string,
    serveLog: {
        stockIO_id: number,
        amount: number,
    }[]
    numberOfMember: number,
    complete: boolean,
    created_at: string
};