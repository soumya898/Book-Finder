import { useContext } from "react";
import SearchBar from "../components/SearchBar";
import ResultsGrid from "../components/ResultsGrid";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { BookContext } from "../Context/BookContext";

const Home = () => {
  const { loading, error, results } = useContext(BookContext);

  return (
    <div className="p-4">
      <h1 className="text-center text-3xl font-bold mb-4">📚 Book Finder</h1>
      <SearchBar />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && results.length > 0 && <ResultsGrid />}
    </div>
  );
};

export default Home;
