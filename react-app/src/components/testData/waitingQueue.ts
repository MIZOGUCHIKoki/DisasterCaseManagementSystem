import { WaitingQueueType } from '../type/WaitingQueue';
import { personInfo } from './personInfo';
import { stockList } from './stockList';

export const waitingQueue: WaitingQueueType[] = [
    {
        id: 1,
        person_info: personInfo[0],
        supplies_info: [
            {
                stock_info: stockList[0],
                amount: 1
            }],
        numberOfMember: 1,
        complete: false,
        created_at: '2021-01-01 00:00:00'
    },
    {
        id: 2,
        person_info: personInfo[1],
        supplies_info: [
            {
                stock_info: stockList[1],
                amount: 2
            },
            {
                stock_info: stockList[2],
                amount: 1
            },
            {
                stock_info: stockList[1],
                amount: 2
            },
        ],
        numberOfMember: 3,
        complete: false,
        created_at: '2021-01-02 00:00:00'
    },
    {
        id: 3,
        person_info: personInfo[2],
        supplies_info: [
            {
                stock_info: stockList[1],
                amount: 2
            },
            {
                stock_info: stockList[3],
                amount: 1
            }],
        numberOfMember: 3,
        complete: false,
        created_at: '2021-01-02 00:00:00'
    }
];