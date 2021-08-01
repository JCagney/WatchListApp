import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromPlaylist from "../components/cardIcons/removeFromPlaylist";
//import WriteReview from "../components/cardIcons/writeReview";
import PlaylistHeader from '../components/cardHeaders/playlistHeader'


const PlaylistMoviesPage = () => {
  const {playlist: movieIds } = useContext(MoviesContext);
  console.log(movieIds);

  // Create an array of queries and run in parallel.
  const playlistMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = playlistMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }
  const movies = playlistMovieQueries.map((q) => q.data);

  return (
    <PageTemplate
      title="Movie Playlist"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromPlaylist movie={movie} />
          </>
        );
      }}
      cardHeader={(movie) => {
        return <PlaylistHeader movie={movie}/>
      
      }}
    />
  );
};

export default PlaylistMoviesPage;