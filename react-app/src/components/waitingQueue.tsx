import React from 'react';
import { waitingQueue } from './testData/waitingQueue';
import { WaitingQueueType } from './type/WaitingQueue';

export default function WaitingQueue() {
    return (
        <div className='container-block'>
            <h2>待ち行列</h2>
            <button style={{ margin: '10px' }} onClick={() => { window.location.href = '/default'; }}>デフォルト値の設定</button>
            <table>
                <thead>
                    <tr>
                        <th>ニックネーム</th>
                        <th>グループでの受け取り</th>
                        <th>読み取り日時</th>
                    </tr>
                </thead>
                <tbody>
                    {waitingQueue.map((queue: WaitingQueueType) => (
                        <tr key={queue.id}>
                            <td>
                                <a href={`/person/${queue.personInfo.id}`}>
                                    {queue.personInfo.nickName}
                                </a>
                            </td>
                            <td>
                                {queue.numberOfMember ? (<div>はい</div>) : (<div>いいえ</div>)}
                            </td>
                            <td>
                                {queue.created_at}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
