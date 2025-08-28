import { useContext } from "react";
import { BookContext } from "../Context/BookProvider";
import ResultCard from "./ResultCard";

const ResultsGrid = () => {
  // Get state values from BookContext
  const { results = [], loading, error, searchQuery } = useContext(BookContext);

  // Show loading spinner while fetching books
  if (loading) {
    return (
      <div className="mt-12 text-center">
        <div className="text-xl font-semibold text-gray-200 mb-4">
          Searching for books...
        </div>
        <div className="flex justify-center">
          <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-700 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  // Show error message if fetch fails
  if (error) {
    return (
      <div className="mt-12 text-center">
        <div className="inline-block bg-red-700/20 text-red-300 p-8 rounded-2xl border border-red-400/30">
          <h3 className="text-2xl font-bold mb-2">Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Show message if no results are found for the search query
  if (results.length === 0 && searchQuery) {
    return (
      <div className="mt-16 text-center text-gray-300">
        No books found for "<span className="font-semibold">{searchQuery}</span>"
      </div>
    );
  }

  // Main results grid
  return (
    <div className="results-container px-4 sm:px-6 lg:px-8">
      {/* Show search query title if results are found */}
      {searchQuery && results.length > 0 && (
        <h2 className="text-3xl font-bold text-center mb-15 animate-pulse text-white">
          Results for "{searchQuery}"
        </h2>
      )}

      {/* Grid displaying all result cards */}
      <div className="results-grid">
        {results.map((book, i) => (
          <div
            key={book.id || i} // Use book ID if available, fallback to index
            className="bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-blue-400 transition-shadow duration-300 transform hover:-translate-y-1"
          >
            <ResultCard book={book} />
          </div>
        ))}
      </div>

      {/* Note at the bottom suggesting alternative searches */}
      {results.length > 0 && (
        <div className="results-bottom-note">
          Try different search terms to discover more books
        </div>
      )}
    </div>
  );
};

export default ResultsGrid;
