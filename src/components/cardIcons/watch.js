import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import LiveTvIcon from '@material-ui/icons/LiveTv';
import Drawer from "@material-ui/core/Drawer";
import WatchProviders from "../watchProviders";


const WatchMovie = ({ movie }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

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