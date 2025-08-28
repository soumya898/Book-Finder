import SearchBar from "./components/SearchBar";
import ResultsGrid from "./components/ResultsGrid";

function App() {
  return (
    <div className="min-h-screen bg-[#1E2939] text-white flex flex-col items-center px-4">
      
      {/* Header */}
      <header className="mt-16 mb-8 text-center">
        <h1 className="text-5xl font-bold">Book Finder</h1>
        <p className="mt-2 text-gray-300 text-lg">
          Discover your next favorite read
        </p>
      </header>

      {/* Search Bar */}
      <div className="w-full max-w-2xl mb-12">
        <SearchBar />
      </div>

      {/* Results Grid */}
      <div className="w-full max-w-6xl mb-12">
        <ResultsGrid />
      </div>

      {/* Footer */}
      <footer className="mb-8 text-center text-gray-400 text-sm">
        Made with ❤️ for book lovers
      </footer>
    </div>
  );
}

export default App;
