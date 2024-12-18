import React from 'react';
import './App.css';
import { PersonList } from './components/personList';
import { StockList } from './components/stockList';
import { PersonServeLog } from './components/person_serveLog';
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/person' element={<PersonList />} />
          <Route path='/stockList' element={<StockList />} />
          <Route path='/person/:id' element={<PersonServeLog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
