import { useContext } from "react";
import { BookContext } from "../Context/BookProvider";
import ResultCard from "./ResultCard";


const ResultsGrid = () => {
  const { results = [], loading, error, searchQuery } = useContext(BookContext);

  if (loading) {
    return (
      <div className="mt-12 text-center">
        <div className="text-xl font-semibold text-gray-200 mb-4">Searching for books...</div>
        <div className="flex justify-center">
          <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-700 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

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

  if (results.length === 0 && searchQuery) {
    return (
      <div className="mt-16 text-center text-gray-300">
        No books found for "<span className="font-semibold">{searchQuery}</span>"
      </div>
    );
  }

  return (
    <div className="results-container px-4 sm:px-6 lg:px-8">
      {searchQuery && results.length > 0 && (
        <h2 className="text-3xl font-bold text-center mb-15  animate-pulse text-white">
          Results for "{searchQuery}"
        </h2>
      )}

      <div className="results-grid">
        {results.map((book, i) => (
          <div
            key={book.id || i}
            className="bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-blue-400 transition-shadow duration-300 transform hover:-translate-y-1"
          >
            <ResultCard book={book} />
          </div>
        ))}
      </div>

      {results.length > 0 && (
        <div className="results-bottom-note">
          Try different search terms to discover more books
        </div>
      )}
    </div>
  );
};

export default ResultsGrid;
