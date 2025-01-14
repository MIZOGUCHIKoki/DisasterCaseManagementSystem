import React from 'react';

export default function StandInLine(): JSX.Element {
    setTimeout(() => {
        window.location.href = '/reception';
    }, 1000);
    return (
        <div className="container">
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100vh',
                    fontSize: '2em',
                    color: '#69639A',
                    fontWeight: '700',
                }}
            >
                完了しました
            </div>
        </div>
    );
}
