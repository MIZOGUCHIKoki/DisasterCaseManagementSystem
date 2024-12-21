import { WaitingQueueType } from '../type/WaitingQueue';
import { personInfo } from './personInfo';

export const waitingQueue: WaitingQueueType[] = [
    {
        id: 1,
        personInfo: personInfo,
        asGroup: true,
        complete: false,
        created_at: '2021-01-01 00:00:00'
    },
    {
        id: 2,
        personInfo: personInfo,
        asGroup: false,
        complete: true,
        created_at: '2021-01-01 00:00:00'
    },
    {
        id: 3,
        personInfo: personInfo,
        asGroup: true,
        complete: false,
        created_at: '2021-01-01 00:00:00'
    },
    {
        id: 4,
        personInfo: personInfo,
        asGroup: false,
        complete: true,
        created_at: '2021-01-01 00:00:00'
    },
    {
        id: 5,
        personInfo: personInfo,
        asGroup: true,
        complete: false,
        created_at: '2021-01-01 00:00:00'
    }
];