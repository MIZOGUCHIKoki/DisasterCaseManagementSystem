import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { WaitingQueueType } from './type/WaitingQueue';
import { PersonType } from './type/Person';
import { waitingQueue } from './testData/waitingQueue';
import { groupMembers } from './testData/personInfo';
import { stockList } from './testData/stockList';
import { StockListType } from './type/StockList';


type givenDataType = {
    waitingQueue: WaitingQueueType;
    groupMember: PersonType[];
};

const givenData: givenDataType = {
    waitingQueue: waitingQueue[1],
    groupMember: groupMembers
};



export default function ServeScreen(): JSX.Element {
    const { person_id } = useParams();
    const [stockListState, setStockListState] = useState<number[] | number[][]>(
        givenData.waitingQueue.asGroup ? [[]] : []
    );

    useEffect(() => { // only once when the component is mounted
        if (!givenData.waitingQueue.asGroup) {
            console.log('create stockListState as ALONE');
            setStockListState([]);
        } else {
            console.log('create stockListState as GROUP');
            setStockListState([[]]);
        }
    }, []);

    console.log('person_id:', person_id);

    if (givenData.waitingQueue.asGroup) {
        return (
            <div className='serveTbl'>
                {givenData.groupMember.map((member, index) => (
                    <div key={index} className='serveTbl_one'>
                        <div>{member.nickName}</div>
                        <table className='table_cols'>
                            <thead>
                                <tr>
                                    <th>物資名</th>
                                    <th>サイズ</th>
                                    <th>数量</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stockList.map((stock: StockListType, index: number) => (
                                    < tr key={index} >
                                        <td>{stock.name}</td>
                                        <td>{stock.size}</td>
                                        <td>
                                            <div>
                                                <button>＋</button>
                                                <button>－</button>
                                                {stock.unit}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))
                }
            </div >
        );
    }

    return (
        <div className='serveTbl'>
            <table className='table_cols'>
                <thead>
                    <tr>
                        <th>物資名</th>
                        <th>サイズ</th>
                        <th>数量</th>
                    </tr>
                </thead>
                <tbody>
                    {stockList.map((stock, index) => (
                        < tr key={index} >
                            <td>{stock.name}</td>
                            <td>{stock.size}</td>
                            <td>
                                <div>
                                    <button >＋</button>
                                    <button>－</button>
                                    {stockListState}
                                    {stock.unit}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
}
