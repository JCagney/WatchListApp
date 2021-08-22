import React from "react";
import MovieList from "../components/movieList";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";
import { action } from "@storybook/addon-actions";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import Grid from "@material-ui/core/Grid";
import MoviesContextProvider from "../contexts/moviesContext";
import UserContextProvider from "../contexts/userContext";
import FavoriteHeader from "../components/cardHeaders/favoriteHeader";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import PlaylistHeader from "../components/cardHeaders/playlistHeader";

export default {
  title: "Home Page/MovieList",
  component: MovieList,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
    (Story) => <UserContextProvider>{Story()}</UserContextProvider>,
  ],
};

export const Basic = () => {
  const movies = [
    { ...SampleMovie, id: 1 },
    { ...SampleMovie, id: 2 },
    { ...SampleMovie, id: 3 },
    { ...SampleMovie, id: 4 },
    { ...SampleMovie, id: 5 },
  ];
  return (
    <Grid container spacing={5}>
      <MovieList
        movies={movies}
        action={(movie) => <AddToFavoritesIcon movie={movie} />}
        cardHeader={(movie) => <FavoriteHeader movie={movie}/>}
      />
    </Grid>
  );
};
Basic.storyName = "Default";

export const Exceptional = () => {
  const movies = [
    { ...SampleMovie, id: 1 },
    { ...SampleMovie, id: 2 },
    { ...SampleMovie, id: 3 },
    { ...SampleMovie, id: 4 },
    { ...SampleMovie, id: 5 },
  ];
  return (
    <Grid container spacing={5}>
      <MovieList
        movies={movies}
        action={(movie) => <AddToPlaylistIcon movie={movie} />}
        cardHeader={(movie) => <PlaylistHeader movie={movie}/>}
      />
    </Grid>
  );
};
Exceptional.storyName = "exception";

