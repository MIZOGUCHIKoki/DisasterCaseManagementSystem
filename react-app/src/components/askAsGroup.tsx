import React, { useState, useEffect } from 'react';

import { FetchedData_PersonAndGroup } from './QrReader';

import { Button } from './Button/Button';
import { PM_Button } from './PM_Button/PM_Button';

export default function AskAsGroup(props: FetchedData_PersonAndGroup): JSX.Element {
    const [numberOfGroup, setNumberOfGroup] = useState<number>(0);
    const receiveAlone = () => {
        console.log('receiveAlone');
        setNumberOfGroup(1);
    };
    const receiveGroup = () => {
        console.log('receiveGroup');
        setNumberOfGroup(props.groupMembers.length + 1);
    };
    const receiveNumber = (num: number) => {
        console.log('receiveNumber', num);
        setNumberOfGroup(num);
    };
    useEffect(() => {
        setNumberOfGroup(props.groupMembers.length + 1);
        console.log('numberOfGroup:', numberOfGroup);
    }, []);
    return (
        <div className='container'>
            <div style={{ margin: '10px' }}>グループでのお受け取りをご希望ですか？</div>
            <div style={{ margin: '10px' }}>あなた</div>
            <ul>
                <li>{props.person.nickName}</li>
            </ul>
            <div style={{ margin: '10px' }}>グループメンバ</div>
            <ul>
                {props.groupMembers.map((member, index) => (
                    <li key={index}>{member.nickName}</li>
                ))}
            </ul>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '10px',
                }}
            >
                <Button primary={false} onClick={receiveAlone} label="一人分のみ" />
                <div>
                    <PM_Button context={numberOfGroup} type={true}
                        onClick_plus={() => receiveNumber(numberOfGroup + 1)}
                        onClick_minus={() => receiveNumber(numberOfGroup - 1)}
                        onClick_decide={() => { return; }}
                    />
                </div>
                <Button onClick={receiveGroup} label="グループの分" />
            </div>
        </div >
    );
}
