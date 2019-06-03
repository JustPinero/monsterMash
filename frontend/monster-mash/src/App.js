import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './Components/LoginPage';
import Routes from './Routes'

const App = function(){
  return (
    <div className="App">
      <header className="App-header">
        <Routes/>
      </header>
    </div>
  );
}

export default App;
