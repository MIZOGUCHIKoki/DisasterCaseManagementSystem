import React from 'react';

import './header.css';

export interface HeaderProps {
  /** TRUE: Staff, FALSE: Recipient */
  user: boolean;
}

export const Header = ({ user = true }: HeaderProps) => (
  <header>
    <div className="storybook-header">
      <div>
        {user ? (
          <>
            <h1>
              物資支給スタッフ
            </h1>
          </>
        ) : (
          <>
            <h1>
              受取
            </h1>
          </>
        )}
      </div>
    </div>
  </header>
);
