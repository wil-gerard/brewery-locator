import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { BreweryData } from "../pages";

export interface SimpleDialogProps {
  open: boolean;
  brewery: BreweryData;
  onClose: () => void;
}

function DetailsModal(props: SimpleDialogProps) {
  const { onClose, open, brewery } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{brewery.name}</DialogTitle>
    </Dialog>
  );
}

export default DetailsModal;
