import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import AuthFavoriteMoviesPage from "./pages/authFavoriteMoviesPage";
import PlaylistMoviesPage from "./pages/playlistMoviesPage";
import AuthPlaylistMoviesPage from "./pages/authPlaylistMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import SiteHeader from "./components/siteHeader";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import MoviesContextProvider from "./contexts/moviesContext";
import UserContextProvider from "./contexts/userContext";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import Approved from "./pages/approved";
import Search from "./pages/search";
import PrivateRoute from "./components/privateRoute";
import { getAuthenticationToken } from "./api/tmdb-api";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: "true", 
      refetchOnMount: "always",
      
    },
  },
});

const App = () => {
  const authenticate = () => {
    getAuthenticationToken().then(
      (res) =>
        (window.location = `https://www.themoviedb.org/authenticate/${res.request_token}?redirect_to=http://localhost:3000/approved`)
    );
  };
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <UserContextProvider>
        <SiteHeader /> {/* New Header  */}
        
          <MoviesContextProvider>
            <Switch>
              <Route exact path="/search" component={Search} />
              <Route exact path="/approved" component={Approved} />
              <Route exact path="/authenticate" render={authenticate} />
              <Route
                exact
                path="/reviews/form"
                component={AddMovieReviewPage}
              />
              <Route
                exact
                path="/movies/upcoming"
                component={UpcomingMoviesPage}
              />
              <Route path="/reviews/:id" component={MovieReviewPage} />
              <Route
                exact
                path="/movies/favorites"
                component={FavoriteMoviesPage}
              />
              <PrivateRoute
                exact
                path="/movies/auth/favorites"
                component={AuthFavoriteMoviesPage}
              />
              <PrivateRoute
                exact
                path="/movies/auth/playlist"
                component={AuthPlaylistMoviesPage}
              />
              <Route
                exact
                path="/movies/playlist"
                component={PlaylistMoviesPage}
              />
              <Route path="/movies/:id" component={MoviePage} />
              <Route path="/" component={HomePage} />
              <Redirect from="*" to="/" />
            </Switch>
          </MoviesContextProvider>
        </UserContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
