import { useEffect, useContext } from "react";
import { UserContext } from "../contexts/userContext";


const Approved = (props) => {
    const context = useContext(UserContext);
    useEffect( () => {
        if (!context.authenticated){

        context.authenticate(props); 
       }
    });

    console.log(context.user);
    props.history.push("/");
    return(<></>);

};
    export default Approved;