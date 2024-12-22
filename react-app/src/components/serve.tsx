import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DefaultListType } from './type/DefaultList';
import { PersonType } from './type/Person';
import { StockListType } from './type/StockList';
import { defaultList } from './testData/defaultList';
import { stockList } from './testData/stockList';
import { waitingQueue } from './testData/waitingQueue';
import { groupMembers } from './testData/personInfo';
import { WaitingQueueType } from './type/WaitingQueue';
import { ServeLogType } from './type/ServeLog';
import { StockIOType } from './type/StockIO';

type givenDataType = {
  waitingQueue: WaitingQueueType;
  groupMember: PersonType[] | null;
};


const fetchDefaultData = (): DefaultListType[] => {
  /*
    Fetch default stock list from server
  */
  console.log('FETCH DEFAULT STOCKLIST DATA');
  return defaultList;
};

const fetchPersonData = (person_id: PersonType['id']): givenDataType => {
  /*
    Fetch data from server using person_id
  */
  console.log('FETCH DATA from person_id:', person_id);
  const data = {
    waitingQueue: waitingQueue[0],
    groupMember: groupMembers,
  };
  // const data = {
  //   waitingQueue: waitingQueue[1],
  //   groupMember: null,
  // };
  console.log('DATA:', data);
  return data;
};

export default function ServeScreen(): JSX.Element {
  const { person_id } = useParams<{ person_id: PersonType['id'] }>();
  const [stockListState, setStockListState] = useState<{ stockList: StockListType; amount: number }[]>([]);
  const [stockListStateGroup, setStockListStateGroup] = useState<{ stockList: StockListType; amount: number }[][]>([]);
  const [memberIndex2id, setMemberIndex2id] = useState<{ person_id: PersonType['id'], memberIndex: number }[] | null>(null);
  const [recivedClass, setRecivedClass] = useState<number>(0);
  const [givenData, setGivenData] = useState<givenDataType | null>(null);

  useEffect(() => {
    if (!person_id) {
      console.error('person_id is undefined');
      return;
    }

    // Fetch data
    const fetchedPersonData = fetchPersonData(person_id);
    const defaultData = fetchDefaultData();

    // Initialize stockListState
    const initialStockListState = stockList.map((stock) => {
      const defaultItem = defaultData.find((item) => item?.stockList?.id === stock.id);
      return {
        stockList: stock,
        amount: defaultItem ? defaultItem.amount : 0,
      };
    });

    // Initialize stockListStateGroup
    let initialStockListStateGroup: { stockList: StockListType; amount: number }[][] = [];
    if (fetchedPersonData.groupMember) {
      initialStockListStateGroup = fetchedPersonData.groupMember.map(() =>
        stockList.map((stock) => {
          const defaultItem = defaultData.find((item) => item?.stockList?.id === stock.id);
          return {
            stockList: stock,
            amount: defaultItem ? defaultItem.amount : 0,
          };
        })
      );
    }

    // Update state
    setGivenData(fetchedPersonData);
    setStockListState(initialStockListState);
    setStockListStateGroup(initialStockListStateGroup);
    setMemberIndex2id(fetchedPersonData.groupMember ? fetchedPersonData.groupMember.map((member, memberIndex) => ({
      person_id: member.id,
      memberIndex
    })) : null);
  }, []);

  const pushData = () => {
    console.log('SEND DATA');
    if (givenData?.waitingQueue.asGroup) { // Group
      console.log('Group');
      if (givenData.groupMember) {
        const data = memberIndex2id?.map((member) => {
          const data_serveLog: ServeLogType = {
            id: 0,
            person_id: givenData.waitingQueue.personInfo.id,
            received_person_id: member.person_id,
            receiveClassID: recivedClass,
            created_at: ''
          };
          const data_stockIO: StockIOType[] = stockListStateGroup[member.memberIndex].map((item) => ({
            id: 0,
            serveLog_id: 0,
            stock_id: item.stockList.id,
            amount: item.amount,
            created_at: ''
          }));
          return { 'ServeLog': data_serveLog, 'StockIO': data_stockIO };
        });
        console.log('Serve Log:', data);
      }
    } else { // Individual
      console.log('Individual');
      if (givenData) {
        const data_serveLog: ServeLogType = {
          id: 0,
          person_id: givenData.waitingQueue.personInfo.id,
          received_person_id: givenData.waitingQueue.personInfo.id,
          receiveClassID: recivedClass,
          created_at: ''
        };
        const data_stockIO: StockIOType[] = stockListState.map((item) => ({
          id: 0,
          serveLog_id: 0,
          stock_id: item.stockList.id,
          amount: item.amount,
          created_at: ''
        }));
        return { 'ServeLog': data_serveLog, 'StockIO': data_stockIO };
      }
    }
    // window.location.href = '/staff';
  };

  if (!givenData) {
    return <div>Loading...</div>;
  }
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
  if (givenData.waitingQueue.asGroup && givenData.groupMember) {
    return (
      <div>
        <header className="header-serveScreen">
          <span className='button'>初期値</span>
          <div>
            {givenData.waitingQueue.personInfo.nickName} さんの受け取り
          </div>
          <span className='button' onClick={pushData}>確定</span>
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
                    <th></th>
                    <th>数量</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {stockList.map((stock, stockIndex) => (
                    <tr key={stockIndex}>
                      <td>{stock.name}</td>
                      <td>{stock.size}</td>
                      <td>
                        <button onClick={() => handleClick(true, memberIndex, stockIndex, false)}>－</button>
                      </td>
                      <td>
                        <span style={{ margin: '5px' }}>{stockListStateGroup[memberIndex][stockIndex].amount} {stock.unit}</span>
                      </td>
                      <td>
                        <button onClick={() => handleClick(true, memberIndex, stockIndex, true)}>＋</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
        <Total />
      </div >
    );
  }

  return (
    <div>
      <header className="header-serveScreen">
        <span className='button'>初期値</span>
        <div>
          {givenData.waitingQueue.personInfo.nickName} さんの受け取り
        </div>
        <span className='button' onClick={pushData}>確定</span>
      </header>
      <div className="container">
        <div className='serveTbl_one'>
          <div>{givenData.waitingQueue.personInfo.nickName}</div>
          <table className="table">
            <thead>
              <tr>
                <th>物資名</th>
                <th>サイズ</th>
                <th></th>
                <th>数量</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {stockList.map((stock, stockIndex) => (
                <tr key={stockIndex}>
                  <td>{stock.name}</td>
                  <td>{stock.size}</td>
                  <td>
                    <button onClick={() => handleClick(false, 0, stockIndex, false)}>－</button>
                  </td>
                  <td>
                    {stockListState[stockIndex].amount} {stock.unit}
                  </td>
                  <td>
                    <button onClick={() => handleClick(false, 0, stockIndex, true)}>＋</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Total />
      </div >
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