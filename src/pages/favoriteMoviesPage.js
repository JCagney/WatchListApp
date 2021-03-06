import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";
import FavoriteHeader from "../components/cardHeaders/favoriteHeader";
import { UserContext } from "../contexts/userContext";


const FavoriteMoviesPage = () => {
  const context = useContext(UserContext);
  const { favorites: movieIds } = useContext(MoviesContext);

  var movies = [];

  
    
    // Create an array of queries and run in parallel.
    const favoriteMovieQueries = useQueries(
      movieIds.map((movieId) => {
        return {
          queryKey: ["movie", { id: movieId }],
          queryFn: getMovie,
        };
      })
    );
    // Check if any of the parallel queries is still loading.
    const isLoading = favoriteMovieQueries.find((m) => m.isLoading === true);

    if (isLoading) {
      return <Spinner />;
    }

      // movies = getFavorites(context.sessionId, context.user?.id).then((res) => {
      //   return res.results;

     movies = favoriteMovieQueries.map((q) => q.data);
  

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

export default FavoriteMoviesPage;
