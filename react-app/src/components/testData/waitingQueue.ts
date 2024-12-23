import { WaitingQueueType } from '../type/WaitingQueue';
import { personInfo } from './personInfo';

export const waitingQueue: WaitingQueueType[] = [
    {
        id: 1,
        personInfo: personInfo[0],
        asGroup: true,
        complete: false,
        created_at: '2021-01-01 00:00:00'
    },
    {
        id: 2,
        personInfo: personInfo[1],
        asGroup: false,
        complete: true,
        created_at: '2021-01-01 00:00:00'
    },
    {
        id: 3,
        personInfo: personInfo[2],
        asGroup: true,
        complete: false,
        created_at: '2021-01-01 00:00:00'
    },
    {
        id: 4,
        personInfo: personInfo[3],
        asGroup: false,
        complete: true,
        created_at: '2021-01-01 00:00:00'
    }
];