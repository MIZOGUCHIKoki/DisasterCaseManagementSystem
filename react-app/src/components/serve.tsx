import React from 'react';
import { WaitingQueueType } from './type/WaitingQueue';
import { PersonType } from './type/Person';

type Props = {
    waitingQueue: WaitingQueueType;
    groupMember: PersonType[];
};

export default function serve(props: Props): JSX.Element {
    if (props.waitingQueue.asGroup) { // 個人受け取りの場合
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