import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { ZIndex } from "src/utils/zIndex";

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
}) => {
  return (
    <Dialog
      sx={{
        zIndex: ZIndex.DIALOG,
      }}
      open={open}
      onClose={onClose}
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
    >
      <DialogTitle id="delete-modal-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-modal-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="info" variant="outlined">
          Odrzuć
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Usuń
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
