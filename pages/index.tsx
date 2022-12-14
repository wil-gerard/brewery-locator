import Head from "next/head";
import {
  Button,
  TextField,
  FormControl,
  List,
  ListItem,
  IconButton,
  Container,
  Box,
} from "@mui/material";
import { useState } from "react";
import DetailsModal from "../components/DetailsModal";
import SearchIcon from "@mui/icons-material/Search";

export interface BreweryData {
  id: string;
  name: string;
  brewery_type: string;
  street: string;
  state: string;
  city: string;
  postal_code: string;
  latitude: string;
  longitude: string;
  website_url: string;
}

export default function Home() {
  const [input, setInput] = useState("");
  const [selectedBrewery, setSelectedBrewery] = useState<BreweryData | null>(
    null
  );
  const [breweries, setBreweries] = useState([]);
  const handleOpen = (brewery: BreweryData) => () => {
    setSelectedBrewery((selectedCampaign) =>
      selectedBrewery ? null : brewery
    );
  };

  const handleClose = () => {
    setSelectedBrewery(null);
  };

  const callAPI = async () => {
    try {
      const res = await fetch(
        `https://api.openbrewerydb.org/breweries/search?query=${input}`
      );
      const data = await res.json();
      setBreweries(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          callAPI();
        }}
      >
        <Box display="flex" alignItems="center">
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            onChange={(e) => setInput(e.target.value)}
          />
          <IconButton size="large" type="submit">
            <SearchIcon />
          </IconButton>
        </Box>
      </form>
      <div>
        {breweries.map((brewery: BreweryData) => (
          <List key={brewery.id}>
            <ListItem>
              <div>{brewery.name}</div>
              <div>
                {brewery.street} <br /> {brewery.city}, {brewery.state}{" "}
                {brewery.postal_code}
              </div>
              <div>{brewery.brewery_type}</div>
              <Button variant="outlined" onClick={handleOpen(brewery)}>
                View Details
              </Button>
              <DetailsModal
                open={selectedBrewery?.id === brewery.id}
                brewery={brewery}
                onClose={handleClose}
              />
            </ListItem>
          </List>
        ))}
      </div>
    </div>
  );
}
