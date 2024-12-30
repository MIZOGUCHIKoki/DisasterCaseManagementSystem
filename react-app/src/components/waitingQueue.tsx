import React from 'react';
import { waitingQueue } from './testData/waitingQueue';
import { WaitingQueueType } from './type/WaitingQueue';
import { Button } from './Button/Button';

export default function WaitingQueue(): JSX.Element {

    console.log('waitingQueue:', waitingQueue.length);
    const cardWidth = (): number => {
        if (screen.width > 768) { // PC, tablet
            return 50;
        } else { // Mobile
            return 100;
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
                    display: 'flex',
                    justifyContent: 'space-between',
                    overflowX: 'scroll',
                    width: `${waitingQueue.length * cardWidth()}vw`,
                }}
            >
                {waitingQueue.map((queue: WaitingQueueType) => (
                    <div key={queue.id} style={{
                        width: `${cardWidth()}vw`, // カードの幅を指定
                        margin: '10px', // 各カードにマージンを追加
                        border: '1px solid #ccc', // 各カードにボーダーを追加
                        borderRadius: '8px', // 角を丸くする
                        padding: '10px', // 内側の余白を追加
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // 影を追加
                        overflowY: 'scroll',
                    }}>
                        <div style={{

                        }}
                        >{queue.personInfo.nickName}</div>
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
                                <tr>
                                    <td>aaa</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div >
    );
}
