import React, { useState, useEffect } from 'react';

import { defaultList } from './testData/defaultList';
import { DefaultListType } from './type/DefaultList';
import { StockListType } from './type/StockList';
import { stockList } from './testData/stockList';
import { DB_DefaultListType } from './type/DefaultList';

import { PM_Button } from './PM_Button/PM_Button';
import { Button } from './Button/Button';

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
                if (stockItem.amount > 0) {
                    defaultData.push(
                        {
                            id: 0,
                            stock_id: stockItem.stockList.id,
                            amount: stockItem.amount

                        });
                }
            });
            return defaultData;
        };
        console.log(DefultData());
        window.location.href = '/staff';
    };

    const onClickPM = (pm: boolean, index: number) => {
        setStockListState((prevState) => {
            if (!prevState) return prevState;
            return prevState.map((stockItem, i) => {
                if (i === index) {
                    if (!pm && stockItem.amount <= 0) return stockItem;
                    return {
                        ...stockItem,
                        amount: pm ? stockItem.amount + 1 : stockItem.amount - 1,
                    };
                } else {
                    return stockItem;
                }
            });
        });
    };

    return (
        <div className='container'>
            <div
                style={{
                    margin: '10px',
                }}
            >
                <Button
                    primary={true}
                    label='戻る'
                    onClick={() => { window.location.href = '/staff'; }}
                />
            </div>
            <div style={{ margin: '5px' }}>
                <table
                    style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        borderSpacing: 0
                    }}
                >
                    <thead>
                        <tr
                            style={{
                                backgroundColor: '#4a6eda',
                                color: 'white',
                                padding: '10px',
                                textAlign: 'center',
                            }}
                        >
                            <th style={{ width: '70%' }}>物資名</th>
                            <th style={{ textAlign: 'center' }}>数量</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stockListState?.map((item, index: number) => {
                            return (
                                <tr key={index}>
                                    <td>{item.stockList.name} {item.stockList.size}</td>
                                    <td style={{
                                        textAlign: 'center',
                                        height: '10dvh',
                                    }}>
                                        <PM_Button
                                            context={stockListState[index].amount}
                                            type={false}
                                            onClick_plus={() => onClickPM(true, index)}
                                            onClick_minus={() => onClickPM(false, index)}
                                            unit={item.stockList.unit}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div style={{
                display: 'flex',
                margin: '20px 10px',
                justifyContent: 'flex-end',
            }}>
                <div
                    style={{
                        width: '30%',
                    }}>
                    <Button
                        onClick={() => { onClick(); }}
                        primary={true}
                        label="決定"
                    />
                </div>
            </div>
        </div >
    );
}