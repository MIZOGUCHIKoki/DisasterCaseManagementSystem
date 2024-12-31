import { StockListType } from './StockList';
import { ReceiveType } from './Receive';

export type StockIOType = {
    id: number,
    serveLog: ReceiveType,
    stockList: StockListType,
    amount: number,
    created_at: string
};

export type DB_StockIOType = {
    id: number,
    serveLog_id: number,
    stockList_id: number,
    amount: number,
    created_at: string
};