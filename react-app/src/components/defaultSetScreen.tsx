import React, { useState, useEffect } from 'react';

import { defaultList } from './testData/defaultList';
import { DefaultListType } from './type/DefaultList';
import { StockListType } from './type/StockList';
import { stockList } from './testData/stockList';
import { DB_DefaultListType } from './type/DefaultList';

export default function DefaultSetScreen(): JSX.Element {
    const [stockListState, setStockListState] = useState<{ stockList: StockListType; amount: number }[]>();
    useEffect(() => {
        const fetchDefaultData = (): DefaultListType[] => {
            /*
              Fetch default stock list from server
            */
            console.log('FETCH DEFAULT STOCKLIST DATA');
            return defaultList;
        };
        const fetchStockListData = (): StockListType[] => {
            /*
              Fetch stock list from server
            */
            console.log('FETCH STOCKLIST DATA');
            return stockList;
        };
        const fetchedStockList = fetchStockListData().map((stockList) => {
            return { stockList: stockList, amount: 0 };
        });
        const fetchedDefaultList = fetchDefaultData();

        const updatedStockList = fetchedStockList.map((stockItem) => {
            const defaultItem = fetchedDefaultList.find((defaultList) => defaultList?.id === stockItem.stockList.id);
            if (defaultItem) {
                stockItem.amount = defaultItem.amount;
            }
            return stockItem;
        });
        setStockListState(updatedStockList);
    }, []);

    const onClick = (): void => {
        const DefultData = (): DB_DefaultListType[] => {
            const defaultData: DB_DefaultListType[] = [];
            stockListState?.map((stockItem) => {
                defaultData.push(
                    {
                        id: 0,
                        stock_id: stockItem.stockList.id,
                        amount: stockItem.amount

                    });
            });
            return defaultData;
        };
        console.log('デフォルト値を設定');
        console.log(DefultData());
        window.location.href = '/staff';
    };

    const onClickPM = (pm: boolean, index: number) => {
        setStockListState((prevState) => {
            if (!prevState) return prevState;
            return prevState.map((stockItem, i) => {
                if (i === index) {
                    return {
                        ...stockItem,
                        amount: pm ? stockItem.amount + 1 : stockItem.amount - 1,
                    };
                } else {
                    return stockItem;
                }
            });
        });
        console.log('RESULT', pm ? '＋' : 'ー');
    };

    return (
        <div className='container-block'>
            <h2>デフォルト値設定画面</h2>
            <button style={{ margin: '10px' }} onClick={onClick}>デフォルト値を設定</button>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>物資名</th>
                            <th style={{ width: '30%' }}>サイズ</th>
                            <th></th>
                            <th style={{ textAlign: 'center' }}>Amount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {stockListState?.map((item, index: number) => {
                            return (
                                <tr key={index}>
                                    <td>{item.stockList.name}</td>
                                    <td>{item.stockList.size}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button onClick={() => onClickPM(false, index)}>ー</button>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        {item.amount} {item.stockList.unit}
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button onClick={() => onClickPM(true, index)}>＋</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            </div>
        </div >
    );
}