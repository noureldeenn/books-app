import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
} from "@mui/material";
import { addBook, fetchAuthors } from "../api";

interface Author {
  id: number;
  name: string;
}

interface AddBookDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddBookDialog = ({ open, onClose, onSuccess }: AddBookDialogProps) => {
  const [bookName, setBookName] = useState("");
  const [pages, setPages] = useState("");
  const [authors, setAuthors] = useState<Author[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
    if (open) loadAuthors();
  }, [open]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await addBook(bookName, Number(pages), Number(selectedAuthor));
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error adding book", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="bg-orange-700 text-white">New Book</DialogTitle>
      <DialogContent className="bg-white mt-4 p-6 min-h-[35vh] flex flex-col justify-between items-center">
        <TextField
          label="Book Name"
          variant="outlined"
          fullWidth
          className="my-2"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        />
        <TextField
          label="Number of Pages"
          variant="outlined"
          fullWidth
          type="number"
          className="my-2"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
        />
        <TextField
          select
          label="Author"
          variant="outlined"
          fullWidth
          className="my-2"
          value={selectedAuthor}
          onChange={(e) => setSelectedAuthor(e.target.value)}
        >
          {authors.map((author) => (
            <MenuItem key={author.id} value={author.id}>
              {author.name}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions className="bg-gray-900">
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

export default AddBookDialog;
