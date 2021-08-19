import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@material-ui/core/IconButton";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import { addPlaylistMovie } from "../../api/tmdb-api";
import { UserContext } from "../../contexts/userContext";

const AddToPlaylistIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const userContext = useContext(UserContext);

  const handleAddToPlaylist = (e) => {
    e.preventDefault();
    if (userContext.authenticated ){  
      addPlaylistMovie(userContext.sessionId, userContext.user.id, movie.id);
      }
      else{
    context.addToPlaylist(movie);
      }
  };
  return (
    <IconButton aria-label="add to playlist" onClick={handleAddToPlaylist}>
      {!movie.playlist ? 
      <PlaylistAddIcon color="primary" fontSize="large" />:<> </>}
    </IconButton>
  );
};

export default AddToPlaylistIcon;