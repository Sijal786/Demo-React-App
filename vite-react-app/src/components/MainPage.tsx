import { Button, Container, Typography, Grid, Card, CardMedia, CardContent, CardActions, Divider } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from "@mui/system";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { AuthenticationContext } from "../App";



export default function MainPage({isAuthenticated, setIsAuthenticated} : any ) {

    const cards = [1,2,3,4,5,6,7];
    const navigate = useNavigate();
    console.log(isAuthenticated);

   

//   useEffect(() => {
//     setIsAuthenticated(!!localStorage.getItem("token"));
//   }, [isAuthenticated]); 

function handleLogout(){
    localStorage.removeItem("token");
    setIsAuthenticated(false);

 }

    return (
        <>
        <main>
            <div>
            <Container maxWidth= "sm">
                <Typography variant = "h1" align="center" gutterBottom >
                    Photo Album
                </Typography>
                <Typography variant = "h5" align="center" paragraph>
                Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.
                </Typography>
                <Stack direction= {{xs : "column" ,md : "row"}} useFlexGap spacing={2} flexWrap="wrap" justifyContent="center" alignItems='center' divider = {<Divider orientation="vertical" flexItem />}> 
                    <Button variant="outlined" > 
                        Home
                    </Button>
                    {isAuthenticated ? <Button variant="outlined" onClick={handleLogout}> 
                        Logout
                    </Button> : <Button variant="outlined" onClick={() => navigate("/login")}> 
                        Login
                    </Button>  }
                </Stack>
            </Container>
            </div>
            <Container style={{ padding : '20px 0px'}} maxWidth = "md">
                <Grid container maxWidth="md" style={{ marginTop : '10px'}} spacing={4}>
                    {cards.map((card) => (
                        <Grid key = {card}item xs = {12} sm = {6} md = {4} >
                        <Card style={{ display: 'flex' , flexDirection : "column", height  :"100%"}}  >
                            <CardMedia style={{ paddingTop : '56.25%'}}
                            image = "https://source.unsplash.com/random?wallpapers"
                            title = "Image title"
                            />    
                           <CardContent style={{flexGrow : "1"}} >
                            <Typography variant = "h5"  >
                                Heading
                            </Typography>
                            <Typography>
                                This is my card that i am showing on the screen so that i can describe what my card looks like
                            </Typography>
                           </CardContent>
                           <CardActions>
                            <Button variant="contained" color = "primary" size = "small" >Login to Subscribe</Button>
                            
                           </CardActions>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
            </Container>
        </main>
        <footer style={{backgroundColor : "white", margin : "20px 0px" }}>
            <Typography variant="h5" align="center" gutterBottom>
                Footer 
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary">
                This is the footer give them anything to give it purpose 
            </Typography>
        </footer>
        </>
    )
};

