import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const[books,setBooks] = useState([])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {books.map((book,index) => {
            return <li>{book.name}</li>
          })}
        </p>
      </header>
    </div>
  );
}

export default App;
