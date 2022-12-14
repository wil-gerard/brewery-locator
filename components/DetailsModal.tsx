import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  DialogContent,
  DialogContentText,
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
      <DialogContent>
        <DialogContentText>
          <div>
            <div>
              {brewery.street} <br /> {brewery.city}, {brewery.state}{" "}
              {brewery.postal_code}
            </div>
            <div>
                {brewery.brewery_type}
            </div>
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

export default DetailsModal;
