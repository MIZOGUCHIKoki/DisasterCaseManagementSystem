import { StockListType } from './StockList';

export type DefaultListType = {
    id: number,
    stockList: StockListType,
    amount: number
} | null;


export type DB_DefaultListType = {
    id: number,
    stock_id: number,
    amount: number
};