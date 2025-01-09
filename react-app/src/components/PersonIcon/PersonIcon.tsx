import React from 'react';

interface PersonIconProps {
    id: string;
}

export const PersonIcon = ({ id }: PersonIconProps): JSX.Element => {
    const numbers: number[] = id.split(',').map((num) => {
        return parseInt(num);
    });
    if (numbers.length !== 3 ||
        !numbers.every((num) => num >= 1 && num <= 10)
    ) {
        return <div>Invalid ID</div>;
    }

    const genFileName = (num: number): string => {
        return `L${num}.bmp`;
    };


    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            {numbers.map((num, index) => {
                return (
                    <img
                        key={`${id}-${index}`}
                        src={`${process.env.PUBLIC_URL}/asset/${genFileName(num)}`}
                        style={{
                            width: 'auto',
                            height: 'auto',
                        }}
                    />
                );
            })}
        </div>
    );
};