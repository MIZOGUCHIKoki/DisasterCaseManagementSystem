import React from 'react';

interface PersonIconProps {
    id: string;
}

export const PersonIcon = ({ id }: PersonIconProps): JSX.Element => {
    const numbers: number[] = id.split(',').map((num) => {
        return parseInt(num);
    });
    if (numbers.length !== 2 ||
        !numbers.every((num) => num >= 1 && num <= 20)
    ) {
        return <div>Invalid ID</div>;
    }

    const genFileName = (num: number): string => {
        if (num > 10) {
            if (num % 10 === 0) {
                return 'R10.bmp';
            }
            return `R${num % 10}.bmp`;
        }
        return `L${num}.bmp`;
    };


    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'space-around',
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