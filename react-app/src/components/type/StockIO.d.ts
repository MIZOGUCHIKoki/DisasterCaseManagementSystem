import { StockType } from './Stock.d.ts';
import { ServeLogType } from './ServeLog.d.ts';

export type StockIOType = {
    id: number,
    serveLog: ServeLogType,
    stock: StockType,
    amount: number,
    created_at: string
};

export type DB_StockIOType = {
    id: number,
    serveLog_id: number,
    stock_id: number,
    amount: number,
    created_at: string
};