import React, { useContext } from "react";
import Movie from "../movieCard/";
import Grid from "@material-ui/core/Grid";
import { UserContext } from "../../contexts/userContext";
import { MoviesContext } from "../../contexts/moviesContext";

const MovieList = ({movies, action, cardHeader }) => {

  

  const userContext = useContext(UserContext);
  const moviesContext = useContext(MoviesContext);
  
  let movieCards = movies.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
       <Movie key={m.id} movie={m} action={action} cardHeader={cardHeader}/> 
    </Grid>
  ));
  return movieCards;
};

export default MovieList;