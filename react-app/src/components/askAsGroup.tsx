import React, { useState } from 'react';
import { PersonType } from './type/Person';
import StandInLine from './standInLine';

type Props = {
    personInfo: PersonType,
    groupMembers: PersonType[]
};

export default function AskAsGroup(props: Props): JSX.Element {
    const [selected, setSelected] = useState<boolean>(false);
    const handleYes = () => {
        console.log('Yes');
        setSelected(true);
    };
    const handleNo = () => {
        console.log('No');
        setSelected(true);
    };
    if (selected) {
        return <StandInLine />;
    }
    return (
        <div>
            <h1>グループでのお受け取りをご希望ですか？</h1>
            あなたのニックネーム
            <ul>
                <li>ニックネーム: {props.personInfo.nickName}</li>
            </ul>
            <hr />
            <ul>
                {props.groupMembers.map((member, index) => (
                    <li key={index}>ニックネーム: {member.nickName}</li>
                ))}
            </ul>
            <div>
                <button onClick={handleYes}>はい</button>
                <button onClick={handleNo}>いいえ</button>
            </div>
        </div>
    )
}
