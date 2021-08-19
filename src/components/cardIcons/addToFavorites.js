import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { addFavoriteMovie } from "../../api/tmdb-api";
import { UserContext } from "../../contexts/userContext";


const AddToFavoritesIcon = ({ movie }) => {
  const moviesContext = useContext(MoviesContext);
  const userContext = useContext(UserContext);

  const handleAddToFavorites = (e) => {
    e.preventDefault();
    if (userContext.authenticated ){  
    addFavoriteMovie(userContext.sessionId, userContext.user.id, movie.id);
    console.log(moviesContext.favorites)
    }
    else{
      moviesContext.addToFavorites(movie);

    }   
    console.log(movie.id);
   
  };
  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
      {!movie.favorite ? 
      <FavoriteIcon color="primary" fontSize="large" /> : <></>}
    </IconButton>
  );
};

export default AddToFavoritesIcon;