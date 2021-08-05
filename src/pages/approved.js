import { useEffect, useContext } from "react";
import { UserContext } from "../contexts/userContext";


const Approved = (props) => {
    const context = useContext(UserContext);
    useEffect( () => {
        if (!context.authenticated){

        context.authenticate(props); 
       }
    });

    
    props.history.push("/");
    return(<></>);

};
    export default Approved;