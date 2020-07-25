import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



//import './App.css';
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function SendBook(props){
  const [book, setBook] = useState(
      { name : "", author: "", description: ""}
  );
  const handleChange = (event) => {
      setBook({...book, [event.target.name]: event.target.value})
  }
  const handleSubmit = (e) => {
  
    axios.defaults.xsrfCookieName ='csrftoken';
    axios.defaults.xsrfHeaderName ='X-CSRFToken';
    e.preventDefault()
      axios.post('http://127.0.0.1:8000/create-book', book, {headers: {"X-CSRFToken" : getCookie('csrftoken')}})
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error)
        }) 
  }
  return(
    <div className="book-create">
      <h1> DjangoReact - Create Book</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={book.name} onChange={handleChange} />
        <input type="text" name="author" value={book.author} onChange={handleChange} />
       <textarea name="description" value={book.description} onChange={handleChange} ></textarea>
      <button> Save </button>
      </form>
    </div>
  )
}


function Book(props){
  const {book} = props
  return(
    <div className="book-item">
      <Link to ={"/book/"+book.id}><h2>{book.name}</h2></Link>
      <p>{book.author}</p>
      <p>{book.description}</p>
    </div>
  )
}

function App() {
  const[books,setBooks] = useState([])
  const[hasError, setErrors] = useState(false)

  useEffect (() => {
    async function fetchBooks() {
      const res = await fetch("http://127.0.0.1:8000/books/");
      res
        .json()
        .then(res => setBooks(res.response))
        .catch(err => setErrors(err));
    }

    fetchBooks();
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <h1>DjangoReact - Books List</h1>
      </header>
      <div className="book-list">
          {books.map((item,index) => {
            return (
              <Book book={item} key={index}/>
            )}
          )}
          {hasError}
      </div>
    </div>
  );
}

function SingularBook(params) {
  const{ id } = useParams()
  const[book,setBook] = useState([])
  const[error, setError] = useState(false)

  useEffect (() => {
    async function fetchBooks() {
      const res = await fetch("http://127.0.0.1:8000/books/"+id);
      res
        .json()
        .then(res => setBook(res))
        .catch(err => setError(err));
    }

    fetchBooks();
  },[])

  return (
    <div className="App">
      <header className="App-header">
      </header>
    
          { error || book.status==="error" ? 
           <p>Something went wrong</p>
           :
           <div className="book-list">
              <h1>{book.name}</h1>
              <h3>{book.author}</h3>
              <p>{book.description}</p>
           </div>          
          }
    </div>
  );
}

export default function Landing(){
  return(
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Book list</Link>
            </li>
            <li>
              <Link to="/create-book">Create Book </Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/book/:id">
            <SingularBook />
          </Route>
          <Route path="/create-book">
            <SendBook />
          </Route>
          <Route path="/">
            <App />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

