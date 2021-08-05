import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQuery } from "react-query";
import { getFavorites } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";
import FavoriteHeader from "../components/cardHeaders/favoriteHeader";
import { UserContext } from "../contexts/userContext";


const AuthFavoriteMoviesPage = () => {
  const context = useContext(UserContext);
  
  const {  data, error, isLoading, isError }  = useQuery( ["favorites", { session_id: context.sessionId, account_id: context.user.id} ], getFavorites);
     
  
  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }
  const movies = data.results;
  
  

  return (
    <PageTemplate
      title={
        context.user
          ? `${context.user.username}'s Favourite Movies`
          : "Favourite Movies"
      }
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromFavorites movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
      cardHeader={(movie) => {
        return <FavoriteHeader movie={movie} />;
      }}
    />
  );
};

export default AuthFavoriteMoviesPage;
