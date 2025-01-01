import React, { useState, useEffect } from 'react';
import { Button } from './Button/Button';

import { WaitingQueueType } from './type/WaitingQueue';
import { PersonType } from './type/Person';
import { StockListType } from './type/StockList';

type fetchedQueueData = {
    id: WaitingQueueType['id'];
    person_info: {
        nickName: PersonType['nickName'];
    }
    numberOfMember: WaitingQueueType['numberOfMember'];
    supplies_info: {
        stock_info: {
            name: StockListType['name'];
            unit: StockListType['unit'];
        },
        amount: number;
    }[];
}


export default function WaitingQueue(): JSX.Element {
    const [waitingQueue, setWaitingQueue] = useState<fetchedQueueData[]>([]);
    const [fetchDataFlag, setFetchDataFlag] = useState<boolean>(false);
    /* 
        if (waitingQueue.length <= 3) {
            numberOfMember = true;
            FETCH DATA FROM DATABASE
            numberOfMember = false;
        } 
    */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await
                    fetch(`/testData/waitingQueue.json?timestamp=${new Date().getTime()}`)
                        .then(res => {
                            if (!res.ok)
                                throw new Error(`Failed to fetch waitingQueue: ${res.status}`);
                            return res.json();
                        });
                const data: fetchedQueueData[] = fetchedData;
                setWaitingQueue(data);
                setFetchDataFlag(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [fetchDataFlag]);
    const post = (queue_id: number): void => {
        console.log('POST: 受け取り完了:', queue_id);
        // 受け取り完了処理
        setWaitingQueue(waitingQueue.filter(queue => queue.id !== queue_id));
        if (waitingQueue.length <= 3) {
            setFetchDataFlag(true);
        }
    };
    const style = (): React.CSSProperties => {
        if (screen.width > 768) { // PC, tablet
            return {
                display: 'flex',
                justifyContent: 'space-between',
                overflowX: 'scroll',
                width: `${waitingQueue.length * 50}vw`,
            };
        } else { // Mobile
            return {
                display: 'block',
                justifyContent: 'center',
                alignItems: 'center',
                width: 'auto',
                height: 'auto',
            };
        }
    };
    const cardWidth = (): React.CSSProperties => {
        if (screen.width > 768) { // PC, tablet
            return {
                width: '50vw', // カードの幅を指定
                overflowY: 'scroll'
            };
        } else { // Mobile
            return {
                width: 'auto',
            };
        }
    };
    return (
        <div className='container'
            style={{
            }}
        >
            {/* スクロールするカード */}
            <div
                style={{
                    ...style(),

                }}
            >
                {waitingQueue.map((queue: fetchedQueueData) => (
                    <div key={queue.id} style={{
                        ...cardWidth(),
                        margin: '10px 10px 30px 10px', // 各カードにマージンを追加
                        border: '1px solid #ccc', // 各カードにボーダーを追加
                        borderRadius: '8px', // 角を丸くする
                        padding: '10px', // 内側の余白を追加
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', // 影を追加
                    }}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '10px',
                                backgroundColor: '#4a6eda',
                                color: 'white',
                                alignItems: 'center',
                            }}
                        >
                            <div>{queue.person_info.nickName}</div>
                            <div>{queue.numberOfMember}人分</div>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th
                                        style={{
                                            width: '80%',
                                            textAlign: 'left',
                                            backgroundColor: 'gray',
                                        }}
                                    >
                                        物資名</th>
                                    <th
                                        style={{
                                            width: '20%',
                                            textAlign: 'center',
                                            backgroundColor: 'gray',
                                        }}
                                    >
                                        数量
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {queue.supplies_info.map((supply, index) => (
                                    <tr key={index}>
                                        <td>{supply.stock_info.name}</td>
                                        <td
                                            style={{
                                                textAlign: 'center'
                                            }}
                                        >{supply.amount} {supply.stock_info.unit}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div
                            style={{
                                marginTop: '10px',

                            }}
                        >
                            <Button
                                onClick={() => {
                                    // 受け取り完了処理
                                    post(queue.id);
                                }}
                                label='受け取り完了'
                                primary={true}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
}
