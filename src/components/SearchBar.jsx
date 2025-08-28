import { useContext, useState, useEffect } from "react";
import { fetchBooks } from "../utils/api";
import { BookContext } from "../Context/BookContext";

const SearchBar = () => {
  // Get global state setters from BookContext
  const { setSearchQuery, setResults, setLoading, setError } = useContext(BookContext);

  // Local state to track what user types
  const [inputValue, setInputValue] = useState("");

  // Load default books when component first mounts
  useEffect(() => {
    const loadDefault = async () => {
      setLoading(true);             // show loader while fetching
      setError("");                 // clear previous errors
      try {
        const books = await fetchBooks("tolkien"); // default search query
        setResults(books);          // store results in context
        setSearchQuery("");         // clear global search term
      } catch {
        setError("Failed to load default books."); // handle fetch error
      } finally {
        setLoading(false);          // stop loader
      }
    };
    loadDefault();
  }, []); // empty dependency → runs only once on mount

  // Search books whenever inputValue changes (with 500ms debounce)
  useEffect(() => {
    if (!inputValue.trim()) {
      // If input is empty, reload default books
      setError("");
      setSearchQuery("");
      const loadDefault = async () => {
        setLoading(true);
        try {
          const books = await fetchBooks("tolkien");
          setResults(books);
        } catch {
          setError("Failed to load default books.");
        } finally {
          setLoading(false);
        }
      };
      loadDefault();
      return;
    }

    // Delay search to avoid calling API on every keystroke
    const timeoutId = setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const books = await fetchBooks(inputValue);
        if (books.length === 0) {
          setError(`No books found for "${inputValue}"`);
          setResults([]);
        } else {
          setResults(books);
        }
        setSearchQuery(inputValue); // update current search term
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 500);

    // Cleanup timeout on next keystroke
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  return (
    <div className="max-w-2xl mx-auto mt-24 px-4">
      {/* Page heading */}
      <h1 className="text-4xl sm:text-5xl font-bold text-center text-gray-800 mb-10">
        Book Finder
      </h1>

      {/* Search input container */}
      <div className="relative mb-12">
        {/* Search icon on the left */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Search input */}
        <input
          type="search"
          value={inputValue}                   
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Search Book here..."    
          className="block w-full pl-12 pr-4 py-4 text-lg text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 transition"
        />
      </div>
    </div>
  );
};

export default SearchBar;
