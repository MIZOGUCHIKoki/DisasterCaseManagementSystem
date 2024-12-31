import React, { useState, useEffect } from 'react';
import { personInfo, groupMembers } from './testData/personInfo';
import { Button } from './Button/Button';
import { PM_Button } from './PM_Button/PM_Button';
import { PersonType } from './type/Person';
import SelectSupplies from './selectSupplies';


// Fetched data type from API after QR code reading
type FetchedData_PersonAndGroup = {
    personInfo: {
        id: PersonType['id'];
        nickName: PersonType['nickName'];
    },
    groupMembers: {
        id: PersonType['id'];
        nickName: PersonType['nickName'];
    }[];
};

type Props = {
    person_id: string;
}

export default function AskAsGroup({ person_id }: Props): JSX.Element {
    const [numberOfGroup, setNumberOfGroup] = useState<number>(0);
    const [postState, setPostState] = useState<boolean>(false);
    const [fetchedData, setFetchedData] = useState<FetchedData_PersonAndGroup | null>(null);
    useEffect(() => {
        console.log(
            'QR読み取り [person_id]:',
            person_id
        );
        /*
            FETCH DATA from API using the result
        */
        const fetchedData: FetchedData_PersonAndGroup = {
            personInfo: {
                id: personInfo[0].id,
                nickName: personInfo[0].nickName
            },
            groupMembers: [
                {
                    id: groupMembers[0].id,
                    nickName: groupMembers[0].nickName
                },
                {
                    id: groupMembers[1].id,
                    nickName: groupMembers[1].nickName
                },
                {
                    id: groupMembers[2].id,
                    nickName: groupMembers[2].nickName
                }
            ]
        };
        setFetchedData(fetchedData);
        setNumberOfGroup(fetchedData.groupMembers.length + 1);
    }, []);
    const post = () => {
        setPostState(true);
    };
    return postState || fetchedData === null ? (
        fetchedData === null ? (
            <div>
                <div>読み込み中...</div>
            </div>
        ) : (
            <SelectSupplies
                person_id={fetchedData.personInfo.id}
                numberOfPerson={numberOfGroup}
            />
        )
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
                            <li>{fetchedData.personInfo.nickName}</li>
                        </ul>
                    </div>
                    <div
                        style={{
                            width: '50%',
                        }}
                    >
                        <div style={{ margin: '10px' }}>グループメンバ</div>
                        <ul>
                            {fetchedData.groupMembers.map((member, index) => (
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
                            setNumberOfGroup(fetchedData.groupMembers.length + 1);
                            post();
                        }} label={`グループの分も （合計${fetchedData.groupMembers.length + 1}名分）`} />
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
