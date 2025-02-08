import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { addAuthor } from "../api";

interface AddAuthorDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddAuthorDialog = ({ open, onClose, onSuccess }: AddAuthorDialogProps) => {
  const [authorName, setAuthorName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (authorName.trim()) {
      setLoading(true);
      try {
        await addAuthor(authorName);
        onSuccess(); // Refresh authors list
        setAuthorName("");
        onClose();
      } catch (error) {
        console.error("Error adding author:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="bg-orange-700 text-white ">New Author</DialogTitle>
      <DialogContent className="bg-white mt-4 p-6 min-h-[12vh] flex flex-col justify-between items-center">
        <TextField
          label="Author Name"
          fullWidth
          variant="outlined"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          disabled={loading}
          className="mb-4"
        />
      </DialogContent>
      <DialogActions className="bg-white px-6 pb-4">
        <Button onClick={onClose} variant="outlined" color="error" disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading}>
          {loading ? "Adding..." : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAuthorDialog;
