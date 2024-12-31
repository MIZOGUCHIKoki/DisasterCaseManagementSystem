import { StockListType } from './StockList';

export type DefaultListType = {
    id: number,
    stockList: StockListType,
    amount: number
};


export type DB_DefaultListType = {
    id: number,
    stockList_id: StockListType['id'],
    amount: number
};