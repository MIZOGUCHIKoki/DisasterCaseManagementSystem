import React, { useState } from 'react';
import { DB_WaitingQueueType } from './type/WaitingQueue';
import StandInLine from './standInLine';
import { person_groupMember } from './QrReader';

import { Button } from '../stories/Button';

export default function AskAsGroup(props: person_groupMember): JSX.Element {
    const [selected, setSelected] = useState<boolean | null>(null);
    let asGroup = false;
    const handleYes = (): void => {
        console.log('Yes');
        asGroup = true;
        setSelected(true);
    };
    const handleNo = (): void => {
        console.log('No');
        setSelected(true);
        asGroup = false;
    };
    if (selected || props.person.group_id == null) {
        if (props.person.group_id == null || !asGroup) { // 個人での受け取り
            const data: DB_WaitingQueueType = {
                id: 0,
                person_id: props.person.id,
                asGroup: asGroup,
                complete: false,
                created_at: ''
            };
            console.log(data);
            /*
                Send data to server as an individual
            */
        } else {  // グループでの受け取り
            const data: DB_WaitingQueueType = {
                id: 0,
                person_id: props.person.id,
                asGroup: asGroup,
                complete: true,
                created_at: ''
            };
            console.log(data);
            /*
                Send data to server as a group
            */
        }
        return <StandInLine />;
    }
    return (
        <div className='container-block'>
            <h2>グループでのお受け取りをご希望ですか？</h2>
            <h3>あなた</h3>
            <ul>
                <li>ニックネーム: {props.person.nickName}</li>
            </ul>
            <hr />
            <h3>グループメンバー</h3>
            <ul>
                {props.groupMembers.map((member, index) => (
                    <li key={index}>ニックネーム: {member.nickName}</li>
                ))}
            </ul>
            <div className='buttonGroup'>
                <Button primary={false} onClick={handleNo} label="一人分のみ" />
                <div>
                    <Button primary={false} onClick={() => { return; }} pm={true} label="＋" />
                    <Button primary={false} onClick={() => { return; }} pm={true} label="ー" />
                </div>
                <Button primary onClick={handleYes} label="グループの分も" />
            </div>
        </div >
    );
}
