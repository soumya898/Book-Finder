import { createContext, useState, useEffect } from "react";
import { fetchBooks } from "../utils/api";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load random/default books on first render
  useEffect(() => {
    const loadDefaultBooks = async () => {
      setLoading(true);
      setError("");
      try {
        // default query (can be random each refresh if you want)
        const books = await fetchBooks("tolkien");
        setResults(books);
      } catch (err) {
        setError(err.message,"Failed to load default books.");
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
