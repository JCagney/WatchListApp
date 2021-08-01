import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles({
    avatar: {
      backgroundColor: "rgb(255, 0, 0)",
    },
  });

const PlaylistHeader = ({movie}) => {
  const classes = useStyles();


  return (
    <CardHeader
    className={classes.header}
    avatar={
      movie.playlist ? (
        <Avatar className={classes.avatar}>
          <PlaylistAddCheckIcon />
        </Avatar>
      ) : null
    }
    title={
      <Typography variant="h5" component="p">
        {movie.title}{" "}
      </Typography>
    }
  />
      
  );
};

export default PlaylistHeader;