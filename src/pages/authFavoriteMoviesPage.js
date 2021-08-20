import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import { getFavorites } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import RateIcon from "../components/cardIcons/rate";
import FavoriteHeader from "../components/cardHeaders/favoriteHeader";
import { UserContext } from "../contexts/userContext";




const AuthFavoriteMoviesPage = () => {
  const context = useContext(UserContext);

  
  const {  data, error, isLoading, isError, refetch  }  = useQuery( ["favorites", { session_id: context.sessionId, account_id: context.user.id} ], getFavorites );
     
  
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
          ? `${context.user.username}'s Favourite Movies`
          : "Favourite Movies"
      }
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromFavorites movie={movie} refetch={refetch} />
            <RateIcon movie={movie} />
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
