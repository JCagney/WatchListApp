import React from "react";
import MovieCard from "../components/movieCard";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";
import UserContextProvider from "../contexts/userContext";
import { action } from "@storybook/addon-actions";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import FavoriteHeader from "../components/cardHeaders/favoriteHeader";
import PlaylistHeader from "../components/cardHeaders/playlistHeader";
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";
import RemoveFromPlaylist from "../components/cardIcons/removeFromPlaylist";
import WatchMovie from "../components/cardIcons/watch";
import RateIcon from "../components/cardIcons/rate";

import Card from "../components/cardIcons/addToFavorites";

export default {
  title: "Home Page/MovieCard",
  component: MovieCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
    (Story) => <UserContextProvider>{Story()}</UserContextProvider>,
  ],
};

export const Basic = () => {
  return (
    <MovieCard
      movie={SampleMovie}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
      cardHeader={(movie) => <FavoriteHeader movie={movie}/>}
      taging={(movie) => null}
    />
  );
};
Basic.storyName = "Home";

export const Upcoming = () => {
  return (
    <MovieCard
      movie={SampleMovie}
      action={(movie) => <AddToPlaylistIcon movie={movie} />}
      cardHeader={(movie) => <PlaylistHeader movie={movie}/>}
      taging={(movie) => null}
    />
  );
};
Upcoming.storyName = "Upcoming";

export const Favorites = () => {
  return (
    <MovieCard
      movie={SampleMovie}
      action={(movie) => {
        return (
          <>
            <RemoveFromFavorites movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
      cardHeader={(movie) => <FavoriteHeader movie={movie}/>}
      taging={(movie) => null}
    />
  );
};
Favorites.storyName = "favorites";

export const Playlist = () => {
  return (
    <MovieCard
      movie={SampleMovie}
      action={(movie) => {
        return (
          <>
            <RemoveFromPlaylist movie={movie} />
            <WatchMovie movie={movie} />
          </>
        );
      }}
      cardHeader={(movie) => <FavoriteHeader movie={movie}/>}
      taging={(movie) => null}
    />
  );
};
Playlist.storyName = "playlist";

export const authFavorites = () => {
  return (
    <MovieCard
      movie={SampleMovie}
      action={(movie) => {
        return (
          <>
            <RemoveFromFavorites movie={movie}  />
            <RateIcon movie={movie} />
          </>
        ); 
      }}
      cardHeader={(movie) => <FavoriteHeader movie={movie}/>}
      taging={(movie) => null}
    />
  );
};
authFavorites.storyName = "Auth Favorites";


