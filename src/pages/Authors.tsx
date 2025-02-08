import { useState, useEffect } from "react";
import { fetchAuthors, api, updateAuthor } from "../api";
import { CircularProgress, IconButton, Button } from "@mui/material";
import { Delete, Edit} from "@mui/icons-material";
import SearchBar from "../components/SearchBar";
import AddAuthorDialog from "../components/AddAuthorDialog";

interface Author {
  id: number;
  name: string;
}

const AuthorsPage = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const loadAuthors = async () => {
    setLoading(true);
    try {
      const data = await fetchAuthors();
      setAuthors(data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAuthors();
  }, []);

  const handleUpdateAuthor = async (id: number, editName: string) => {
    try {
      await updateAuthor(id, editName);
      loadAuthors();
    } catch (error) {
      console.error("Error updating author:", error);
    }
  };

  const handleDelete = async (id: number) => {
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

  if (loading) return <CircularProgress />;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Authors List</h2>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setDialogOpen(true)}
        >
          Add New Author
        </Button>
      </div>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="bg-white rounded-lg shadow-lg p-4">
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
                    onClick={() => handleDelete(author.id)}
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
      <AddAuthorDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSuccess={loadAuthors}
      />
    </div>
  );
};

export default AuthorsPage;
