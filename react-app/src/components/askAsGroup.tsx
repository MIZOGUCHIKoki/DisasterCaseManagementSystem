import React, { useState } from 'react';
import { PersonType } from './type/Person';
import StandInLine from './standInLine';

type Props = {
    personInfo: PersonType,
    groupMembers: PersonType[],
};

export default function AskAsGroup(props: Props): JSX.Element {
    const [selected, setSelected] = useState<boolean | null>(null);
    let asGroup = false;
    const handleYes = () => {
        console.log('Yes');
        asGroup = true;
        setSelected(true);
    };
    const handleNo = () => {
        console.log('No');
        setSelected(true);
        asGroup = false;
    };
    if (selected || props.personInfo.group_id == null) {
        if (props.personInfo.group_id == null || !asGroup) {
            /*
                Send data to server as a single person
            */
        } else {
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
                <li>ニックネーム: {props.personInfo.nickName}</li>
            </ul>
            <hr />
            <h3>グループメンバー</h3>
            <ul>
                {props.groupMembers.map((member, index) => (
                    <li key={index}>ニックネーム: {member.nickName}</li>
                ))}
            </ul>
            <div className='buttonGroup'>
                <span onClick={handleYes} className='button' style={{ backgroundColor: '#336699' }}>はい</span>
                <span onClick={handleNo} className='button' style={{ backgroundColor: 'rgb(231, 76, 60)' }}>いいえ</span>
            </div>
        </div >
    );
}