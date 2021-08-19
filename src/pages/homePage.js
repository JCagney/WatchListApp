import React, { useContext, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import {getMovies} from '../api/tmdb-api'
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import FavoriteHeader from '../components/cardHeaders/favoriteHeader'
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from "@material-ui/core/styles";
import { MoviesContext } from "../contexts/moviesContext";
import { UserContext } from "../contexts/userContext";

const useStyles = makeStyles({
  pagination: {
    padding: "40px",
  },
});



const HomePage = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);

  
  console.log(page);
  const moviesContext = useContext(MoviesContext);
  
  const userContext = useContext(UserContext);

  // useEffect(() => {
  //   if (userContext.user?.id){
  //   moviesContext.setAuthFavorites();
  //   }
  // });




  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const {  data, error, isLoading, isError }  = useQuery( ["discover", { page: page} ], getMovies);

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }
  const movies = data.results;

  return (
    <>
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
      cardHeader={(movie) => {
        return <FavoriteHeader movie={movie}/>

      }}
      filter={true}
      />
      <Pagination className={classes.pagination} count={10} page={page} onChange={handlePageChange} shape="rounded" size="large" />
      </>
  );
};

export default HomePage;