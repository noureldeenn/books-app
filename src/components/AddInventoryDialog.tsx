import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { addInventory, fetchBooks } from "../api";

interface Book {
  id: number;
  name: string;
}

interface AddInventoryDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  storeId: string | undefined;
}

const AddInventoryDialog = ({
  open,
  onClose,
  onSuccess,
  storeId,
}: AddInventoryDialogProps) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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

    if (open) loadBooks();
  }, [open]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await addInventory(storeId, Number(selectedBook), Number(price));
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error adding inventory", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="bg-orange-700 text-white">
        Add Inventory
      </DialogTitle>
      <DialogContent className="bg-white mt-4 p-6 min-h-[25vh] flex flex-col justify-between items-center">
        <TextField
          select
          label="Book"
          variant="outlined"
          fullWidth
          className="my-2"
          value={selectedBook}
          onChange={(e) => setSelectedBook(e.target.value)}
        >
          {books.map((book) => (
            <MenuItem key={book.id} value={book.id}>
              {book.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          type="number"
          className="my-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </DialogContent>
      <DialogActions className="bg-white px-6 pb-4">
        <Button onClick={onClose} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddInventoryDialog;
