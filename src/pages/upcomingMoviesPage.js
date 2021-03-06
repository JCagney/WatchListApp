import React from "react";
import { withRouter } from "react-router-dom";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist'
import PlaylistHeader from '../components/cardHeaders/playlistHeader'


const UpcomingMoviesPage = (props) => {

  const { data, error, isLoading, isError } = useQuery("upcoming", getUpcomingMovies);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const movies = data.results;
  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie} />
      }}
      cardHeader={(movie) => {
        return <PlaylistHeader movie={movie}/>
      
      }}
      filter={true}
    />
  );
};

export default withRouter(UpcomingMoviesPage);
