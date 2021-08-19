import React, { useState, useContext } from "react";
import { UserContext } from "./userContext";
import { getFavorites, addFavoriteMovie } from '../api/tmdb-api'

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const context = useContext(UserContext);


  const [myReviews, setMyReviews] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [playlist, setPlaylist] = useState([]);

  // const setAuthFavorites = () => { 
  //   var authFavorites = [];
  //   getFavorites({queryKey: ["favorites", { session_id: context.sessionId, account_id: context.user.id} ]}).then
  //   (res => {return res.results}).then(res => res.forEach(element => authFavorites.push(element.id))).then(setFavorites(authFavorites))
      
   
    
  // }


  const addToFavorites = (movie) => {
    
    setFavorites([...favorites, movie.id]);
  };

  const addToPlaylist = (movie) => {
    setPlaylist([...playlist, movie.id]);
    console.log(playlist);
  };
  // We will use this function in a later section
  const removeFromFavorites = (movie) => {
    setFavorites(favorites.filter((mId) => mId !== movie.id));
  };

  const removeFromPlaylist = (movie) => {
    setPlaylist(playlist.filter((mId) => mId !== movie.id));
  };

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
  };


// get user favorites and add to favorites array 
  // if (context.user){
  //   getFavorites(context.sessionId, context.user?.id).then((res) => res.results.forEach(result => {addToFavorites(result.id)}))
      
 

  // }

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        playlist,
        addToFavorites,
        addToPlaylist,
        removeFromFavorites,
        removeFromPlaylist,
        addReview,
        //setAuthFavorites
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
