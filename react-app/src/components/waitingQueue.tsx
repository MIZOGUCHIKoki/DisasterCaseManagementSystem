import React, { useState, useEffect } from 'react';
import { waitingQueue as waitingQueue_list } from './testData/waitingQueue';
import { WaitingQueueType } from './type/WaitingQueue';
import { Button } from './Button/Button';

export default function WaitingQueue(): JSX.Element {
    const [waitingQueue, setWaitingQueue] = useState<WaitingQueueType[]>([]);
    useEffect(() => {
        /*
            FETCH DATA FROM DATABASE
        */
        const data: WaitingQueueType[] = waitingQueue_list;
        setWaitingQueue(data);
        console.log('waitingQueue:', waitingQueue);
    }, [waitingQueue]);
    // const cardWidth = (): number => {
    //     if (screen.width > 768) { // PC, tablet
    //         return 50;
    //     } else { // Mobile
    //         return 100;
    //     }
    // };
    return (
        <div className='container'
            style={{

            }}
        >
            {/* スクロールするカード */}
            <div
                style={{
                    display: 'block',
                    // justifyContent: 'space-between',
                    justifyContent: 'center',
                    // overflowX: 'scroll',
                    // width: `${waitingQueue.length * cardWidth()}vw`,
                    width: '100%',
                    height: '100%',
                }}
            >
                {waitingQueue.map((queue: WaitingQueueType) => (
                    <div key={queue.id} style={{
                        // width: `${cardWidth()}vw`, // カードの幅を指定
                        width: '90%',
                        margin: '10px 10px 20px 10px', // 各カードにマージンを追加
                        border: '1px solid #ccc', // 各カードにボーダーを追加
                        borderRadius: '8px', // 角を丸くする
                        padding: '10px', // 内側の余白を追加
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // 影を追加
                        overflowY: 'scroll',
                        height: 'auto',
                    }}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '10px',
                                backgroundColor: '#f0f0f0',
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
                                            textAlign: 'left'
                                        }}
                                    >
                                        物資名</th>
                                    <th
                                        style={{
                                            width: '20%',
                                            textAlign: 'center'
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
                                    console.log('complete');
                                }}
                                label='受け取り完了'
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
}
