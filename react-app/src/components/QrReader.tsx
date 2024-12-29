import React, { useState } from 'react';


import { PersonType } from './type/Person';
import AskAsGroup from './askAsGroup';

import { personInfo, groupMembers } from './testData/personInfo';

export type FetchedData_PersonAndGroup = {
    person: PersonType;
    groupMembers: PersonType[];
};
import QR_Reader from './QR_Reader/QR_Reader';

export default function QrCodeScanner(): JSX.Element {
    const [fetchedData, setFetchedData] = useState<FetchedData_PersonAndGroup | null>(null);

    const handleQrResult = (result: string | null) => {
        if (!result) return;
        console.log('QR code result:', result);
        /* 
            FETCH DATA from API using the result
        */
        const fetchedData: FetchedData_PersonAndGroup = {
            person: personInfo[0],
            groupMembers: groupMembers
        };
        console.log('fetchedData:', fetchedData);
        setFetchedData(fetchedData);
    };
    return (
        <div>
            {fetchedData ?
                (< AskAsGroup {...fetchedData} />) :
                (< QR_Reader onQRCodeDetected={handleQrResult} />)
            }
        </div>
    );
}