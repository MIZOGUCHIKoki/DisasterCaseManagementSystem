import React, { useState, useEffect } from 'react';

import { StockListType } from './type/StockList';

import { PM_Button } from './PM_Button/PM_Button';
import { Button } from './Button/Button';

import { fetchedData_stock_amount } from './selectSupplies';

type post_defaultList = {
    stock_list_id: StockListType['id'];
    amount: number;
}

export default function DefaultSetScreen(): JSX.Element {
    const [stockListState, setStockListState] = useState<fetchedData_stock_amount[]>();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchData =
                    await fetch(`${process.env.REACT_APP_API_ADDR}/defaultList?timestamp=${new Date().getTime()}`)
                        .then(res => {
                            if (!res.ok)
                                throw new Error(`Failed to fetch defaultList: ${res.status}`);
                            return res.json();
                        });

                setStockListState(fetchData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    const DefultData = (): post_defaultList[] => {
        const defaultData: post_defaultList[] = [];
        stockListState?.map((stockItem: fetchedData_stock_amount) => {
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

    const onClick = (): void => {

        const postData = async (): Promise<void> => {
            await fetch(`${process.env.REACT_APP_API_ADDR}/defaultList`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(DefultData()),
            });
        };
        postData()
            .then(() => {
                // console.log(DefultData());
                window.location.href = '/staff';
            })
            .catch((err) => { console.log(err); });
    };

    const onClickPM = (pm: boolean, index: number) => {
        setStockListState((prevState): fetchedData_stock_amount[] | undefined => {
            if (!prevState) return prevState;
            return prevState.map((stockItem: fetchedData_stock_amount, i) => {
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
                <div
                    style={{
                        marginTop: '10px'
                    }}
                >
                    <Button
                        primary={false}
                        label='すべて0に設定'
                        onClick={() => {
                            setStockListState((prevState): fetchedData_stock_amount[] | undefined => {
                                if (!prevState) return prevState;
                                return prevState.map((stockItem: fetchedData_stock_amount) => {
                                    return {
                                        ...stockItem,
                                        amount: 0,
                                    };
                                });
                            });
                        }}
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