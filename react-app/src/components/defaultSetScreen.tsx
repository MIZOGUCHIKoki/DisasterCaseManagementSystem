import React, { useState, useEffect } from 'react';

import { StockListType } from './type/StockList';
import { DB_DefaultListType } from './type/DefaultList';

import { DB_defaultList } from './testData/defaultList';
import { stockList } from './testData/stockList';

import { PM_Button } from './PM_Button/PM_Button';
import { Button } from './Button/Button';

import { fetchedData_defualtList_type, fetchedData_stockList_type } from './selectSupplies';

type fetchData_StockListType = {
    id: StockListType['id'];
    name: StockListType['name'];
    size: StockListType['size'];
    unit: StockListType['unit'];
    amount: DB_DefaultListType['amount'];
};

type postData_DefaultListType = {
    stockList_id: DB_DefaultListType['stockList_id'];
    amount: DB_DefaultListType['amount'];
};

export default function DefaultSetScreen(): JSX.Element {
    const [stockListState, setStockListState] = useState<fetchData_StockListType[]>();
    useEffect(() => {
        const fetchDefaultData = (): fetchedData_defualtList_type[] => {
            /*
              Fetch default stock list from server
            */
            return DB_defaultList;
        };
        const fetchStockListData = (): fetchedData_stockList_type[] => {
            /*
              Fetch stock list from server
            */
            return stockList;
        };
        const fetchedDefaultList = fetchDefaultData();

        const updatedStockList: fetchData_StockListType[] = fetchStockListData().map((stockItem) => {
            const defaultItem = fetchedDefaultList.find((defaultList) => defaultList?.id === stockItem.id);
            if (defaultItem) {
                return {
                    ...stockItem,
                    amount: defaultItem.amount
                };
            } else {
                return {
                    ...stockItem,
                    amount: 0
                };
            }
        });
        setStockListState(updatedStockList);
    }, []);

    const onClick = (): void => {
        const DefultData = (): postData_DefaultListType[] => {
            const defaultData: postData_DefaultListType[] = [];
            stockListState?.map((stockItem) => {
                if (stockItem.amount > 0) {
                    defaultData.push(
                        {
                            stockList_id: stockItem.id,
                            amount: stockItem.amount

                        });
                }
            });
            return defaultData;
        };
        console.log('POST: デフォルト設定:', DefultData());
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
                    margin: '10px 10px 0px',
                }}>
                <div
                    style={{
                        marginBottom: '10px'
                    }}>
                    <Button
                        onClick={() => { onClick(); }}
                        primary={true}
                        label="決定"
                    />
                </div>
                <div
                    style={{
                        marginTop: '10px'
                    }}
                >
                    <Button
                        primary={false}
                        label='スタッフの画面へ'
                        onClick={() => { window.location.href = '/staff'; }}
                    />
                </div>
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
                                    <td>{item.name} {item.size}</td>
                                    <td style={{
                                        textAlign: 'center',
                                        height: '10dvh',
                                    }}>
                                        <PM_Button
                                            context={stockListState[index].amount}
                                            type={false}
                                            onClick_plus={() => onClickPM(true, index)}
                                            onClick_minus={() => onClickPM(false, index)}
                                            unit={item.unit}
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

            </div>
        </div >
    );
}