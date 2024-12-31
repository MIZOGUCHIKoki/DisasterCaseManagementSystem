import { DefaultListType, DB_DefaultListType } from '../type/DefaultList';
import { stockList } from './stockList';

export const defaultList: DefaultListType[] = [
    {
        id: 1,
        stockList: stockList[0],
        amount: 1
    },
    {
        id: 2,
        stockList: stockList[1],
        amount: 2
    },
    {
        id: 3,
        stockList: stockList[2],
        amount: 3
    },
    {
        id: 4,
        stockList: stockList[3],
        amount: 4
    }
];
export const DB_defaultList: DB_DefaultListType[] = [
    {
        id: 1,
        stockList_id: 1,
        amount: 1
    },
    {
        id: 2,
        stockList_id: 2,
        amount: 2
    }
];
