import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import "antd/dist/antd.css";
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  );
}

export default App;
