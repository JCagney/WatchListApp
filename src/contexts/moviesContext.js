import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [myReviews, setMyReviews] = useState( {} ) 
  const [favorites, setFavorites] = useState( [] )
  const [playlist, setPlaylist] = useState( [] )

  const addToFavorites = (movie) => {
    setFavorites([...favorites,movie.id])
  };

  const addToPlaylist = (movie) => {
    setPlaylist([...playlist,movie.id]);
    console.log(playlist);
  };
  // We will use this function in a later section
  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };

  const removeFromPlaylist = (movie) => {
    setPlaylist( playlist.filter(
      (mId) => mId !== movie.id
    ) )
  };

  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        playlist,
        addToFavorites,
        addToPlaylist,
        removeFromFavorites, 
        removeFromPlaylist,
        addReview
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;