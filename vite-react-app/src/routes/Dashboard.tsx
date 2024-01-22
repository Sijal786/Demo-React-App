import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";


export default function Dashboard(){
    const location = useLocation();
    return (
        <>
        <h1>
            Hello This is my Dashboard and welcome here {location.state}
        </h1>
        <p> hello i am sijal</p>
        
        </>
    )
}