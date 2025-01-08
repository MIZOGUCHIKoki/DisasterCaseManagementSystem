import React, { useState, useEffect } from 'react';

import { StockListType } from './type/StockList';
import { DB_DefaultListType } from './type/DefaultList';

import { PM_Button } from './PM_Button/PM_Button';
import { Button } from './Button/Button';

import { fetchedData_defualtList_type, fetchedData_stockList_type } from './selectSupplies';

type fetchData_StockListType = {
    id: StockListType['id'];
    name: StockListType['name'];
    size: StockListType['size'];
    unit: StockListType['unit'];
    janureID: StockListType['janureID'];
    amount: DB_DefaultListType['amount'];
};


export default function DefaultSetScreen(): JSX.Element {
    const [stockListState, setStockListState] = useState<fetchData_StockListType[]>();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedDefaultList =
                    await fetch(`${process.env.REACT_APP_API_ADDR}/defaultList/?timestamp=${new Date().getTime()}`)
                        .then(res => {
                            if (!res.ok)
                                throw new Error(`Failed to fetch defaultList: ${res.status}`);
                            return res.json();
                        });

                const fetchedStockList =
                    await fetch(`${process.env.REACT_APP_API_ADDR}/stockList?timestamp=${new Date().getTime()}`)
                        .then(res => {
                            if (!res.ok)
                                throw new Error(`Failed to fetch stockList: ${res.status}`);
                            return res.json();
                        });

                const updatedStockList: fetchData_StockListType[] =
                    fetchedStockList.map((stockItem: fetchedData_stockList_type) => {
                        const defaultItem =
                            fetchedDefaultList.find(
                                (defaultList: fetchedData_defualtList_type) => defaultList?.stock_list_id === stockItem.id
                            );
                        return {
                            ...stockItem,
                            amount: defaultItem ? defaultItem.amount : 0,
                        };
                    });
                setStockListState(updatedStockList);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const onClick = (): void => {
        const DefultData = (): fetchedData_defualtList_type[] => {
            const defaultData: fetchedData_defualtList_type[] = [];
            stockListState?.map((stockItem) => {
                if (stockItem.amount > 0) {
                    defaultData.push(
                        {
                            stock_list_id: stockItem.id,
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