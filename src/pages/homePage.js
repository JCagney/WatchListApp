import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import {getMovies} from '../api/tmdb-api'
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import FavoriteHeader from '../components/cardHeaders/favoriteHeader'
import Pagination from '@material-ui/lab/Pagination';


const HomePage = (props) => {
  const [page, setPage] = React.useState(1);
  console.log(page);


  const handleChange = (event, value) => {
    setPage(value);
  };
  const {  data, error, isLoading, isError }  = useQuery(["discover", { page: page} ], getMovies);

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
      <Pagination count={10} page={page} onChange={handleChange} shape="rounded" size="large" />
      </>
  );
};

export default HomePage;