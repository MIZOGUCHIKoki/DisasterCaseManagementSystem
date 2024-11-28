import React from 'react';
import { isError } from './helper/helper';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { PersonType } from './type/Person';
import { ServeLogType } from './type/ServeLog';
import { StockIOType } from './type/StockIO';
import { StockListType } from './type/StockList';


type stockIOTypeNew = Omit<StockIOType, ""> & {
    stockList: StockListType;
};
type serveLogTypeNew = Omit<ServeLogType, ""> & {
    stockIO: stockIOTypeNew[];
};
type PersonServeLog = {
    person: PersonType,
    serveLog: serveLogTypeNew[]
};

export const PersonServeLog = (): JSX.Element => {
    const { id } = useParams<{ id: string }>();
    const [personServeLog, setpersonServeLog] = useState<PersonServeLog>();
    const [error, setError] = useState<Error | undefined>(undefined);

    const fetchpersonServeLog = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:4000/person/${id}`);
            const data: PersonServeLog = await response.json();
            setpersonServeLog(data);
        } catch (e) {
            if (isError(e)) {
                setError(e);
            }
        }
    }, []);
    useEffect(() => {
        fetchpersonServeLog();
    }, [id]);
    if (error) {
        return <div>{error.message}</div>;
    } else if (!personServeLog) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            <h1>Infomation</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nick Name</th>
                        <th>Group ID</th>
                        <th>Age</th>
                        <th>Allergy</th>
                        <th>Remarks Food</th>
                        <th>Remarks Other</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{personServeLog.person.id}</td>
                        <td>{personServeLog.person.nickName}</td>
                        <td>{personServeLog.person.group_id}</td>
                        <td>{personServeLog.person.age}</td>
                        <td>{personServeLog.person.allergy}</td>
                        <td>{personServeLog.person.remarks_food}</td>
                        <td>{personServeLog.person.remarks_other}</td>
                    </tr>
                </tbody>
            </table>
            <h2>Serve Data</h2>
            {personServeLog.serveLog && personServeLog.serveLog.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>日時</th>
                            <th>食品名</th>
                            <th>数量</th>
                            <th>単位</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personServeLog.serveLog.map((serveLog) => (
                            <tr key={serveLog.id}>
                                <td>{serveLog.created_at}</td>
                                <td>
                                    {serveLog.stockIO.map((stockIO: stockIOTypeNew) => (
                                        <tr key={stockIO.id}>
                                            <td>{stockIO.stockList.name}</td>
                                            <td>{stockIO.stockList.size}</td>
                                            <td>[ {stockIO.stockList.unit} ]</td>
                                            <td>{stockIO.amount}</td>
                                        </tr>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>データがありません</div>
            )
            }
        </div >

    );
};