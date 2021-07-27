import React, { useState } from "react";
import qs from 'qs';
import  { getSession }  from "../api/tmdb-api";
import  { getAccount }  from "../api/tmdb-api";

export const UserContext = React.createContext(null);

const UserContextProvider = (props) => {
  const [authenticated, setAuthenticated] = useState( false ) 
  const [user, setUser] = useState( null )

  const authenticate = (props) => {
    const token = qs.parse(props.location.search, { ignoreQueryPrefix: true }).request_token
    console.log(token);
    //var user = getSession(token).then(res => (getAccount(res.session_id)))
    getSession(token).then(res => getAccount(res.session_id)).then(res => setUser(res));
    setAuthenticated(true); 
  }



return (
    <UserContext.Provider
      value={{
        authenticated,
        user,
        setAuthenticated,
        setUser, 
        authenticate
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;