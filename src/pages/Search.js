import React from "react";
import PageTemplate from "../components/templateMovieListPage";
// import { useQuery } from 'react-query'
// import Spinner from '../components/spinner'
// import {getMovies} from '../api/tmdb-api'
 import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'


const Search = (props) => {
//   const {  data, error, isLoading, isError }  = useQuery('discover', getMovies)
const movies = [];

//   if (isLoading) {
//     return <Spinner />
//   }

//   if (isError) {
//     return <h1>{error.message}</h1>
//   }  
//   const movies = data.results;

  return (
    <PageTemplate
      title="Search Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
    />    
  );
};

export default Search;