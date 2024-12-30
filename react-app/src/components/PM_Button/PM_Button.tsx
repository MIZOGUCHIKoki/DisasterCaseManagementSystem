import React from 'react';

import { Button } from '../Button/Button';

import './pm_button.css';
import '../Button/button.css';

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
  onClick_decide?: () => void;
  /** Unit inserted after Context */
  unit?: string;
  /** Label of decision */
  label_decision?: string;
}

/** Primary UI component for user interaction */
export const PM_Button = ({
  context = 0,
  type = false,
  unit = '',
  label_decision = '決定',
  onClick_plus = () => { return; },
  onClick_minus = () => { return; },
  onClick_decide = () => { return; },
}: ButtonProps) => {

  return (
    <div
      style={{
        textAlign: 'center',
        width: '100%',
        display: 'block',
        height: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: '100%'
        }}
      >
        <Button onClick={onClick_minus} pm={false} type={true} label='ー' />
        <span style={
          {
          }
        }>
          {context}{unit}
        </span>
        <Button onClick={onClick_plus} pm={true} type={true} label='＋' />
      </div>
      {type ?
        <div style={{
          width: '100%',
          height: '100%',
          marginTop: '10px',
        }}>
          <Button onClick={onClick_decide} primary={false} label={label_decision} />
        </div> : null
      }
    </div>
  );
};