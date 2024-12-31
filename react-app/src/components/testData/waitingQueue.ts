import { WaitingQueueType } from '../type/WaitingQueue';
import { personInfo } from './personInfo';
import { stockList } from './stockList';

export const waitingQueue: WaitingQueueType[] = [
    {
        id: 1,
        person_info: personInfo[0],
        supplies_info: [
            {
                stock_info: {
                    name: stockList[0].name,
                    unit: stockList[0].unit
                },
                amount: 1
            }],
        numberOfMember: 1,
        complete: false,
    },
    {
        id: 2,
        person_info: personInfo[1],
        supplies_info: [
            {
                stock_info: {
                    name: stockList[1].name,
                    unit: stockList[1].unit
                },
                amount: 2
            },
            {
                stock_info: {
                    name: stockList[2].name,
                    unit: stockList[2].unit
                },
                amount: 1
            },
            {
                stock_info: {
                    name: stockList[3].name,
                    unit: stockList[3].unit
                },
                amount: 2
            },
        ],
        numberOfMember: 3,
        complete: false
    },
    {
        id: 3,
        person_info: personInfo[2],
        supplies_info: [
            {
                stock_info: {
                    name: stockList[2].name,
                    unit: stockList[2].unit
                },
                amount: 2
            },
            {
                stock_info: {
                    name: stockList[3].name,
                    unit: stockList[3].unit
                },
                amount: 1
            }],
        numberOfMember: 3,
        complete: false
    },
    {
        id: 4,
        person_info: personInfo[2],
        supplies_info: [
            {
                stock_info: {
                    name: stockList[2].name,
                    unit: stockList[2].unit
                },
                amount: 2
            },
            {
                stock_info: {
                    name: stockList[3].name,
                    unit: stockList[3].unit
                },
                amount: 1
            }],
        numberOfMember: 3,
        complete: false
    }
];