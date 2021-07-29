import React, { useState } from "react";
import qs from "qs";
import { getSession, getAccount, deleteSession } from "../api/tmdb-api";

export const UserContext = React.createContext(null);

const UserContextProvider = (props) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  const authenticate = (props) => {
    if (
      qs.parse(props.location.search, { ignoreQueryPrefix: true }).approved ===
      "true"
    ) {
      const token = qs.parse(props.location.search, {
        ignoreQueryPrefix: true,
      }).request_token;
      console.log(token);
      getSession(token)
        .then((res) => {
          setSessionId(res.session_id);
          return getAccount(res.session_id);
        })
        .then((res) => setUser(res));
      setAuthenticated(true);
    }else{
        props.history.push("/");
    }
  };

  const logout = () => {
    const result = deleteSession(sessionId);
    setAuthenticated(false);
    setUser(null);
    setSessionId(null);
    console.log(result);
  };

  return (
    <UserContext.Provider
      value={{
        authenticated,
        user,
        setAuthenticated,
        setUser,
        authenticate,
        logout,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
