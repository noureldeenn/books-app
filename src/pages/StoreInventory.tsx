import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, Tab, IconButton, Button } from "@mui/material";
import {
  fetchStoreBooks,
  fetchStoreAuthors,
  api,
  updateBook,
  updateAuthor,
} from "../api";
import { Delete, Edit } from "@mui/icons-material";
import SearchBar from "../components/SearchBar";
import AddInventoryDialog from "../components/AddInventoryDialog";

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  stores: string[];
  sold: boolean;
  pages: number;
}

interface Author {
  id: number;
  name: string;
}

const StoreInventoryPage = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const [tabIndex, setTabIndex] = useState(0);
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!storeId) return;

    const loadData = async () => {
      setLoading(true);
      try {
        if (tabIndex === 0) {
          const bookData = await fetchStoreBooks(Number(storeId));
          setBooks(bookData);
        } else {
          const authorData = await fetchStoreAuthors(Number(storeId));
          setAuthors(authorData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [storeId, tabIndex]);

  const handleUpdateBook = async (id: number, editName: string) => {
    try {
      await updateBook(id, editName);
      fetchStoreBooks(Number(storeId));
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleDeleteBook = async (id: number) => {
    try {
      await api.delete(`/authors/${id}`);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleUpdateAuthor = async (id: number, editName: string) => {
    try {
      await updateAuthor(id, editName);
      fetchStoreAuthors(Number(storeId));
    } catch (error) {
      console.error("Error updating author:", error);
    }
  };

  const handleDeleteAuthor = async (id: number) => {
    try {
      await api.delete(`/authors/${id}`);
      setAuthors(authors.filter((author) => author.id !== id));
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };

  // Filter authors based on search input
  const filteredAuthors = authors.filter((author) =>
    author.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter authors based on search input
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Store Inventory</h2>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setDialogOpen(true)}
        >
          Add New Book
        </Button>
      </div>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Tab Navigation */}
      <Tabs
        value={tabIndex}
        onChange={(_, newIndex) => setTabIndex(newIndex)}
        centered
      >
        <Tab label="Books" />
        <Tab label="Authors" />
      </Tabs>

      {/* Content */}
      <div className="mt-4">
        {tabIndex === 0 ? (
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
                      onClick={() => handleDeleteBook(book.id)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3">Author ID</th>
                <th className="p-3">Name</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAuthors.map((author) => (
                <tr key={author.id} className="border-t">
                  <td className="p-3">#{author.id}</td>
                  <td className="p-3">{author.name}</td>
                  <td className="p-3 text-center">
                    <IconButton
                      color="primary"
                      onClick={() => handleUpdateAuthor(author.id, author.name)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteAuthor(author.id)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <AddInventoryDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSuccess={() => {
          fetchStoreBooks(Number(storeId));
          fetchStoreAuthors(Number(storeId));
        }}
        storeId={storeId}
      />
    </div>
  );
};

export default StoreInventoryPage;
