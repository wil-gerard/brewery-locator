import {
  ListItem,
  ListItemText,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import Link from "next/link";
import DetailsModal from "./DetailsModal";
import { BreweryData } from "../pages";
import { useState } from "react";

type Props = {
  brewery: BreweryData;
};

function BreweryListItem({ brewery }: Props) {
  const [selectedBrewery, setSelectedBrewery] = useState<BreweryData | null>(
    null
  );

  const handleOpen = (brewery: BreweryData) => () => {
    setSelectedBrewery(() => (selectedBrewery ? null : brewery));
  };

  const handleClose = () => {
    setSelectedBrewery(null);
  };

  return (
    <>
      <ListItem>
        <ListItemText
          primary={brewery?.name}
          secondary={
            <>
              <Typography>
                <Typography sx={{ display: "inline" }} fontWeight="500">
                  Address:
                </Typography>{" "}
                {brewery?.street} {brewery?.city}, {brewery?.state},{" "}
                {brewery?.postal_code}
              </Typography>
              <Typography>
                <Typography sx={{ display: "inline" }} fontWeight="500">
                  Type:{" "}
                </Typography>
                {brewery?.brewery_type}
              </Typography>
              <Typography>
                <Typography sx={{ display: "inline" }} fontWeight="500">
                  Website:{" "}
                </Typography>
                {brewery.website_url ? (
                  <Link
                    href={brewery?.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {brewery?.website_url}
                  </Link>
                ) : (
                  "No website available"
                )}
              </Typography>
            </>
          }
        ></ListItemText>
        <Button variant="outlined" onClick={handleOpen(brewery)}>
          View Details
        </Button>
        <DetailsModal
          open={selectedBrewery?.id === brewery.id}
          brewery={brewery}
          onClose={handleClose}
        />
      </ListItem>
      <Divider />
    </>
  );
}
export default BreweryListItem;
