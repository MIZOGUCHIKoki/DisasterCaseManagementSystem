import React, { useState } from 'react';
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
  waitingQueue: waitingQueue[0],
  groupMember: groupMembers,
};

export default function ServeScreen(): JSX.Element {
  const { person_id } = useParams();

  const [stockListState, setStockListState] = useState<number[]>(
    Array(stockList.length).fill(0)
  );

  const [stockListStateGroup, setStockListStateGroup] = useState<number[][]>(
    Array(givenData.groupMember.length)
      .fill(null)
      .map(() => Array(stockList.length).fill(0))
  );

  const handleClick = (
    isGroup: boolean,
    memberIndex: number,
    stockIndex: number,
    isPlus: boolean
  ) => {
    if (isGroup) {
      setStockListStateGroup((prev) => {
        const updated = [...prev];
        updated[memberIndex] = [...updated[memberIndex]];
        if (updated[memberIndex][stockIndex] >= 0 && isPlus) {
          updated[memberIndex][stockIndex] += isPlus ? 1 : -1;
        }
        return updated;
      });
    } else {
      setStockListState((prev) => {
        const updated = [...prev];
        if (updated[stockIndex] >= 0 && isPlus) {
          updated[stockIndex] += isPlus ? 1 : -1;
        }
        return updated;
      });
    }
  };

  console.log('person_id:', person_id);

  if (givenData.waitingQueue.asGroup) {
    return (
      <div className="serveTbl">
        {givenData.groupMember.map((member, memberIndex) => (
          <div key={memberIndex} className="serveTbl_one">
            <div>{member.nickName}</div>
            <table className="table_cols">
              <thead>
                <tr>
                  <th>物資名</th>
                  <th>サイズ</th>
                  <th>数量</th>
                </tr>
              </thead>
              <tbody>
                {stockList.map((stock, stockIndex) => (
                  <tr key={stockIndex}>
                    <td>{stock.name}</td>
                    <td>{stock.size}</td>
                    <td>
                      <div>
                        <button onClick={() => handleClick(true, memberIndex, stockIndex, true)}>＋</button>
                        <button onClick={() => handleClick(true, memberIndex, stockIndex, false)}>－</button>
                        {stockListStateGroup[memberIndex][stockIndex]} {stock.unit}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="serveTbl">
      <table className="table_cols">
        <thead>
          <tr>
            <th>物資名</th>
            <th>サイズ</th>
            <th>数量</th>
          </tr>
        </thead>
        <tbody>
          {stockList.map((stock, stockIndex) => (
            <tr key={stockIndex}>
              <td>{stock.name}</td>
              <td>{stock.size}</td>
              <td>
                <div>
                  <button onClick={() => handleClick(false, 0, stockIndex, true)}>＋</button>
                  <button onClick={() => handleClick(false, 0, stockIndex, false)}>－</button>
                  {stockListState[stockIndex]} {stock.unit}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
