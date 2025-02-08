import { useState, useEffect } from "react";
import { api, fetchBooks, updateBook } from "../api";
import { Button, CircularProgress, IconButton } from "@mui/material";
import SearchBar from "../components/SearchBar";
import { Delete, Edit } from "@mui/icons-material";
import AddBookDialog from "../components/AddBookDialog";

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  stores: string[];
  sold: boolean;
  pages: number;
}

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const data = await fetchBooks();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleUpdateBook = async (id: number, editName: string) => {
    try {
      await updateBook(id, editName);
      loadBooks();
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/authors/${id}`);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  // Filter authors based on search input
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <CircularProgress />;
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Books List</h2>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setDialogOpen(true)}
        >
          Add New Book
        </Button>
      </div>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="bg-white rounded-lg shadow-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Book ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Pages</th>
              <th className="p-3">Author Name</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.id} className="border-t">
                <td className="p-3">#{book.id}</td>
                <td className="p-3">{book.title}</td>
                <td className="p-3">#{book.pages}</td>
                <td className="p-3">{book.author}</td>
                <td className="p-3 text-center">
                  <IconButton
                    color="primary"
                    onClick={() => handleUpdateBook(book.id, book.title)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(book.id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddBookDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSuccess={loadBooks}
      />
    </div>
  );
};

export default BooksPage;
