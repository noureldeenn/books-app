import { useState, useEffect } from "react";
import { api, fetchStores, updateStore } from "../api";
import { Button, CircularProgress, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { Delete, Edit } from "@mui/icons-material";
import AddStoreDialog from "../components/AddStoreDialog";

interface Store {
  id: number;
  name: string;
  location: string;
}

const StoresPage = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const loadStores = async () => {
    setLoading(true);
    try {
      const data = await fetchStores();
      setStores(data);
    } catch (error) {
      console.error("Error fetching stores:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStores();
  }, []);

  const handleUpdateStore = async (id: number, editName: string) => {
    try {
      await updateStore(id, editName);
      loadStores();
    } catch (error) {
      console.error("Error updating store:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/stores/${id}`);
      setStores(stores.filter((store) => store.id !== id));
    } catch (error) {
      console.error("Error deleting store:", error);
    }
  };

  // Filter authors based on search input
  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <CircularProgress />;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Stores List</h2>
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
              <th className="p-3">Store ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Address</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStores.map((store) => (
              <tr key={store.id} className="border-t">
                <td className="p-3">#{store.id}</td>
                <td
                  className="p-3"
                  onClick={() => navigate(`/store/${store.id}`)}
                >
                  {store.name}
                </td>
                <td className="p-3">{store.location}</td>
                <td className="p-3 text-center">
                  <IconButton
                    color="primary"
                    onClick={() => handleUpdateStore(store.id, store.name)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(store.id)}
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
      <AddStoreDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSuccess={loadStores}
      />
    </div>
  );
};

export default StoresPage;
