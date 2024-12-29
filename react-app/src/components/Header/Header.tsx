import React from 'react';

import './header.css';

export interface HeaderProps {
  /** TRUE: Staff, FALSE: Recipient */
  user: boolean;
}

export const Header = ({ user = true }: HeaderProps) => (
  <header>
    <div className="storybook-header">
      <h1>
        {user ? '物資支給スタッフ' : '物資受取者'}
      </h1>
      <div>
        {user ? (
          <>
            <h1>
              物資支給スタッフ
            </h1>
          </>
        ) : (
          <>
            <a href="/reception"
              style={{
                color: '#FF4d4d',
                textDecoration: 'none',
              }}
            >
              初めから
            </a>
          </>
        )}
      </div>
    </div>
  </header >
);
