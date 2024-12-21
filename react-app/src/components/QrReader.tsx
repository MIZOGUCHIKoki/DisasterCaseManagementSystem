import jsQR from 'jsqr';
import React, { useRef, useState, useEffect } from 'react';

type Props = {};

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
                height: { ideal: 300 }
            },
        }
        // デバイスのカメラにアクセスする
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                    scanQrCode();
                }
            })
            .catch((err) => {
                console.error('Error accessing media devices:', err);

            });
        const currentVideoRef: HTMLVideoElement | null = videoRef.current;

        // コンポーネントがアンマウントされたら，カメラのストリームを停止する．
        return () => {
            if (currentVideoRef && currentVideoRef.srcObject) {
                const stream: MediaStream = currentVideoRef.srcObject as MediaStream;
                const tracks: MediaStreamTrack[] = stream.getTracks();
                tracks.forEach((track) => track.stop());
            }
        }
    }, [])

    const scanQrCode = () => {
        const canvas: HTMLCanvasElement | null = canvasRef.current;
        const video: HTMLVideoElement | null = videoRef.current;
        if (canvas && video) {
            const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
            if (ctx) {
                // カメラの映像をcanvasに描画
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const imageData: ImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height);
                if (code) {
                    if (code.data === '0113122124194192412171200599RBJMIZOGUCHI/KOUKI') {
                        setError(new Error('QRコードが一致しました'));
                        return;
                    }
                    setResult(code.data);
                    return;
                }
                setTimeout(scanQrCode, 100);
            }
        }
    }
    return (
        <div>
            {!result && (
                <div>
                    <video ref={videoRef} autoPlay playsInline />
                    <canvas ref={canvasRef} width='300' height='300' />
                </div>
            )}
            {result && <div>{result}</div>}
            {error && <div>{error.message}</div>}
        </div>
    )
}