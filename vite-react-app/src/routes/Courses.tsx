import { Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";




export default function Courses(){

    const navigate = useNavigate();
    const {course}= useParams();
    console.log(course)


    return (
        <>
        <Typography variant="h1" align="center" color="textPrimary" > 
        This is my course {course}
        </Typography>
        <Button variant = "contained" onClick={() => {
            navigate("/dashboard" , {state : "399"} )
        }} >
            Go to Dashboard 
        </Button>
        <Link to= {"/dashboard"} state = {"Django"}> Hello  </Link>
        </>
    )
}