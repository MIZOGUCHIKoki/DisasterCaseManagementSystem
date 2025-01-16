import React, { useState, useEffect } from 'react';

// Import data types
import { StockListType } from './type/StockList';
import { PersonType } from './type/Person';
import { DB_DefaultListType } from './type/DefaultList';

// Import components
import { Button } from './Button/Button';
import { PM_Button } from './PM_Button/PM_Button';

// Import screens
import AskAsGroup from './askAsGroup';
import StandInLine from './standInLine';

type Props = {
  person_id: PersonType['id'];
  number_of_people: number;
};

type post_waintngQueue = {
  person_id: PersonType['id'];
  stockList_Amount: {
    stock_list_id: StockListType['id'],
    amount: number
  }[];
  number_of_people: number;
};

export type fetchedData_stock_amount = {
  id: StockListType['id'];
  name: StockListType['name'];
  size: StockListType['size'];
  unit: StockListType['unit'];
  allergy: StockListType['allergy'];
  janure_id: StockListType['janure_id'];
  amount: DB_DefaultListType['amount'];
};

export default function SelectSupplies({ person_id, number_of_people }: Props): JSX.Element {
  const [fetchDataState, setFetchDataState] = useState<fetchedData_stock_amount[]>([]);
  const [askAsGroupFlag, setAskAsGroupFlag] = useState<boolean>(false);
  const [postFlag, setPostFlag] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData_stock_amount =
          await fetch(`${process.env.REACT_APP_API_ADDR}/defaultList?timestamp=${new Date().getTime()}`)
            .then(res => {
              if (!res.ok)
                throw new Error(`Failed to fetch stockList: ${res.status}`);
              return res.json();
            });
        setFetchDataState(fetchedData_stock_amount);
        setFetchDataState((prev) => {
          return prev.map((item) => {
            return {
              ...item,
              amount: item.amount * number_of_people
            };
          });
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const onClick_pm = (pm: boolean, item_id: fetchedData_stock_amount['id']) => {
    const newFetchDataState = fetchDataState.map((item) => {
      if (item.id === item_id) {
        if (pm) {
          return {
            ...item,
            amount: item.amount + 1
          };
        } else {
          if (item.amount - 1 < 0) {
            return {
              ...item,
              amount: item.amount
            };
          } else {
            return {
              ...item,
              amount: item.amount - 1
            };
          }
        }
      } else {
        return item;
      }
    });
    setFetchDataState(newFetchDataState);
  };

  const onClick_decide = () => {
    const sendData = (): post_waintngQueue => {
      const stockList_Amount = fetchDataState
        .filter((stockAmountItem) => stockAmountItem.amount > 0)
        .map((stockAmountItem) => ({
          stock_list_id: stockAmountItem.id,
          amount: stockAmountItem.amount,
        }));

      return {
        person_id: person_id,
        stockList_Amount: stockList_Amount,
        number_of_people: number_of_people,
      };
    };
    /*
      POST Process
    */
    const PostData = async (): Promise<void> => {
      try {
        await fetch(`${process.env.REACT_APP_API_ADDR}/stock_io`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(sendData())
        }).then((res) => {
          if (!res.ok) {
            throw new Error(`Failed to post data: ${res.status}`);
          }
        });
        setPostFlag(true);
      } catch (error) {
        console.error('Error posting data:', error);
        console.log(sendData());
        setPostFlag(false);
      }
    };
    PostData();
  };

  return (
    (!postFlag) ? (
      (!askAsGroupFlag) ? (
        <div className='container'>
          <div
            style={{
              margin: '10px 10px 0px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                marginBottom: '5px',
                height: '60px'
              }}
            >
              <Button
                label='戻る'
                onClick={() => {
                  setAskAsGroupFlag(true);
                }}
              />
            </div>
            <div
              style={{
                marginBottom: '5px',
                height: '60px'
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
              {fetchDataState.map((item: fetchedData_stock_amount, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name} {item.size}</td>
                    <td>
                      <PM_Button
                        context={item.amount}
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