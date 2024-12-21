import jsQR from 'jsqr';
import React, { useRef, useState, useEffect } from 'react';

import { personInfo, groupMembers } from './testData/personInfo';
import { PersonType } from './type/Person';
import AskAsGroup from './askAsGroup';

type Props_serve = {
    personInfo: PersonType,
    groupMembers: PersonType[],
};


const pInfo: Props_serve = {
    personInfo: personInfo[0],
    groupMembers: groupMembers,
};

export default function QrCodeScanner(): JSX.Element {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<Error | undefined>(undefined);

    useEffect(() => {
        const constraints = {
            video: {
                facingMode: 'environment',
                width: { ideal: 300 },
                height: { ideal: 300 },
            },
        };

        const startStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;

                    // 再生準備が整ったら play() を呼び出す
                    videoRef.current.onloadedmetadata = () => {
                        videoRef.current?.play();
                        scanQrCode();
                    };
                }
            } catch (err) {
                console.error('Error accessing media devices:', err);
                setError(new Error('カメラにアクセスできませんでした'));
            }
        };

        startStream();

        return () => {
            // クリーンアップ：カメラストリームの停止
            if (videoRef.current && videoRef.current.srcObject) {
                const stream: MediaStream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    const scanQrCode = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (canvas && video) {
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height);
                if (code) {
                    setResult(code.data);
                    fetchData();
                    return;
                }
                setTimeout(scanQrCode, 100);
            }
        }
    };
    const fetchData = () => {
        console.log('Success to read QR code');
        return;
    };
    return (
        <div className='container'>
            {!result && (
                <div className='qr-reader'>
                    <video ref={videoRef} autoPlay playsInline muted />
                    <canvas ref={canvasRef} />
                    <div className='center'>QRコードを読み取ってください</div>
                </div>
            )
            }
            {result && <AskAsGroup {...pInfo} />}
            {error && <div>{error.message}</div>}
        </div >
    );
}