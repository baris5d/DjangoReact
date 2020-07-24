import React, {useEffect, useState} from 'react';
import axios from 'axios'




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
      <h2>{book.name}</h2>
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
        <h1>DjangoReact</h1>
      </header>
      <SendBook />
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

export default App;
