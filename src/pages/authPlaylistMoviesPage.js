import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import { getPlaylist } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromPlaylist from "../components/cardIcons/removeFromPlaylist";
import PlaylistHeader from "../components/cardHeaders/playlistHeader";
import { UserContext } from "../contexts/userContext";
import WatchMovie from "../components/cardIcons/watch";




const AuthPlaylistMoviesPage = () => {
  const context = useContext(UserContext);

  
  const {  data, error, isLoading, isError, refetch  }  = useQuery( ["playlist", { session_id: context.sessionId, account_id: context.user.id} ], getPlaylist );
     
  
  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }
  const movies = data.results;

//   const movies  = getFavorites ( context.user.id, context.sessionId).then((response) => console.log(response.results) );
  

//   if (!movies )
//   {
//        return <Spinner />
//       }

  
  

  return (
    <PageTemplate
      title={
        context.user
          ? `${context.user.username}'s TMDB Watchlist`
          : "Watchlist"
      }
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromPlaylist movie={movie} refetch={refetch} />
            <WatchMovie movie={movie} />

          </>
        ); 
      }}
      cardHeader={(movie) => {
        return <PlaylistHeader movie={movie} />;
      }}
    />
  );
};

export default AuthPlaylistMoviesPage;
