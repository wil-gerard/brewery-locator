import Head from "next/head";
import {
  Button,
  List,
  ListItem,
  Box,
  Container,
  Typography,
  Paper,
  InputBase,
  Link,
  Divider,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import DetailsModal from "../components/DetailsModal";
import SearchIcon from "@mui/icons-material/Search";
import { LoadingButton } from "@mui/lab";
import { AcUnit } from "@mui/icons-material";

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
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      const byCityResponse = await fetch(
        `https://api.openbrewerydb.org/breweries?by_city=${input}&per_page=50`
      );
      const metadataResponse = await fetch(
        `https://api.openbrewerydb.org/breweries/meta?by_city=${input}`
      );
      const byCityData = await byCityResponse.json();
      const metadata = await metadataResponse.json();
      setBreweries(byCityData);
      console.log(byCityData);
      console.log(metadata)
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Head>
        <title>Brewery Locator</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          pt={4}
          pb={3}
        >
          <Typography variant="h4" component="h1" fontWeight={600} pb={2}>
            Brewery Locator
          </Typography>
          <Typography variant="body1">
            Made with <AcUnit /> in Minneapolis by{" "}
            <Link
              href={"https://github.com/wil-gerard"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Wil Gerard
            </Link>
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" flexDirection="column">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 300,
            }}
            onSubmit={(e) => {
              e.preventDefault();
              callAPI();
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search breweries by keyword"
              inputProps={{ "aria-label": "Search for breweries by keyword" }}
              onChange={(e) => setInput(e.target.value)}
            />
            <LoadingButton aria-label="search" type="submit" loading={loading}>
              <SearchIcon />
            </LoadingButton>
          </Paper>
        </Box>
        <Paper
          sx={{
            overflowY: "scroll",
            overflowX: "hidden",
            height: "65vh",
            marginTop: "2vh",
          }}
        >
          <List>
            {breweries.map((brewery: BreweryData) => (
              <>
                <ListItem key={brewery.id}>
                  <ListItemText
                    primary={brewery.name}
                    secondary={
                      <>
                        <Typography>
                          <Typography
                            sx={{ display: "inline" }}
                            fontWeight="500"
                          >
                            Address:
                          </Typography>{" "}
                          {brewery.street} {brewery.city}, {brewery.state},{" "}
                          {brewery.postal_code}
                        </Typography>
                        <Typography>
                          <Typography
                            sx={{ display: "inline" }}
                            fontWeight="500"
                          >
                            Type:{" "}
                          </Typography>
                          {brewery.brewery_type}
                        </Typography>
                        <Typography>
                          <Typography
                            sx={{ display: "inline" }}
                            fontWeight="500"
                          >
                            Website:{" "}
                          </Typography>
                          <Link
                            href={brewery.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {brewery.website_url}
                          </Link>
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
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  );
}
