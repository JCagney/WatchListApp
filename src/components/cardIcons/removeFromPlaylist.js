import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { MoviesContext } from "../../contexts/moviesContext";
import { UserContext } from "../../contexts/userContext";
import { removePlaylistMovie } from "../../api/tmdb-api";

const RemoveFromPlaylistIcon = ({ movie, refetch }) => {
  const context = useContext(MoviesContext);
  const userContext = useContext(UserContext);

  const handleRemoveFromPlaylist = (e) => {
    e.preventDefault();
    if (userContext.authenticated ){  
      removePlaylistMovie(userContext.sessionId, userContext.user.id, movie.id).then(refetch);
      }
    else{
    context.removeFromPlaylist(movie);
    }
  };
  return (
    <IconButton
      aria-label="remove from favorites"
      onClick={handleRemoveFromPlaylist}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromPlaylistIcon;