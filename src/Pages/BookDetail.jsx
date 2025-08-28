import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookDetail = () => {
  const { id } = useParams(); // Get book ID from URL
  const [book, setBook] = useState(null); // Store book data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error message

  // Fetch book details when component mounts
  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
        if (!res.ok) throw new Error("Failed to fetch book details");
        const data = await res.json();
        setBook(data); // Save book data
      } catch (err) {
        setError(err.message || "Error loading book details"); // Handle error
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchBookDetail();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-700 text-lg">Loading book details...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  if (!book) return null; // No data, return nothing

  const info = book.volumeInfo; // Extract book info

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-6">
        {/* Left: Book cover */}
        <img
          src={info.imageLinks?.thumbnail || "https://via.placeholder.com/200x300?text=No+Cover"}
          alt={info.title}
          className="w-full md:w-64 h-auto object-cover rounded-lg shadow"
        />

        {/* Right: Book details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{info.title}</h1>
            {info.subtitle && <h2 className="text-gray-600 mt-1">{info.subtitle}</h2>}
            {info.authors && (
              <p className="text-gray-700 mt-2">
                <span className="font-semibold">Author(s): </span>
                {info.authors.join(", ")}
              </p>
            )}
            {info.publishedDate && (
              <p className="text-gray-700 mt-1">
                <span className="font-semibold">Published: </span>
                {info.publishedDate}
              </p>
            )}
            {info.pageCount && (
              <p className="text-gray-700 mt-1">
                <span className="font-semibold">Pages: </span>
                {info.pageCount}
              </p>
            )}
            {info.categories && (
              <p className="text-gray-700 mt-1">
                <span className="font-semibold">Category: </span>
                {info.categories[0]}
              </p>
            )}

            {info.description && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-700">{info.description}</p>
              </div>
            )}
          </div>

          {/* Links */}
          <div className="mt-6 flex flex-wrap gap-4">
            {info.previewLink && (
              <a
                href={info.previewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold"
              >
                Preview Book
              </a>
            )}
            {info.infoLink && (
              <a
                href={info.infoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition font-semibold"
              >
                More Info
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
