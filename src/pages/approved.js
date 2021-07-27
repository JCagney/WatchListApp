import React,  { useEffect, useContext } from "react";
import { UserContext } from "../contexts/userContext";


const Approved = (props) => {
    const context = useContext(UserContext);
    useEffect( () => {
        if (!context.authenticated){

        context.authenticate(props); 
       }
    });

    console.log(context.user);

    return (
    <>
    <h1>Welcome to Watchlist, {context.user?.username}! </h1>

        </>
    )
};
    export default Approved;