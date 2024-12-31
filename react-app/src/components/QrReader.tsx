import React, { useState } from 'react';



import AskAsGroup from './askAsGroup';

import QR_Reader from './QR_Reader/QR_Reader';

export default function QrCodeScanner(): JSX.Element {
    const [result, setResult] = useState<string>('');

    const handleQrResult = (result: string | null) => {
        if (!result) return;
        console.log('QR code result:', result);
        setResult(result);
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