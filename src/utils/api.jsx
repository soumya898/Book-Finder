// src/utils/api.js
export const fetchBooks = async (searchQuery) => {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(searchQuery)}`
  );

  if (!res.ok) throw new Error("Failed to fetch");

  const data = await res.json();

  if (!data.items || data.items.length === 0) return [];

 return data.items.map((item) => ({
  id: item.id,
  title: item.volumeInfo.title || "No Title",
  author: item.volumeInfo.authors?.[0] || "Unknown",
  year: item.volumeInfo.publishedDate || "N/A",
  cover:
    item.volumeInfo.imageLinks?.thumbnail ||
    "https://via.placeholder.com/150x200?text=No+Cover",
  description: item.volumeInfo.description
    ? item.volumeInfo.description.slice(0, 100) + "..."
    : "No description available.",
  previewLink: item.volumeInfo.previewLink || null,
}));

};

export default fetchBooks
