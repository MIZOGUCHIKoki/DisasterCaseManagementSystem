import React from 'react';
import './App.css';
import { PersonList } from './components/personList';
import { StockList } from './components/stockList';
import { PersonServeLog } from './components/person_serveLog';
import QrCodeScanner from './components/QrReader';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WaitingQueue from './components/waitingQueue';


function App(): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        <h1>災害時物資支給支援サービス</h1>
      </header>
      <BrowserRouter>
        <Routes>
          <Route path='/person' element={<PersonList />} />
          <Route path='/stockList' element={<StockList />} />
          <Route path='/person/:id' element={<PersonServeLog />} />
          <Route path='/reception' element={<QrCodeScanner />} />
          <Route path='/staff' element={<WaitingQueue />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
