import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';

import QrCodeScanner from './components/QrReader';
import WaitingQueue from './components/waitingQueue';


function App(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/reception' element={
            <div>
              <header className='header-reception'>
                <h1>受付</h1>
              </header>
              <QrCodeScanner />
            </div>
          } />
          <Route path='/staff' element={<WaitingQueue />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
