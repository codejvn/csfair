import React, { useState } from 'react';
import './App.css';

function BookForm({ addBook }) {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook(id, title, author);
    setId('');
    setTitle('');
    setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a Book</h2>
      <div>
        <label htmlFor="id">ID:</label>
        <input
          type="text"
          id="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
}

function BookList({ books, borrowBook, returnBook }) {
  if (books.length === 0) {
    return <p>No books found.</p>;
  }

  return (
    <div>
      <h2 style={bookList}>Book List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Available</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.available ? 'Yes' : 'No'}</td>
              <td>
                {book.available ? (
                  <button onClick={() => borrowBook(book.id)}>Borrow</button>
                ) : (
                  <button onClick={() => returnBook(book.id)}>Return</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  const [books, setBooks] = useState([]);

  const addBook = (id, title, author) => {
    const newBook = {
      id,
      title,
      author,
      available: true,
    };
    setBooks([...books, newBook]);
  };

  const borrowBook = (id) => {
    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, available: false };
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  const returnBook = (id) => {
    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, available: true };
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  return (
    <div>
      <BookForm addBook={addBook} />
      <BookList books={books} borrowBook={borrowBook} returnBook={returnBook}/>
    </div>
  );
}
const bookList = {
  textAlign: 'center,'
}
export default App;