import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';

import QrCodeScanner from './components/QrReader';
import WaitingQueue from './components/waitingQueue';
import ServeScreen from './components/serve';
import DefaultSetScreen from './components/defaultSetScreen';

import { Header } from './components/Header/Header';

function App(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/reception' element={
            <div>
              <Header user={false} />
              <QrCodeScanner />
            </div>
          } />
          <Route path='/staff' element={<WaitingQueue />} />
          <Route path='/person/:person_id' element={<ServeScreen />} />
          <Route path='/default' element={<DefaultSetScreen />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
