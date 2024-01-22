import { AppBar, Button, Container, Typography, Toolbar, Grid, Card, CardMedia, CardContent, CardActions, Divider } from "@mui/material"
import { PhotoCamera } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from "@mui/system";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";


const CardLayout = () => {
    const cards = [1,2,3,4,5,6,7];
    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, [isAuthenticated]); 

function handleLogout(){
    localStorage.removeItem("token");
    setIsAuthenticated(false);

}

  return (
    
  )
}

export default CardLayout
