import React from 'react';
import { WaitingQueueType } from './type/WaitingQueue';
import { PersonType } from './type/Person';
import { waitingQueue } from './testData/waitingQueue';
import { groupMembers } from './testData/personInfo';

type givenDataType = {
    waitingQueue: WaitingQueueType;
    groupMember: PersonType[];
};

const givenData: givenDataType = {
    waitingQueue: waitingQueue[0],
    groupMember: groupMembers
};

export default function ServeScreen(person_id: number): JSX.Element {
    console.log('person_id:', person_id);
    /*
        fetch data from server using person_id
        Datatype: givenDataType
    */
    if (givenData.waitingQueue.asGroup) { // 個人受け取りの場合
        return (
            <div className='container-block'>

            </div>
        );
    } else { // グループの場合
        return (
            <div>

            </div>
        );
    }
}