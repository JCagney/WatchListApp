import React, { useContext, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import LiveTvIcon from '@material-ui/icons/LiveTv';
import { getWatchProviders } from "../../api/tmdb-api";
import { MoviesContext } from "../../contexts/moviesContext";
import Drawer from "@material-ui/core/Drawer";
import WatchProviders from "../watchProviders";


const WatchMovie = ({ movie }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const context = useContext(MoviesContext);

  const showProviders = (e) => {
 
    getWatchProviders(movie.id); 


  };
  return (
      <>
    <IconButton
      aria-label="show providers"
      onClick={() => setDrawerOpen(true)}
    >
      <LiveTvIcon color="primary" fontSize="large" />
    </IconButton>

    <Drawer
      anchor="top"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
    >
      <WatchProviders movie={movie} />
    </Drawer>
</>
  );
};

export default WatchMovie;