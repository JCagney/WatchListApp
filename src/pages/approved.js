import { useEffect, useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { MoviesContext } from "../contexts/moviesContext";


const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }


const Approved = (props) => {
    const context = useContext(UserContext);
    const moviesContext = useContext(MoviesContext);
    useEffect( () => {
        if (!context.authenticated){

        context.authenticate(props) 
    
                         
        
       }
    });
    
    props.history.push  ("/");
    return(<></>);

};
    export default Approved;