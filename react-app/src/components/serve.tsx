import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { WaitingQueueType } from './type/WaitingQueue';
import { PersonType } from './type/Person';
import { waitingQueue } from './testData/waitingQueue';
import { groupMembers } from './testData/personInfo';
import { stockList } from './testData/stockList';
import { DefaultListType } from './type/DefaultList';
import { defaultList } from './testData/defaultList';
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

  const fetchPersonData = (person_id: PersonType['id']): givenDataType => {
    /*
      Fetch data from server using person_id
    */
    console.log('FETCH DATA from person_id:', person_id);
    return givenData;
  };
  if (person_id) {
    fetchPersonData(person_id);
  } else {
    console.error('person_id is undefined');
  }

  const fetchDefaultData = (): DefaultListType[] => {
    /*
      Fetch default stock list from server
    */
    console.log('FETCH DEFAULT STOCKLIST DATA');
    return defaultList;
  };

  const [stockListState, setStockListState] = useState<{ stockList: StockListType, amount: number }[]>(
    stockList.map((stock: StockListType) => {
      const defaultItem = fetchDefaultData().find((item: DefaultListType) => item?.stockList?.id === stock.id);
      if (!defaultItem) {
        console.error('Default data is not found for:', stock);
      }
      return {
        stockList: stock,
        amount: defaultItem ? defaultItem.amount : 0
      };
    })
  );

  const [stockListStateGroup, setStockListStateGroup] = useState<{ stockList: StockListType, amount: number }[][]>(
    givenData.groupMember.map(() => {
      return stockList.map((stock: StockListType) => {
        const defaultItem = fetchDefaultData().find((item: DefaultListType) => item?.stockList?.id === stock.id);
        if (!defaultItem) {
          console.error('Default data is not found for:', stock);
        }
        return {
          stockList: stock,
          amount: defaultItem ? defaultItem.amount : 0
        };
      });
    })
  );

  const handleClick = (
    isGroup: boolean,
    memberIndex: number,
    stockIndex: number,
    isPlus: boolean
  ) => {
    if (isGroup) {
      setStockListStateGroup((prev: { stockList: StockListType, amount: number }[][]) => {
        const updated = prev.map((memberStockList, memberIndex_i) => {
          if (memberIndex === memberIndex_i) {
            return memberStockList.map((item, index) => {
              if (index === stockIndex) {
                return {
                  ...item,
                  amount: item.amount + (isPlus ? 1 : -1)
                };
              }
              return item;
            });
          }
          return memberStockList;
        });
        return updated;
      });
    } else {
      setStockListState((prev: { stockList: StockListType, amount: number }[]) => {
        const updated = prev.map((item, index) => {
          if (index === stockIndex) {
            return {
              ...item,
              amount: item.amount + (isPlus ? 1 : -1)
            };
          }
          return item;
        });
        return updated;
      });
    }
  };

  console.log('person_id:', person_id);

  if (givenData.waitingQueue.asGroup) {
    return (
      <div>
        <header className="header-serveScreen">
          <span className='button'>初期値</span>
          <div>
            {givenData.waitingQueue.personInfo.nickName} さんの受け取り
          </div>
          <span className='button' onClick={
            () => {
              window.location.href = '/staff';
            }
          }>確定</span>
        </header>
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
                          <button onClick={() => handleClick(true, memberIndex, stockIndex, false)}>－</button>
                          <span style={{ margin: '5px' }}>{stockListStateGroup[memberIndex][stockIndex].amount} {stock.unit}</span>
                          <button onClick={() => handleClick(true, memberIndex, stockIndex, true)}>＋</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
        <Total />
      </div>
    );
  }

  return (
    <div className="container">
      <div className='serveTbl_one'>
        <div>{givenData.waitingQueue.personInfo.nickName}</div>
        <table className="table">
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
                    <button onClick={() => handleClick(false, 0, stockIndex, false)}>－</button>
                    {stockListState[stockIndex].amount} {stock.unit}
                    <button onClick={() => handleClick(false, 0, stockIndex, true)}>＋</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Total />
    </div>
  );
}


export function Total(): JSX.Element {
  return (
    <div className='container'>
      トータル個数表示予定地
    </div>
  );
}