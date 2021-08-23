# Assignment - ReactJS app.

Name: John Cagney

## Overview.

My app is an extension of the Movies Fan app. 

The objectives are


...... A bullet-point list of user features. If it's the Movies Fan app extension, only list new/modified features...... 
 
 + Home: When  "Add to Favorites" is selected the Icon Button "Add to Favorites" no longer shows 
 + Home: Pagination is introduced at bottom of page using the Material UI Pagination component and via discover API
 + Upcoming Page: In the Upcoming page, selecting "Add to Playlist" option now adds the "Added to Plylist" header icon and adds the movie to the Playlist Page, and the Icon Button "Add to Playlist" no longer shows 
 + Playlist Page: This displays the movies added to playlist. There is an Icon Button on the movie cards to show Watch Providers. This feature opens a Drawer in which the Watch Providers API data (name and logo of provider) for the movie is displayed. The data is sorted by Region and Option via drop down menus before being displayed 
 + App Menu: An option to Login to TMDB is present. This requests an authentication token from TMDB via API get call, then redirects to TMDB with the token in the url to authenticate. When successfully authenticated TMDB redirects user back to /approved where the authenticate method is called from the User Context. This parses the authentication token from the url and uses it to request a session ID from TMDB which is issued if the authentication token was successfully authenticated. The session ID is stored to the User Context as is the user account info. The user is now authenticated to their TMDB and the app will react accordingly. A small authenticated menu appears in the main menu with an option to logout 
 + Authenticated Home Page: Clicking on the Add to Favorites button now adds a movie to the users TMDB favorites, so some of the card headers functionality was lost in the authenticated view. 
 Authenticated Favorites: This view shows the TMDB favorites of the logged in user  
 + Authenticated Upcomiong Page: Clicking on the Add to Playlist button now adds a movie to the users TMD watchlist. 
 + Authenticated Favorites Page: This page shows the authenticated user's TMDB favorites. 
 + Authenticated Favorites Page: Instead of the Review icon button there is now a star icon which opens a Material UI Rating component. The user selects a rating out of 10 which is then sent to TMDB using the Session ID and a confirmation Snackbar. Sending a rating again merely updates the user's rating of the movie on the TMDB side and this can b e confirmed on the TMDB website.   
 + Authenticated Playlist Page: This page shows the authenticated user's TMDB watchlist.   

## Setup requirements.

...... A brief explanation (to a third party) of any non-standard setup steps necessary to run your app/client locally (after cloning the repo) ........

You will need a .env file with A TMDB API key. 

The app can be installed with the command npm install 


## API Data Model.

Addtional TMDB endpoints used: 


 + Get Authentication Token 
fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.REACT_APP_TMDB_KEY}`
Data: {success: true, expires_at: "2021-08-22 19:06:02 UTC", request_token: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}

 + Post approved authentication token for Session ID 
fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.REACT_APP_TMDB_KEY}`, {method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        request_token: token
      })
Data: {success: true, session_id: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}

 + Get Account info (authenticated) 
fetch(`https://api.themoviedb.org/3/account?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${session_id}`)
Data: {avatar: {…}, id: xxxxxx, iso_639_1: "en", iso_3166_1: "IE", name: "", …}


 + Delete session
fetch(`https://api.themoviedb.org/3/authentication/session?api_key=${process.env.REACT_APP_TMDB_KEY}`, {method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({session_id: sessionId})})
Data:
Promise {<pending>}
[[Prototype]]: Promise
[[PromiseState]]: "fulfilled"
[[PromiseResult]]: Object
success: true

 + Get Favorites (authenticated) 
 fetch(`https://api.themoviedb.org/3/account/${account_id}/favorite/movies?api_key${process.env.REACT_APP_TMDB_KEY}&session_id=${session_id}&language=en-US&sort_by=created_at.asc&page=1`)
Data: 
{page: 1, results: Array(5), total_pages: 1, total_results: 5}
page: 1
results: Array(5)
0: {overview: "Dr. Lily Houghton enlists the aid of wisecracking …iscovery that will change the future of medicine.", release_date: "2021-07-28", adult: false, backdrop_path: "/7WJjFviFBffEJvkAms4uWwbcVUk.jpg", genre_ids: Array(4), …}
1: {backdrop_path: "/jlGmlFOcfo8n5tURmhC7YVd4Iyy.jpg", genre_ids: Array(3), original_language: "en", original_title: "The Suicide Squad", poster_path: "/iCi4c4FvVdbaU1t8poH1gvzT6xM.jpg", …}
2: {adult: false, backdrop_path: "/wPjtacig0kIkVcTQmXoNt6jbMwo.jpg", genre_ids: Array(2), id: 617502, original_language: "en", …}
3: {backdrop_path: "/6tPOZmNQ1tbzlhcMmyhYN1a1dEh.jpg", genre_ids: Array(2), title: "Bartkowiak", original_language: "pl", original_title: "Bartkowiak", …}
4: {overview: "A bank teller called Guy realizes he is a backgrou… game called Free City that will soon go offline.", release_date: "2021-08-11", adult: false, backdrop_path: "/j28p5VwI5ieZnNwfeuZ5Ve3mPsn.jpg", vote_count: 255, …}

 + Post Favorites Movie 
fetch(`https://api.themoviedb.org/3/account/${account_id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${session_id}`, {method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        media_type: "movie",
        media_id: movie_id,
        favorite: true})})

 + Remove (post) favorite movie 
fetch(`https://api.themoviedb.org/3/account/${account_id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${session_id}`, {method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8' },body: JSON.stringify({
        media_type: "movie",
        media_id: movie_id,
        favorite: false})})

 + GET Watchlist  (authenticated) 
fetch(`https://api.themoviedb.org/3/account/${account_id}/watchlist/movies?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${session_id}&language=en-US&sort_by=created_at.asc&page=1`)

 + Post Watchlist movie (authenticated) 
fetch(`https://api.themoviedb.org/3/account/${account_id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${session_id}`, {method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        media_type: "movie",
        media_id: movie_id,
        watchlist: true})})

 + Post (remove) Watchlist movie 
fetch(
      `https://api.themoviedb.org/3/account/${account_id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${session_id}`, {method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        media_type: "movie",
        media_id: movie_id,
        watchlist: false})}

 + Post Movie Rating (authenticated) 
fetch(`https://api.themoviedb.org/3/movie/${movie_id}/rating?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${session_id}`, {method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        "value": rating})})

 + Get Watch Providers 
fetch(`https://api.themoviedb.org/3/movie/${movie_id}/watch/providers?api_key=${process.env.REACT_APP_TMDB_KEY}`)
Data: 
results:
CA:
link: "https://www.themoviedb.org/movie/459151-the-boss-baby-family-business/watch?locale=CA"
rent: Array(6)
0: {display_priority: 3, logo_path: "/p3Z12gKq2qvJaUOMeKNU2mzKVI9.jpg", provider_id: 3, provider_name: "Google Play Movies"}
1: {display_priority: 11, logo_path: "/sVBEF7q7LqjHAWSnKwDbzmr2EMY.jpg", provider_id: 10, provider_name: "Amazon Video"}
2: {display_priority: 13, logo_path: "/vDCcryHD32b0yMeSCgBhuYavsmx.jpg", provider_id: 192, provider_name: "YouTube"}
3: {display_priority: 13, logo_path: "/xEWgUq2tJyggisxbJ3fNOV9Inj2.jpg", provider_id: 140, provider_name: "Cineplex"}
4: {display_priority: 43, logo_path: "/paq2o2dIfQnxcERsVoq7Ys8KYz8.jpg", provider_id: 68, provider_name: "Microsoft Store"}
5: {display_priority: 61, logo_path: "/mK7Au1go2M5MqyZ8CjkpJPM6Apb.jpg", provider_id: 492, provider_name: "ILLICO"}
length: 6
[[Prototype]]: Array(0)
[[Prototype]]: Object
KR:
buy: Array(1)
0: {display_priority: 4, logo_path: "/gvykO994iHcqL1Cgpii4RJCtDud.jpg", provider_id: 96, provider_name: "Naver Store"}
length: 1
[[Prototype]]: Array(0)
link: "https://www.themoviedb.org/movie/459151-the-boss-baby-family-business/watch?locale=KR"
rent: Array(2)
0: {display_priority: 2, logo_path: "/8N0DNa4BO3lH24KWv1EjJh4TxoD.jpg", provider_id: 356, provider_name: "wavve"}
1: {display_priority: 4, logo_path: "/gvykO994iHcqL1Cgpii4RJCtDud.jpg", provider_id: 96, provider_name: "Naver Store"}
length: 2
[[Prototype]]: Array(0)
[[Prototype]]: Object
US:
flatrate: Array(1)
0: {display_priority: 10, logo_path: "/7cOEzL1ogV1hQV9a65qAeG7dK6c.jpg", provider_id: 387, provider_name: "Peacock Premium"}
length: 1
[[Prototype]]: Array(0)
link: "https://www.themoviedb.org/movie/459151-the-boss-baby-family-business/watch?locale=US"



## App Design.

### Component catalogue.

....... Insert a screenshot from the Storybook UI showing your component catalogue. [For the Movies app, hi-light stories relating to new/modified components - see the example screenshot below] .......

![][stories]

### UI Design.

...... Insert screenshots of the app's views, with appropriate captions (see example below). (For the Movies Fan App, only show the new/modified views) ........

>A drawer displays the Watch provider data 
![][WatchProviders]

>A Rating component 
![][rate]

>Notification of successful rating 
![][rated]

>Header when user has aithenticated with TMDB
![][AuthenticatedHeader]


### Routing.

...... Insert a list of the routes supported by your app and state the associated view. If relevant, specify which of the routes require authentication, i.e. protected/private. [For the Movies Fan app, only new routes should be listed.] ......... 


+ GET movies/playlist - dispays playlist page (unauthenticated) 

+ GET /authenticate - runs authentication method in index.js andf send user to TMDB to approve the authentication token 

+ GET /approved - return page for TMDB approved logins, where authentication is posted to TMDB and then user is redirected to Home 

+ GET /movies/auth/favorites - displays TMDB favorites for authenticated users 

+ GET /movies/auth/playlist - displays TMDB watchlist for authenticated users 


## Independent learning (If relevant).

I just used the official TMDB API documentation to guide me through the authentication process 


[model]: ./data.jpg
[view]: ./view.png
[WatchProviders]: ./watch_providers_drawer.jpg
[rate]: ./rate.jpg
[rated]: ./rated.jpg
[AuthenticatedHeader]: ./authenticated_header.jpg
[stories]: ./storybook.png