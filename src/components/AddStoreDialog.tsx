import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { addStore } from "../api";

interface AddStoreDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddStoreDialog = ({ open, onClose, onSuccess }: AddStoreDialogProps) => {
  const [storeName, setStoreName] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (storeName.trim()) {
      setLoading(true);
      try {
        await addStore(storeName, storeAddress);
        onSuccess(); // Refresh authors list
        setStoreName("");
        onClose();
      } catch (error) {
        console.error("Error adding store:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="bg-orange-700 text-white">New Store</DialogTitle>
      <DialogContent className="bg-white mt-4 p-6 min-h-[25vh] flex flex-col justify-between items-center">
        <TextField
          label="Store Name"
          fullWidth
          variant="outlined"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          disabled={loading}
          className="mb-4"
        />
        <TextField
          label="Store Address"
          fullWidth
          variant="outlined"
          value={storeName}
          onChange={(e) => setStoreAddress(e.target.value)}
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

export default AddStoreDialog;
