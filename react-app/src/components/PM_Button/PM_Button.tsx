import React from 'react';

import { Button } from '../Button/Button';

import './pm_button.css';

export interface ButtonProps {
  /** Context */
  context: string | number;
  /** Type include 決定 : True */
  type: boolean;
  /** Plus[+] click handler */
  onClick_plus: () => void;
  /** Plus[-] click handler */
  onClick_minus: () => void;
  /** Decide click handler */
  onClick_decide: () => void;
}

/** Primary UI component for user interaction */
export const PM_Button = ({
  context = 0,
  type = false,
  onClick_plus = () => { return; },
  onClick_minus = () => { return; },
  onClick_decide = () => { return; },
}: ButtonProps) => {

  return (
    <div>
      <div>
        <Button onClick={onClick_minus} pm={false} type={true} label='ー' />
        <span style={
          {
            width: '50px',
            textAlign: 'center',
            display: 'inline-block',
            fontSize: '20px',
          }
        }>
          {context}
        </span>
        <Button onClick={onClick_plus} pm={true} type={true} label='＋' />
      </div>
      {type ?
        <div style={{ marginTop: '2px' }}>
          <Button onClick={onClick_decide} primary={false} label='決定' />
        </div> : null
      }
    </div>
  );
};