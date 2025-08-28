import { Link } from "react-router-dom";

const ResultCard = ({ book }) => {
  if (!book) return null;

  return (
    <Link
      to={`/book/${book.id}`}
      className="group relative mt-5 bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 hover:scale-[1.02] p-4 flex flex-col items-center text-center min-h-[380px] overflow-hidden"
    >
      {/* Book cover */}
      <img
        src={book.cover}
        alt={book.title}
        className="w-32 h-32 sm:w-36 sm:h-52 object-cover rounded-lg mb-4 shadow-md transition-transform duration-300 group-hover:scale-102"
      />

      {/* Title */}
      <h3 className="font-semibold text-lg sm:text-xl text-white mb-1 line-clamp-2">
        {book.title}
      </h3>

      {/* Author */}
      <span className="text-sm text-gray-200 bg-gray-800 px-2 py-1 rounded-full mb-1 truncate">
        {book.author}
      </span>

      {/* Year */}
      <span className="text-xs text-gray-400 bg-gray-800/30 px-2 py-1 rounded-full mb-2">
        {book.year}
      </span>

      {/* Description */}
      {book.description && (
        <p className="text-xs text-gray-300 line-clamp-4 bg-gray-800/20 p-2 rounded-md w-full mb-3">
          {book.description}
        </p>
      )}

      {/* Hover indicator / button */}
      <div className="mt-4 opacity-0 group-hover:opacity-100 text-xs text-blue-400">
        Click to explore →
      </div>
    </Link>
  );
};

export default ResultCard;
