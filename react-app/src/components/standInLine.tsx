import React from 'react';

export default function StandInLine(): JSX.Element {
    setTimeout(() => {
        window.location.href = '/reception';
    }, 5000);
    return (
        <div className="container">
            <h2 className="center">列にお並びください</h2>
        </div>
    );
}