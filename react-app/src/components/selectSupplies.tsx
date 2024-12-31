import React, { useState, useEffect } from 'react';

import { DB_DefaultListType } from './type/DefaultList';
import { DB_defaultList } from './testData/defaultList';
import { StockListType } from './type/StockList';
import { stockList } from './testData/stockList';

import { PersonType } from './type/Person';

import { Button } from './Button/Button';
import { PM_Button } from './PM_Button/PM_Button';

import AskAsGroup from './askAsGroup';
import StandInLine from './standInLine';

type Props = {
  person_id: PersonType['id'];
  numberOfPerson: number;
};

type Props_send = {
  person_id: PersonType['id'];
  stockList_Amount: {
    stockList_id: StockListType['id'],
    amount: number
  }[];
  numberOfPerson: number;
};

export default function SelectSupplies({ person_id, numberOfPerson }: Props): JSX.Element {
  const [defaultListData, setDefaultListData] = useState<DB_DefaultListType[]>([]);
  const [stockListData, setStockListData] = useState<StockListType[]>([]);
  const [stockAmount, setStockAmount] = useState<{ sockList_id: StockListType['id'], amount: number }[]>([]);
  const [askAsGroupFlag, setAskAsGroupFlag] = useState<boolean>(false);
  const [postFlag, setPostFlag] = useState<boolean>(false);
  useEffect(() => {
    const fetchDefaultListData = (): DB_DefaultListType[] => {
      return DB_defaultList; // デフォルトリストを取得
    };

    const fetchStockListData = (): StockListType[] => {
      return stockList; // 在庫リストを取得
    };

    setDefaultListData(fetchDefaultListData());
    setStockListData(fetchStockListData());
  }, []);

  useEffect(() => {
    if (stockListData.length > 0 && defaultListData.length > 0) {
      const stockAmountData = stockListData.map((stockItem) => {
        const defaultItem = defaultListData.find((item) => item.stockList_id === stockItem.id);
        return {
          sockList_id: stockItem.id,
          amount: defaultItem ? defaultItem.amount * numberOfPerson : 0,
        };
      });

      setStockAmount(stockAmountData);
    }
  }, [stockListData, defaultListData]);

  const onClick_pm = (pm: boolean, stockList_id: StockListType['id']) => {
    const newStockAmount: { sockList_id: StockListType['id'], amount: number }[] = [];
    stockAmount.map((stockAmountItem: { sockList_id: StockListType['id'], amount: number }) => {
      if (stockAmountItem.sockList_id === stockList_id) {
        if (pm) {
          newStockAmount.push({
            sockList_id: stockList_id,
            amount: stockAmountItem.amount + 1
          });
        } else {
          if (stockAmountItem.amount - 1 < 0) {
            newStockAmount.push({
              sockList_id: stockList_id,
              amount: stockAmountItem.amount
            });
          } else {
            newStockAmount.push({
              sockList_id: stockList_id,
              amount: stockAmountItem.amount - 1
            });
          }
        }
      } else {
        newStockAmount.push(stockAmountItem);
      }
    });
    setStockAmount(newStockAmount);
  };

  const onClick_decide = () => {
    const sendData = (): Props_send => {
      const stockList_Amount = stockAmount
        .filter((stockAmountItem) => stockAmountItem.amount > 0)
        .map((stockAmountItem) => ({
          stockList_id: stockAmountItem.sockList_id,
          amount: stockAmountItem.amount,
        }));

      return {
        person_id: person_id,
        stockList_Amount: stockList_Amount,
        numberOfPerson: numberOfPerson,
      };
    };
    /*
      POST Process
    */
    console.log(sendData());
    setPostFlag(true);
  };

  return (
    (!postFlag) ? (
      (!askAsGroupFlag) ? (
        <div className='container'>
          <div
            style={{
              margin: '10px 10px 0px'
            }}
          >
            <div
              style={{
                marginBottom: '5px'
              }}
            >
              <Button
                primary={true}
                label='決定'
                onClick={() => {
                  onClick_decide();
                }}
              />
            </div>
            <div>
              <Button
                label='戻る'
                onClick={() => {
                  setAskAsGroupFlag(true);
                }}
              />
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th
                  style={{
                    width: '70%',
                    textAlign: 'left',
                  }}
                >
                  物資名
                </th>
                <th
                  style={{
                    width: '30%',
                    textAlign: 'center',
                  }}
                >数量</th>
              </tr>
            </thead>
            <tbody>
              {stockList.map((item: StockListType, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name} {item.size}</td>
                    <td>
                      <PM_Button
                        context={
                          stockAmount.find((stockAmountItem: {
                            sockList_id: StockListType['id'],
                            amount: number
                          }) => stockAmountItem.sockList_id === item.id)?.amount || 0
                        }
                        type={false}
                        unit={item.unit}
                        onClick_minus={() => {
                          onClick_pm(false, item.id);
                        }}
                        onClick_plus={() => {
                          onClick_pm(true, item.id);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <AskAsGroup
            person_id={person_id}
          />
        </div>
      )
    ) : (
      <StandInLine />
    )
  );
}