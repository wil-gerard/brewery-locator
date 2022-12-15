import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { BreweryData } from "../pages";
import GoogleMapReact from "google-map-react";

export interface SimpleDialogProps {
  open: boolean;
  brewery: BreweryData;
  onClose: () => void;
}

const MapMarker = ({ text, lat, lng }: {text: string; lat: string; lng: string}) => <div>{text}</div>;

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
              {brewery.street} <br /> {brewery.city}, {brewery.state}{" "}
              {brewery.postal_code}
        </DialogContentText>
        <DialogContentText>
        {brewery.brewery_type}
        </DialogContentText>
        <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact
            defaultCenter={{lat: Number(brewery.latitude), lng: Number(brewery.longitude)}}
            defaultZoom={defaultProps.zoom}
            yesIWantToUseGoogleMapApiInternals
          >
            <MapMarker
              lat={brewery.latitude}
              lng={brewery.longitude}
              text={brewery.name}
            />
          </GoogleMapReact>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DetailsModal;
