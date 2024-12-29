import React from 'react';

import './button.css';

export type ButtonProps = {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large';
  pm?: boolean;
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
};

/** Primary UI component for user interaction */
export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  pm = false,
  ...props
}: ButtonProps) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  const pmClass = pm ? 'storybook-button--pm' : '';

  return (
    <button
      type="button"
      className={[
        'storybook-button',
        `storybook-button--${size}`,
        mode,
        pmClass // pmClass をクラス名のリストに正しく追加
      ]
        .filter(Boolean) // 空文字列を除外
        .join(' ')}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};