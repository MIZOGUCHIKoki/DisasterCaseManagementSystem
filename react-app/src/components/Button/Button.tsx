import React from 'react';

import './button.css';

export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large';
  /** Plus Minus button(true) or General button */
  type?: boolean;
  /** Plus(True) or Minus(False)*/
  pm?: boolean;
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  type,
  label,
  pm,
  ...props
}: ButtonProps) => {
  if (type === true && primary === true) {
    throw new Error('Cannot set both primary and type props to true');
  }
  if (type === true && pm === undefined) {
    throw new Error('Cannot set type prop to true without setting pm prop');
  }
  const getModeClass = () => {
    if (primary) return 'storybook-button--primary';
    if (primary === false && type === undefined) return 'storybook-button--secondary';
    if (type) return 'storybook-button--pm';
    return '';
  };

  // モードに応じた背景色を適用
  const appliedBackgroundColor =
    pm === true
      ? '#1ea7fd'
      : pm === false
        ? '#ff8c00'
        : backgroundColor;

  return (
    <button
      type="button"
      className={[
        'storybook-button',
        `storybook-button--${size}`,
        getModeClass(),
      ]
        .filter(Boolean) // 空文字列を除外
        .join(' ')}
      style={{ backgroundColor: appliedBackgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};