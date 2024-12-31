import React from 'react';
import { IoReload } from 'react-icons/io5';
import './header.css';

export interface HeaderProps {
  /** TRUE: Staff, FALSE: Recipient */
  user: boolean;
  description?: string;
  description_left?: string;
}

export const Header = ({
  user = true,
  description = undefined,
  description_left = undefined,
}: HeaderProps) => (
  <header>
    <div className="storybook-header">
      <h1>
        {description === undefined ? (user ? 'スタッフ画面' : '受付画面') : description}
      </h1>
      <div>
        {user ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
            onClick={() => { window.location.reload(); }}
          >
            <IoReload
              color='#FF4d4d'
            />
            <span style={{
              color: '#FF4d4d',
              marginLeft: '10px',
            }}
            >
              {description_left ? description_left : ''}
            </span>
          </div>
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
