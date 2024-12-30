import React, { useState, useEffect } from 'react';

import { FetchedData_PersonAndGroup } from './QrReader';

import { Button } from './Button/Button';
import { PM_Button } from './PM_Button/PM_Button';

export default function AskAsGroup(props: FetchedData_PersonAndGroup): JSX.Element {
    const [numberOfGroup, setNumberOfGroup] = useState<number>(0);
    const [postState, setPostState] = useState<boolean>(false);
    useEffect(() => {
        setNumberOfGroup(props.groupMembers.length + 1);
        console.log('numberOfGroup:', numberOfGroup);
    }, []);
    const post = () => {
        console.log('numberOfGroup_POST:', numberOfGroup);
        setPostState(true);
    };
    return postState ? (
        <div>

        </div>
    )
        : (
            <div className='container'>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        width: '100%',
                    }}
                >
                    <div
                        style={{
                            width: '50%',
                        }}>
                        <div style={{ margin: '10px' }}>あなた</div>
                        <ul>
                            <li>{props.person.nickName}</li>
                        </ul>
                    </div>
                    <div
                        style={{
                            width: '50%',
                        }}
                    >
                        <div style={{ margin: '10px' }}>グループメンバ</div>
                        <ul>
                            {props.groupMembers.map((member, index) => (
                                <li key={index}>
                                    {member.nickName}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div
                    style={{

                    }}
                >
                    <div style={{ margin: '10px' }}>何人分受け取りますか？</div>
                    <div
                        style={{
                            margin: '10px 10px',
                            height: '60px'
                        }}>
                        <Button
                            primary={false}
                            onClick={() => {
                                setNumberOfGroup(1);
                                post();
                            }}
                            label="一人分のみ"
                        />
                    </div>
                    <div
                        style={{
                            margin: '10px 10px',
                            height: '60px'
                        }}
                    >
                        <Button onClick={() => {
                            setNumberOfGroup(props.groupMembers.length + 1);
                            post();
                        }} label={`グループの分も （合計${props.groupMembers.length + 1}名分）`} />
                    </div>
                </div>
                <div>
                    <div
                        style={{
                            margin: '10px 10px',
                            height: '60px'
                        }}
                    >
                        <hr />
                        <PM_Button context={numberOfGroup} type={true}
                            onClick_plus={() => { setNumberOfGroup(numberOfGroup + 1); }}
                            onClick_minus={() => {
                                if (numberOfGroup > 1)
                                    setNumberOfGroup(numberOfGroup - 1);
                            }}
                            onClick_decide={() => { post(); }}
                            unit='人'
                            label_decision='任意に決める'
                        />
                    </div>
                </div>
            </div >
        );
}
