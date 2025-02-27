import React, { useState, useEffect } from 'react';
import { Button } from './Button/Button';
import { PM_Button } from './PM_Button/PM_Button';
import { PersonType } from './type/Person';
import { PersonIcon } from './PersonIcon/PersonIcon';
import SelectSupplies from './selectSupplies';

// Fetched data type from API after QR code reading
type FetchedData_PersonAndGroup = {
    person_info: {
        id: PersonType['id'];
        nick_name: PersonType['nick_name'];
    },
    group_member: {
        id: PersonType['id'];
        nick_name: PersonType['nick_name'];
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
        console.log('QR読み取り [person_id]:', person_id);
        const fetchData = async (): Promise<void> => {
            try {
                // console.log(process.env.REACT_APP_API_ADDR);
                // const response = await fetch(`${process.env.REACT_APP_API_ADDR}/person/${person_id}?timestamp=${new Date().getTime()}`);
                // if (!response.ok) throw new Error(`Failed to fetch person: ${response.status}`);
                // const data: FetchedData_PersonAndGroup = await response.json();
                // setFetchedData(data);
                // setNumberOfGroup(data.groupMember.length + 1); // Include the person themselves
                const response: Promise<Response> = fetch(`${process.env.REACT_APP_API_ADDR}/person/${person_id}?timestamp=${new Date().getTime()}`);
                response.then((res) => {
                    if (!res.ok) throw new Error(`Failed to fetch person: ${res.status}`);
                    const data: Promise<FetchedData_PersonAndGroup> = res.json();
                    data.then((data) => {
                        setFetchedData(data);
                        setNumberOfGroup(data.group_member.length + 1); // Include the person themselves
                    });
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData()
            .then(() => { console.log('success'); })
            .catch((err) => { console.log(err); }); // Promise<void>
    }, [person_id]); // Add person_id as a dependency so it fetches new data when person_id changes

    const post = () => {
        setPostState(true);
    };

    // If data is still loading or postState is true, render the loading state or next step
    if (postState || fetchedData === null) {
        return (
            <div>
                {fetchedData === null ? (
                    <div>読み込み中...</div>
                ) : (
                    <SelectSupplies
                        person_id={fetchedData.person_info.id}
                        number_of_people={numberOfGroup}
                    />
                )}
            </div>
        );
    }

    return (
        <div className="container">
            <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                width: 'auto',
                margin: '10px 10px 0px 10px'
            }}>
                <div style={{ width: '50%', }}>
                    <div style={{ margin: '10px' }}>あなた</div>
                    {/* Ensure fetchedData is not null or undefined */}
                    {fetchedData && fetchedData.person_info ? (
                        <div style={{
                            height: '40px',
                            border: '3px solid black',
                            borderRadius: '5px',
                            boxSizing: 'border-box',
                        }}>
                            <PersonIcon id={fetchedData.person_info.nick_name} />
                        </div>
                    ) : (
                        <div>データがありません</div>
                    )}
                </div>
                <div style={{ width: '50%' }}>
                    {/* <div style={{ margin: '10px' }}>グループメンバ</div> */}
                    {/* Check for null or undefined groupMember */}
                    {fetchedData && fetchedData.group_member.length > 0 ? (
                        <div
                            style={{
                                marginLeft: '10px',
                                display: 'block',
                                boxSizing: 'border-box',
                                width: 'auto'
                            }}>
                            {fetchedData.group_member.map((member) => (
                                <div
                                    key={member.nick_name}
                                    style={{
                                        boxSizing: 'border-box',
                                        height: '40px',
                                        border: '3px solid black',
                                        width: 'auto',
                                        borderRadius: '5px',
                                        marginBottom: '8px'
                                    }}
                                >
                                    {/* <PersonIcon id={member.nick_name} /> */}
                                </div>
                            ))}
                        </div>
                    ) : (
                        // <div style={{ marginLeft: '10px', fontSize: '1rem' }}>メンバーなし</div>
                        <div></div>
                    )}
                </div>
            </div>
            <div>
                <div style={{ margin: '10px' }}>何人分受け取りますか？</div>
                <div style={{ margin: '10px 10px', height: '60px' }}>
                    <Button
                        primary={false}
                        onClick={() => {
                            setNumberOfGroup(1);
                            post();
                        }}
                        label="一人分のみ"
                    />
                </div>
                {(fetchedData && fetchedData.group_member.length > 0) ? (
                    <div style={{ margin: '10px 10px', height: '60px' }}>
                        <Button
                            onClick={() => {
                                if (fetchedData) {
                                    setNumberOfGroup(fetchedData.group_member.length + 1);
                                    post();
                                }
                            }}
                            label={`グループの分も （合計${fetchedData?.group_member.length + 1}名分）`}
                        />
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
            <div>
                <div style={{ margin: '10px 10px', height: '60px' }}>
                    <hr />
                    <PM_Button
                        context={numberOfGroup}
                        type={true}
                        onClick_plus={() => setNumberOfGroup(numberOfGroup + 1)}
                        onClick_minus={() => {
                            if (numberOfGroup > 1) setNumberOfGroup(numberOfGroup - 1);
                        }}
                        onClick_decide={() => post()}
                        unit="人"
                        label_decision="任意に決める"
                    />
                </div>
            </div>
        </div>
    );
}