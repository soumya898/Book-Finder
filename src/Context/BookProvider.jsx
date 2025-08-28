import { createContext, useState, useEffect } from "react";
import { fetchBooks } from "../utils/api";

export const BookContext = createContext();

const BookProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDefaultBooks = async () => {
      setLoading(true);
      setError("");
      try {
        const books = await fetchBooks("tolkien"); // default search
        setResults(books);
      } catch (err) {
        setError("Failed to load default books."); // err.message can be added if needed
      } finally {
        setLoading(false);
      }
    };

    loadDefaultBooks();
  }, []);

  return (
    <BookContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        results,
        setResults,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export default BookProvider;
