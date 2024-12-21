import jsQR from 'jsqr';
import React, { useRef, useState, useEffect } from 'react';

import { personInfo, groupMembers } from './testData/personInfo';
import { PersonType } from './type/Person';
import AskAsGroup from './askAsGroup';

type Props = {};

type Props_serve = {
    personInfo: PersonType,
    groupMembers: PersonType[]
};


const pInfo: Props_serve = {
    personInfo: personInfo,
    groupMembers: groupMembers
};


export const QrCodeScanner: React.FC<Props> = () => {
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
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height);
                if (code) {
                    setResult(code.data);
                    return;
                }
                setTimeout(scanQrCode, 100);
            }
        }
    };

    return (
        <div>
            {!result && (
                <div>
                    <video ref={videoRef} autoPlay playsInline muted />
                    <canvas ref={canvasRef} width="300" height="300" />
                </div>
            )}
            {result && <AskAsGroup {...pInfo} />}
            {error && <div>{error.message}</div>}
        </div>
    );
};

