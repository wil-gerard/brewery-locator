import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Link,
  Box,
  Typography,
} from "@mui/material";
import { BreweryData } from "../pages";
import GoogleMapReact from "google-map-react";
import LocationPin from "./LocationPin";

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

  const defaultProps = {
    center: {
      lat: 59.955413,
      lng: 30.337844,
    },
    zoom: 11,
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{brewery.name}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography>
            <Typography sx={{ display: "inline" }} fontWeight="500">
              Address:
            </Typography>{" "}
            {brewery.street} {brewery.city}, {brewery.state},{" "}
            {brewery.postal_code}
          </Typography>
          <Typography>
            <Typography sx={{ display: "inline" }} fontWeight="500">
              Website:{" "}
            </Typography>
            {brewery.website_url ? (
              <Link
                href={brewery.website_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {brewery?.website_url}
              </Link>
            ) : (
              "No website available"
            )}
          </Typography>
        </DialogContentText>
        <Box height="50vh" mt={2}>
          <GoogleMapReact
            defaultCenter={{
              lat: Number(brewery.latitude),
              lng: Number(brewery.longitude),
            }}
            defaultZoom={defaultProps.zoom}
          >
            <LocationPin
              lat={brewery.latitude}
              lng={brewery.longitude}
              text={brewery.name}
            />
          </GoogleMapReact>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default DetailsModal;
