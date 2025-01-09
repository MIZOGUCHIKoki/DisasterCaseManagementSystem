import React, { useState } from 'react';



import AskAsGroup from './askAsGroup';

import QR_Reader from './QR_Reader/QR_Reader';

export default function QrCodeScanner(): JSX.Element {
    const [result, setResult] = useState<string>('');

    const handleQrResult = (result: string | null) => {
        if (!result) return;
        console.log('QR code result:', result);
        fetch(`${process.env.REACT_APP_API_ADDR}/qr_read/${result}`, {
            method: 'POST'
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch person: ${response.status}`);
            }
            return response.json();
        }).then(data => {
            setResult(result);
            console.log(data);
        })
            .catch(error => console.error('Error:', error));
    };
    return (
        (result) ?
            (<AskAsGroup
                person_id={result}
            />) :
            (
                < QR_Reader onQRCodeDetected={handleQrResult} />
            )
    );
}