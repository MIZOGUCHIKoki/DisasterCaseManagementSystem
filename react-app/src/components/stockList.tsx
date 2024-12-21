import React from 'react';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { isError } from './helper/helper';
import { StockListType } from './type/StockList';

export const StockList = (): JSX.Element => {
    const janureID = 0;
    const [stocks, setStocks] = useState<StockListType[]>([]);
    const [error, setError] = useState<Error | undefined>(undefined);

    const fetchStockList = useCallback(async (janureID: number | '') => {
        try {
            const response = await axios.get<StockListType[]>('http://localhost:4000/stocklist/' + janureID);
            setStocks(response.data);
        } catch (e) {
            if (isError(e)) {
                setError(e);
            }
        }
    }, []);

    useEffect(() => {
        fetchStockList(janureID);
    }, [janureID]);
    if (error) {
        return <div>{error.message}</div>;
    }
    return (
        <div>
            {stocks.map((stock) => (
                <li key={stock.id}>{stock.name} {stock.size} 単位：{stock.unit}</li>
            ))}
        </div>
    );
};
