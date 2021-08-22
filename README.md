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

## API Data Model.

..... [For non-Movies Fan app] Insert a diagram of the API's data model (see example below) AND/OR a sample(s) of the JSON documents returned by its endpoints ........

![][model]

......[For the Movies Fan app] Specify the additional TMDB endpoints used and show sample responses, in JSON .........

## App Design.

### Component catalogue.

....... Insert a screenshot from the Storybook UI showing your component catalogue. [For the Movies app, hi-light stories relating to new/modified components - see the example screenshot below] .......

![][stories]

### UI Design.

...... Insert screenshots of the app's views, with appropriate captions (see example below). (For the Movies Fan App, only show the new/modified views) ........

![][view]
>Shows detailed information on a movie. Clicking the 'Reviews' floating action button will display extracts from critic reviews.

### Routing.

...... Insert a list of the routes supported by your app and state the associated view. If relevant, specify which of the routes require authentication, i.e. protected/private. [For the Movies Fan app, only new routes should be listed.] ......... 

+ GET /blogs - displays all published blogs.
+ POST /blogs (protected) - add a new blog.
+ GET /blogs/:id - displays a particular blog.
+ GET /blogs/:id/comments (protected) - detail view of a particular blog and its comments.
+ etc.
+ etc.

## Independent learning (If relevant).

....... Briefly state any technologies/techniques used in your project codebase that was not covered in the lectures/labs. Provide source code filename (source code excerpts are not required in most cases) references to support your assertions and include references (articles/blogs) ......... 


[model]: ./data.jpg
[view]: ./view.png
[stories]: ./storybook.png