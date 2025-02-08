import { useState, useEffect } from "react";
import { fetchBooks } from "../api";
import { CircularProgress, Button } from "@mui/material";
import SearchBar from "../components/SearchBar";

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  stores: string[];
  sold: boolean;
}

const ShopPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const getBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data.map((book: Book) => ({ ...book, sold: false })));
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    getBooks();
  }, []);

  const handleSell = (id: number) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, sold: true } : book
      )
    );
  };

  // Filter books based on search input
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <CircularProgress />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Shop</h2>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className={`p-4 border rounded-lg shadow-md ${book.sold ? "opacity-50" : ""}`}
          >
            <img src={book.cover} alt={book.title} className="w-full h-48 object-cover rounded-md mb-3" />
            <h3 className="text-lg font-bold">{book.title}</h3>
            <p className="text-gray-600">Author: {book.author}</p>
            <p className="text-gray-500">Available in: {book.stores.join(", ")}</p>
            <Button
              variant="contained"
              color="secondary"
              className="mt-2"
              onClick={() => handleSell(book.id)}
              disabled={book.sold}
            >
              {book.sold ? "Sold" : "Sell"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
