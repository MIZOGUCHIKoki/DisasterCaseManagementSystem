import jsQR from 'jsqr';
import React, { useRef, useState, useEffect } from 'react';

import './qr_reader.css';

interface QR_ReaderProps {
    onQRCodeDetected: (result: string | null) => void;
}

export default function QR_Reader(props: QR_ReaderProps): JSX.Element {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<Error | undefined>(undefined);

    useEffect(() => {
        // 画面のX％を計算
        const xPercent = 80; // 例: 50％
        const videoWidthHeight = () => {
            if (window.innerWidth >= window.innerHeight) {
                return (window.innerHeight * xPercent) / 100;

            } else {
                return (window.innerWidth * xPercent) / 100;
            }
        };

        // constraintsの設定
        const constraints = {
            video: {
                facingMode: 'user',
                width: { ideal: videoWidthHeight() },
                height: { ideal: videoWidthHeight() },
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
                if (navigator.mediaDevices === undefined) {
                    console.error('navigator.mediaDevices is not supported');
                    setError(new Error('navigator.mediaDevices is not supported'));
                } else {
                    console.error('Error accessing media devices:', err);
                    setError(new Error('カメラにアクセスできませんでした'));
                }
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
                    props.onQRCodeDetected(code.data);
                    return;
                }
                setTimeout(scanQrCode, 100);
            }
        }
    };
    return (
        <div className='qr-reader-container container'>
            {!result && (
                <div
                    style={{
                        textAlign: 'center',
                    }}
                >
                    <video ref={videoRef} autoPlay playsInline muted />
                    <canvas ref={canvasRef} />
                    <div style={{ textAlign: 'center' }} >
                        QRコードを読み取ってください
                    </div>
                </div>
            )
            }
            {error && <div style={{ textAlign: 'center' }}>{error.message}</div>}
        </div >
    );
}