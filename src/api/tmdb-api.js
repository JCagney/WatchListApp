
  
  export const getMovies = async ( args ) => {
    console.log(args);
    const [prefix, { page }] = args.queryKey;

    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
    );
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  };

  export const getMovie = async ( args ) => {
     console.log(args);
    // eslint-disable-next-line no-unused-vars
    const [prefix, { id }] = args.queryKey;
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    );
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  };
  
  export const getGenres = async () => {
    const response = await  fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        process.env.REACT_APP_TMDB_KEY +
        "&language=en-US"
    )
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  };
  
  export const getMovieImages = async ({queryKey}) => {
    // eslint-disable-next-line no-unused-vars
    const [prefix, { id }] = queryKey;
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  };

  export const getMovieReviews = (id) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.results);
        return json.results;
      });
  };


  export const getUpcomingMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
    );
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  };

  export const getAuthenticationToken =  () => {
    return fetch(
      `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
    .then((res) => res.json())
      .then((json) => {
        return json;
      });
  };
  
  export const getSession =  (token) => {
    console.log(token);
    return fetch(
      `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.REACT_APP_TMDB_KEY}`, {method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        request_token: token
      })
    }
    )
    .then((res) => res.json())
      .then((json) => {
        return json;
      });
  };

  export const getAccount =  (session_id) => {
    return fetch(
      `https://api.themoviedb.org/3/account?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${session_id}`
    )
    .then((res) => res.json())
      .then((json) => {
        return json;
      });
  };


  export const deleteSession =  (sessionId) => {
    return fetch(
      `https://api.themoviedb.org/3/authentication/session?api_key=${process.env.REACT_APP_TMDB_KEY}`, {method: 'DELETE', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: sessionId
      })
    }
    )
    .then((res) => res.json())
      .then((json) => {
        return json;
      });
  }; 

