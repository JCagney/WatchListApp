import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { removeFavoriteMovie } from "../../api/tmdb-api";
import { MoviesContext } from "../../contexts/moviesContext";
import { UserContext } from "../../contexts/userContext";

const RemoveFromFavoritesIcon = ({ movie, refetch }) => {
  const context = useContext(MoviesContext);
  const userContext = useContext(UserContext);

  const handleRemoveFromFavorites = (e) => {
    e.preventDefault();
    if (userContext.authenticated ){  
      removeFavoriteMovie(userContext.sessionId, userContext.user.id, movie.id).then(refetch);
      }
    context.removeFromFavorites(movie);
  };
  return (
    <IconButton
      aria-label="remove from favorites"
      onClick={handleRemoveFromFavorites}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavoritesIcon;