import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';

import QrCodeScanner from './components/QrReader';
import WaitingQueue from './components/waitingQueue';
import ServeScreen from './components/serve';

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
          <Route path='/person/:id' element={<ServeScreen />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
