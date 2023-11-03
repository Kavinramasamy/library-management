import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Welcome from "./Welcome";
import NavBarPage from "./NavBarPage";
import BooksList from "./Library-Component/BooksList";
import Books from "./Library-Component/Books";
import UpdateBooks from "./Library-Component/UpdateBooks";
import AddBooks from "./Library-Component/AddBooks";
import BookOutList from "./Library-Component/BookOutList";
import AddOutBooks from "./Library-Component/AddOutBook";

export const booksContext = createContext(null);

function App() {
  const [books, setBooks] = useState([]);
  const [outBooks, setOutBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const responsebook = await fetch(
        "https://6478876c362560649a2df68b.mockapi.io/library",
        {
          method: "GET",
        }
      );
      const bookData = await responsebook.json();
      if (bookData) {
        setBooks(bookData);
      }
    };
    const getOutBooks = async () => {
      const responseoutbook = await fetch(
        "https://654516ac5a0b4b04436d9ba9.mockapi.io/library-mana/lib_manage",
        {
          method: "GET",
        }
      );
      const outBookData = await responseoutbook.json();
      if (outBookData) {
        setOutBooks(outBookData);
      }
    };
    getBooks();
    getOutBooks();
  }, []);

  return (
    <div className="App">
      <NavBarPage />
      <booksContext.Provider value={{ books, setBooks, outBooks, setOutBooks }}>
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route path="/" element={<Books />}>
            <Route exact path="booksList" element={<BooksList />} />
            <Route path="addbook" element={<AddBooks />} />
            {outBooks.length > 0 && (
              <Route path="editbook/:id" element={<UpdateBooks />} />
            )}
          </Route>
          <Route path="/outBooks" element={<BookOutList />} />
          <Route path="/addOutBooks" element={<AddOutBooks />} />
          <Route path="*" element={<Welcome />} />
        </Routes>
      </booksContext.Provider>
    </div>
  );
}

export default App;
