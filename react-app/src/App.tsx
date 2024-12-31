import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';

import QrCodeScanner from './components/QrReader';
import WaitingQueue from './components/waitingQueue';
import DefaultSetScreen from './components/defaultSetScreen';

import { Header } from './components/Header/Header';

function App(): JSX.Element {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/reception' element={
            <div>
              <Header user={false} />
              <QrCodeScanner />
            </div>
          } />
          <Route path='/staff' element={
            <div>
              <Header user={true} description={'スタッフ画面'} description_left={'更新'} />
              <WaitingQueue />
            </div>
          } />
          <Route path='/default' element={
            <div>
              <Header user={true} description={'1人当たりの数設定'} description_left={'前回の値'} />
              <DefaultSetScreen />
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
