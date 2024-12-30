import React, { useState, useEffect } from 'react';

import { DefaultListType, DB_DefaultListType } from './type/DefaultList';
import { defaultList, DB_defaultList } from './testData/defaultList';
import { StockListType } from './type/StockList';
import { stockList } from './testData/stockList';

import { Button } from './Button/Button';
import { PM_Button } from './PM_Button/PM_Button';

export default function SelectSupplies(): JSX.Element {
  const [defaultListData, setDefaultListData] = useState<DB_DefaultListType[]>([]);
  const [stockListData, setStockListData] = useState<StockListType[]>([]);
  useEffect(() => {
    /* 
      FETCH DEFAULT LIST DATA
    */
    setStockListData(stockList);
    setDefaultListData(DB_defaultList);
  }, []);

  return (
    <div className='container'>
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
          {stockList.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.name}</td>
                <td>
                  <PM_Button
                    context={
                      defaultListData
                        .find((defaultItem) => defaultItem.stockList_id === item.id)?.amount || 0
                    }
                    type={false}
                    unit={item.unit}
                    onClick_minus={() => { return; }}
                    onClick_plus={() => { return; }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}