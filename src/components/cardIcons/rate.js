import React, { useState, useContext } from "react";
import StarRateIcon from '@material-ui/icons/StarRate';
import Rating from '@material-ui/lab/Rating';
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar"; 
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { rateMovie } from "../../api/tmdb-api";
import { UserContext } from "../../contexts/userContext";

const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    form: {
      width: "100%",
      "& > * ": {
        marginTop: theme.spacing(2),
      },
    },
    textField: {
      width: "40ch",
    },
    submit: {
      marginRight: theme.spacing(2),
    },
    snack: {
      width: "50%",
      "& > * ": {
        width: "100%",
      },
    },
  }));  

const RateIcon = ({ movie }) => {
  const classes = useStyles();
  
  const userContext = useContext(UserContext);

  const [displayed, setDisplayed] = useState(false);  
  const [open, setOpen] = useState(false); 
  const [rating, setRating] = useState(0); 

  const handleClick = () => {
      setDisplayed(true); 
      
  }

  const rate = (value) => {
    setRating(value * 2);
    setDisplayed(false); 
    setOpen(true)
    const response = rateMovie(movie.id, value * 2, userContext.sessionId)
    console.log(response); 

    

}


const handleSnackClose = (event) => {     
    setOpen(false);
  };
        
  return (
      <>
    <Snackbar
        className={classes.snack}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleSnackClose}
      >
        <MuiAlert
          severity="success"
          variant="filled"
          onClose={handleSnackClose}
        >
          <Typography variant="h4">
            Rating {rating}/10 submitted to TMDB for {movie.title}! 
          </Typography>
        </MuiAlert>
      </Snackbar>


    <IconButton aria-label="rate" onClick={handleClick}>
      <StarRateIcon  color="primary" fontSize="large" ></StarRateIcon>
    </IconButton>  

    {displayed ?  <><br /><Rating name="half-rating" value={null} precision={0.5} onChange={(event, value) => {rate(value); }}/><br /></> : <></>}
    </>

  );
};

export default RateIcon;