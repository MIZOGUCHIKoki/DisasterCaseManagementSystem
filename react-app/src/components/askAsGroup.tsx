import React, { useState, useEffect } from 'react';
import { personInfo, groupMembers } from './testData/personInfo';
import { Button } from './Button/Button';
import { PM_Button } from './PM_Button/PM_Button';
import { PersonType } from './type/Person';
import SelectSupplies from './selectSupplies';

type FetchedData_PersonAndGroup = {
    person: PersonType;
    groupMembers: PersonType[];
};

type Props = {
    person_id: string;
}
export default function AskAsGroup({ person_id }: Props): JSX.Element {
    const [numberOfGroup, setNumberOfGroup] = useState<number>(0);
    const [postState, setPostState] = useState<boolean>(false);
    const [fetchedData, setFetchedData] = useState<FetchedData_PersonAndGroup | null>(null);
    useEffect(() => {
        console.log('person_id:', person_id);
        /*
            FETCH DATA from API using the result
        */
        const fetchedData: FetchedData_PersonAndGroup = {
            person: personInfo[0],
            groupMembers: groupMembers
        };
        setFetchedData(fetchedData);
        setNumberOfGroup(fetchedData.groupMembers.length + 1);
        console.log('numberOfGroup:', numberOfGroup);
    }, []);
    const post = () => {
        console.log('numberOfGroup_POST:', numberOfGroup);
        setPostState(true);
    };
    return postState || fetchedData === null ? (
        fetchedData === null ? (
            <div>
                <div>読み込み中...</div>
            </div>
        ) : (
            <SelectSupplies />
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
                            <li>{fetchedData.person.nickName}</li>
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
