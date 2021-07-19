import React from "react";
import qs from 'qs';
import  { getSession }  from "../api/tmdb-api";
import  { getAccount }  from "../api/tmdb-api";

//import { getAuthenticationToken } from "../api/tmdb-api";
const Approved = (props) => {
    const token = qs.parse(props.location.search, { ignoreQueryPrefix: true }).request_token
    console.log(token);
    var user = getSession(token).then(res => (getAccount(res.session_id)));
    console.log(user);

    
    
    
    return (
    <>
    <p>Authenticated {}</p>

        </>
    )
};
    export default Approved;