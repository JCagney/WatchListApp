import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles({
    avatar: {
      backgroundColor: "rgb(255, 0, 0)",
    },
  });

const FavoriteHeader = ({movie}) => {
  //const context = useContext(MoviesContext);
  const classes = useStyles();


  return (
    <CardHeader
    className={classes.header}
    avatar={
      movie.favorite ? (
        <Avatar className={classes.avatar}>
          <FavoriteIcon />
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

export default FavoriteHeader;