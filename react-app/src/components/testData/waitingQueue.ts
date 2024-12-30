import { WaitingQueueType } from '../type/WaitingQueue';
import { personInfo } from './personInfo';
import { stockList } from './stockList';

export const waitingQueue: WaitingQueueType[] = [
    {
        id: 1,
        personInfo: personInfo[0],
        numberOfMember: 1,
        serveLog: [
            {
                stockIO: [
                    {
                        id: 1,
                        serveLog: [
                            {
                                id: 1,
                                person_id: '1',
                                received_person_id: '1',
                                receiveClassID: 1,
                                created_at: '2021-09-01T00:00:00.000Z'
                            }
                        ]
                    }
                ],
                amount: 1,
            }
        ],
    }
];