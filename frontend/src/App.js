import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
//import './App.css';

function App() {
  const[books,setBooks] = useState([])

  useEffect (() => {
    setBooks([{"name":"Otostopçunun Galaksi Rehberi", "author": "Douglas Adams", "description": "Lorem ipsum"},{
      "name":"Hikayeler", 
      "author":    "Edgar Allan Poe", 
      "description": "Lorem ipsum sit door amet"
    }])
  },[])
  return (
    <div className="App">
      <header className="App-header">
        <h1>DjangoReact</h1>
      </header>
      <div className="book-list">
          {books.map((book,index) => {
            return (
            <div className="book-item">
                <h2>{book.name}</h2>
                <p>{book.author}</p>
                <p>{book.description}</p>
              </div>
            )}
          )}
      </div>
    </div>
  );
}

export default App;
